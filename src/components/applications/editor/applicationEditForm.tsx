import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { ApplicationQuestion } from "@prisma/client";
import { Field, Form } from "houseform";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import PreviewModal from "~/components/previewModal";
import ApplicationForm from "../applicationForm";
import ApplicationPublishConfirmationDialog, {
  ConfirmationFormType,
} from "./applicationPublishConfirmationDialog";
import QuestionsEditor from "./questionsEditor";

type ApplicationFormType = {
  name: string;
  description: string;
};

type PropType = {
  applicationId: string;
  projectId: string;
  name?: string;
  description?: string;
  savedQuestions: ApplicationQuestion[];
  saveApplication: (
    name: string,
    description: string,
    questions: ApplicationQuestion[],
  ) => Promise<void>;
  publishApplication: (
    name: string,
    description: string,
    values: ConfirmationFormType,
    questions: ApplicationQuestion[],
  ) => void;
};

const ApplicationEditForm = (props: PropType) => {
  const {
    projectId,
    name,
    description,
    savedQuestions,
    applicationId,
    saveApplication,
    publishApplication,
  } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [questions, setQuestions] = useState<ApplicationQuestion[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setQuestions(savedQuestions);
  }, []);

  const isApplicationFormValid = (name: string, description: string) => {
    if (name.trim() === "" || description.trim() === "") {
      return false;
    }
    for (const question of questions) {
      if (
        question.question === "" ||
        question.type === undefined ||
        question.required === undefined
      ) {
        return false;
      }

      for (const answerChoice of question.answerChoices) {
        if (answerChoice === "") {
          return false;
        }
      }
    }
    return true;
  };

  const confirmPublishApplication = (
    name: string,
    description: string,
    values: ConfirmationFormType,
  ) => {
    toast.dismiss();
    toast.loading("Publishing Application...");
    publishApplication(name, description, values, questions);
  };

  return (
    <>
      <Form<ApplicationFormType>
        onSubmit={async (values) => {
          if (!isApplicationFormValid(values.name, values.description)) {
            onOpen();
            toast.dismiss();
            return;
          }
          saveApplication(values.name, values.description, questions).then(() =>
            setIsSaving(false),
          );
        }}
      >
        {({ submit, getFieldValue, errors }) => (
          <main className="flex flex-col items-center gap-4 py-4">
            <section className="mx-10 flex w-[50vw] max-w-[50rem] flex-col gap-4">
              <Field
                name="name"
                initialValue={name}
                onBlurValidate={z
                  .string()
                  .min(1, "Enter an application name")
                  .max(250, "Name must be less than 250 characters")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <>
                    <span className="text-xl font-semibold">
                      Application Name
                    </span>
                    <Input
                      placeholder="Enter Application Name"
                      size="lg"
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      onBlur={onBlur}
                      isInvalid={!isValid}
                      errorMessage={errors[0]}
                      isRequired
                    />
                  </>
                )}
              </Field>

              <Field
                name="description"
                initialValue={description}
                onBlurValidate={z
                  .string()
                  .min(1, "Enter a description")
                  .max(500, "Description must be less than 500 characters")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <>
                    <span className="text-xl font-semibold">
                      Application Description
                    </span>
                    <Textarea
                      placeholder="Enter an application description"
                      size="lg"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      minRows={4}
                      isInvalid={!isValid}
                      errorMessage={errors[0]}
                      isRequired
                    />
                  </>
                )}
              </Field>
            </section>

            <section className="flex w-full flex-col items-center gap-4 py-8">
              <span className="text-center text-4xl font-semibold ">
                Questions
              </span>
              <QuestionsEditor
                questions={questions}
                setQuestions={setQuestions}
              />
            </section>

            <div className="flex grow flex-row justify-end gap-4">
              <Button
                onClick={() => {
                  setIsSaving(true);
                  toast.dismiss();
                  toast.loading("Saving Application....");

                  if (errors.length > 0) {
                    setIsSaving(false);
                    toast.dismiss();
                  }

                  submit().catch((e) => {
                    setIsSaving(false);
                    toast.dismiss();
                  });
                }}
                disabled={isSaving}
              >
                Save
              </Button>

              <PreviewModal
                triggerButton={
                  <Button className="px-4 py-4" disabled={isSaving}>
                    Preview
                  </Button>
                }
                dialogTitle="Application Preview"
                dialogDescription=""
              >
                <ApplicationForm
                  projectId={projectId as string}
                  applicationId={applicationId}
                  name={getFieldValue("name")?.value}
                  description={getFieldValue("description")?.value}
                  questions={questions}
                  isSaving={isSaving}
                  readonly
                />
              </PreviewModal>

              <ApplicationPublishConfirmationDialog
                name={getFieldValue("name")?.value}
                description={getFieldValue("description")?.value}
                isApplicationFormValid={isApplicationFormValid}
                confirmPublishApplication={confirmPublishApplication}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
              />
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Error
                    </ModalHeader>
                    <ModalBody>
                      <p>Please make sure that all fields are filled!</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </main>
        )}
      </Form>
    </>
  );
};

export default ApplicationEditForm;
