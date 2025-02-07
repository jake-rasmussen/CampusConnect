import { now, getLocalTimeZone, ZonedDateTime, CalendarDate, CalendarDateTime, parseDate, DateValue } from "@internationalized/date";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import React, { useState } from "react";

import SkillsCreator from "~/components/dashboard/applications/skillsCreator";

type PropTypes = {
  name: string;
  description: string;
  confirmPublishApplication: (
    name: string,
    description: string,
    values: ConfirmationFormType
  ) => void;
  isApplicationFormValid: (name: string, description: string) => boolean;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ConfirmationFormType = {
  date: Date;
  time: Date;
  skills: string[];
};

const ApplicationPublishConfirmationDialog = ({
  name,
  description,
  confirmPublishApplication,
  isApplicationFormValid,
  isSaving,
  setIsSaving,
}: PropTypes) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [skills, setSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState(
    now(getLocalTimeZone())
  );

  const handleSubmit = async () => {
    if (!deadline) return;

    const deadlineAsDate = new Date(
      deadline.year,
      deadline.month - 1,
      deadline.day,
      deadline.hour,
      deadline.minute,
      deadline.second
    );

    confirmPublishApplication(name, description, {
      skills,
      date: deadlineAsDate,
      time: deadlineAsDate
    });
  };

  return (
    <>
      <Button
        onPress={() => {
          if (isApplicationFormValid(name, description)) {
            onOpen();
          }
        }}
      >
        Publish
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Publish this Application?</ModalHeader>
              <ModalBody>
                <main className="flex flex-col items-center gap-8">
                  <p>
                    Please note, publishing an application will make it
                    available to all users and cannot be undone. Editing
                    will be disabled once published. Before you publish,
                    make sure you have completed all the necessary changes
                    and try previewing your application.
                  </p>
                  <section className="flex flex-row items-center justify-center gap-4 max-w-md w-full">
                    <DatePicker
                      hideTimeZone
                      showMonthAndYearPickers
                      // @ts-ignore
                      value={deadline}
                      // @ts-ignore
                      onChange={setDeadline}
                      label="Deadline"
                      size="md"
                      className="w-full"
                    />
                  </section>

                  <SkillsCreator
                    skills={skills}
                    setSkills={setSkills}
                    placeholder="Add skills to your application..."
                  />
                </main>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={isSaving}
                  onPress={() => {
                    setIsSaving(true);
                    handleSubmit().then(() => onClose());
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplicationPublishConfirmationDialog;
