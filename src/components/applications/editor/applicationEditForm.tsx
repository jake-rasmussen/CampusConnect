import { ApplicationQuestion } from "@prisma/client";
import { Field, Form } from "houseform";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ErrorDialog from "~/components/errorDialog";
import PreviewDialog from "~/components/previewDialog";
import { Textarea } from "~/components/shadcn_ui/textarea";
import Button from "../../button";
import ErrorMessage from "../../dashboard/errorMessage";
import { Input } from "../../shadcn_ui/input";
import ApplicationForm from "../applicationForm";
import ApplicationPublishConfirmationDialog, {
  ConfirmationFormType,
} from "./applicationPublishConfirmationDialog";
import QuestionsEditor from "./questionsEditor";
import { z } from "zod";

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

  const [questions, setQuestions] = useState<ApplicationQuestion[]>([]);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
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
            setOpenErrorDialog(true);
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
                onBlurValidate={z.string().min(1, "Enter an application name")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <>
                    <span className="text-xl font-semibold">
                      Application Name
                    </span>
                    <Input
                      className="h-[4rem]"
                      placeholder="Enter Application Name"
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      onBlur={onBlur}
                    />
                    {!isValid && <ErrorMessage message={errors[0]} />}
                  </>
                )}
              </Field>

              <Field 
                name="description" 
                initialValue={description}
                onBlurValidate={z.string().min(1, "Please provide a description").max(200, "Description must be less than 200 characters")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <>
                    <span className="text-xl font-semibold">
                      Application Description
                    </span>
                    <Textarea
                      className="rounded-xl bg-white p-4"
                      placeholder={"Enter an application description"}
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      rows={4}
                    />
                    {!isValid && <ErrorMessage message={errors[0]} />}
                  </>
                )}
              </Field>
            </section>
            <section className="flex flex-col items-center gap-4 py-8">
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
                onClickFn={() => {
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
                    console.log(e);
                  });
                }}
                disabled={isSaving}
              >
                Save
              </Button>

              <PreviewDialog
                triggerButton={
                  <button
                    className="max-w-xs rounded-xl bg-white/10 px-4 py-4 backdrop-invert transition duration-300 ease-in-out hover:scale-110 disabled:opacity-50"
                    disabled={isSaving}
                  >
                    <h1 className="tracking-none font-black uppercase text-white">
                      Preview
                    </h1>
                  </button>
                }
                dialogTitle="Application Preview"
                dialogDescription=""
                openDialog={openPreviewDialog}
                setOpenDialog={setOpenPreviewDialog}
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
              </PreviewDialog>

              <ApplicationPublishConfirmationDialog
                name={getFieldValue("name")?.value}
                description={getFieldValue("description")?.value}
                isApplicationFormValid={isApplicationFormValid}
                confirmPublishApplication={confirmPublishApplication}
                setErrorDialogOpen={setOpenErrorDialog}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
              />
            </div>

            <ErrorDialog
              dialogDescription={
                "Please make sure that all fields are filled out!"
              }
              openDialog={openErrorDialog}
              setOpenDialog={setOpenErrorDialog}
              onClose={() => {
                setIsSaving(false);
              }}
            />
          </main>
        )}
      </Form>
    </>
  );
};

export default ApplicationEditForm;
