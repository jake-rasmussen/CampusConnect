import { Field, Form } from "houseform";
import React, { useState } from "react";
import { z } from "zod";

import SkillsCreator from "~/components/dashboard/applications/skillsCreator";
import { Button, DatePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput, useDisclosure } from "@nextui-org/react";
import { CalendarDate, Time } from "@internationalized/date";


type PropTypes = {
  name: string;
  description: string;
  confirmPublishApplication: (
    name: string,
    description: string,
    values: ConfirmationFormType,
  ) => void;
  isApplicationFormValid: (name: string, description: string) => boolean;
  isSaving: boolean;
  setIsSaving: React.Dispatch<boolean>;
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

  const DEFAULT_TIME = new Date(new Date().setHours(23, 59, 0, 0));

  const dateToDateValue = (date: Date) => {
    if (date) {
      return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate());
    }
    return null;
  };

  const dateToTimeValue = (date: Date) => {
    if (date) {
      return new Time(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds());
    }
    return null;
  }


  return (
    <>
      <Button
        onClick={() => {
          if (!isApplicationFormValid(name, description)) {

          } else {
            onOpen();
          }
        }}
      >
        Publish
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">

        <Form<ConfirmationFormType>
          onSubmit={(values) => {
            values.skills = skills;
            confirmPublishApplication(name, description, values);
          }}
        >
          {({ submit }) => (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Publish this Application?</ModalHeader>
                  <ModalBody>
                    <main className="flex flex-col items-center gap-8">
                      <p>
                        Please note, publishing an application will make it available to
                        all users and cannot be undone. Editing will be disabled once
                        published. Before you publish, make sure you have completed all
                        the necessary changes and try previewing your application.
                      </p>
                      <section className="flex w-fit flex-row items-center justify-center gap-4">
                        <Field
                          name="date"
                          initialValue={new Date()}
                          onBlurValidate={z.date({
                            required_error: "Enter a date",
                            invalid_type_error: "Enter a date",
                          })}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <DatePicker
                              label="Date"
                              size="lg"
                              value={dateToDateValue(value)}
                              onChange={(e) => {
                                console.log(e)
                                if (e) {
                                  setValue(new Date(e.year, e.month - 1, e.day));
                                }
                              }}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                              isRequired
                            />
                          )}
                        </Field>
                        <Field
                          name="time"
                          initialValue={DEFAULT_TIME}
                          onBlurValidate={z.date({
                            required_error: "Enter a time",
                            invalid_type_error: "Invalid time",
                          })}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <TimeInput
                              label="Start Time"
                              size="lg"
                              value={dateToTimeValue(value)}
                              onChange={(e) => {
                                if (e) {
                                  const newDate = new Date();
                                  newDate.setHours(e.hour, e.minute, e.second);
                                  setValue(newDate);
                                }
                              }}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                              isRequired
                            />
                          )}
                        </Field>
                      </section>

                      <SkillsCreator skills={skills} setSkills={setSkills} placeholder="Add skills to your application..." />
                    </main>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={onClose}
                      isDisabled={isSaving}
                      onClick={() => {
                        setIsSaving(true);
                        submit().catch((e) => {
                          console.error(e);
                          setIsSaving(false);
                        });
                      }}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ApplicationPublishConfirmationDialog;
