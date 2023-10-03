import { ClubApplicationAnswerChoice } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form } from "houseform";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import ApplicationPublishConfirmationDialog, {
  ConfirmationFormType,
} from "~/components/applications/editor/applicationPublishConfirmationDialog";
import ErrorDialog from "~/components/errorDialog";
import { Textarea } from "~/components/shadcn_ui/textarea";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import { api } from "~/utils/api";
import Button from "../../button";
import ErrorMessage from "../../dashboard/errorMessage";
import { Input } from "../../shadcn_ui/input";
import ApplicationForm from "../applicationForm";
import ApplicationPreviewDialog from "./applicationPreviewDialog";
import QuestionsEditor from "./questionsEditor";

import type { ClubApplicationQuestion } from "@prisma/client";

type ApplicationFormType = {
  name: string;
  description: string;
};

type PropType = {
  applicationId: string;
  name?: string;
  description?: string;
  questions: (ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswerChoice[];
  })[];
  saveApplication: (
    name: string,
    description: string,
    questions: (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[],
    questionsToDelete: (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[],
    answersToDelete: ClubApplicationAnswerChoice[],
    setQuestionsState: Dispatch<
      SetStateAction<
        (ClubApplicationQuestion & {
          clubApplicationAnswers: ClubApplicationAnswerChoice[];
        })[]
      >
    >,
  ) => Promise<void>;
};

const ApplicationEditForm = (props: PropType) => {
  const { name, description, questions, applicationId, saveApplication } =
    props;
  const [questionsState, setQuestionsState] = useState<
    (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[]
  >([]);
  const [questionsToDelete, setQuestionsStateToDelete] = useState<
    ClubApplicationQuestion[]
  >([]);
  const [answerChoicesToDelete, setAnswerChoicesToDelete] = useState<
    ClubApplicationAnswerChoice[]
  >([]);
  const { clubId } = router.query;

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const queryClient = useQueryClient();

  const publishApplicationMutation =
    api.clubApplicationRouter.publishClubApplication.useMutation({
      onSuccess() {
        toast.success("Application published!");
        void queryClient.invalidateQueries();
        void router.push(`/member/${clubId as string}/`);
      },
    });

  useEffect(() => {
    setQuestionsState(
      Array.from(questions, (question, index: number) => {
        return {
          id: question.id,
          required: question.required,
          orderNumber: index,
          question: question.question,
          type: question.type,
          clubApplicationAnswers: question.clubApplicationAnswers,
          clubApplicationId: "",
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        };
      }),
    );
  }, []);

  useEffect(() => {
    setQuestionsStateToDelete([]);
    setAnswerChoicesToDelete([]);
  }, [questions]);

  const isApplicationFormValid = (name: string, description: string) => {
    if (name.trim() === "" || description.trim() === "") {
      return false;
    }
    for (const question of questionsState) {
      if (
        question.question === "" ||
        question.type === undefined ||
        question.required === undefined
      ) {
        return false;
      }

      for (const answerChoice of question.clubApplicationAnswers) {
        if (answerChoice.answerChoice === "") {
          return false;
        }
      }
    }
    return true;
  };

  const publishApplication = async (
    name: string,
    description: string,
    values: ConfirmationFormType,
  ) => {
    await saveApplication(
      name,
      description,
      questionsState as (ClubApplicationQuestion & {
        clubApplicationAnswers: ClubApplicationAnswerChoice[];
      })[],
      questionsToDelete as (ClubApplicationQuestion & {
        clubApplicationAnswers: ClubApplicationAnswerChoice[];
      })[],
      answerChoicesToDelete,
      setQuestionsState,
    );
    const deadline = new Date(values.date.getTime());
    deadline.setHours(values.time.getHours(), values.time.getMinutes(), 0, 0);

    publishApplicationMutation.mutate({
      applicationId,
      deadline,
    });
  };
  return (
    <>
      <Form<ApplicationFormType>
        onSubmit={(values) => {
          if (!isApplicationFormValid(values.name, values.description)) {
            setOpenErrorDialog(true);
            return;
          }
          saveApplication(
            values.name,
            values.description,
            questionsState as (ClubApplicationQuestion & {
              clubApplicationAnswers: ClubApplicationAnswerChoice[];
            })[],
            questionsToDelete as (ClubApplicationQuestion & {
              clubApplicationAnswers: ClubApplicationAnswerChoice[];
            })[],
            answerChoicesToDelete,
            setQuestionsState,
          ).finally(() => {
            return;
          });
        }}
      >
        {({ submit, getFieldValue, recomputeErrors }) => (
          <main className="flex flex-col items-center gap-4 py-4">
            <section className="mx-10 flex w-[50rem] flex-col gap-4">
              <Field
                name="name"
                initialValue={name}
                // onBlurValidate={z.string().min(1, "Enter an application name")}
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
                // onBlurValidate={z
                //   .string()
                //   .min(1, "Enter an application description")}
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
                questionsState={questionsState}
                setQuestionsState={setQuestionsState}
                setQuestionsStateToDelete={setQuestionsStateToDelete}
                setAnswerChoicesToDelete={setAnswerChoicesToDelete}
              />
            </section>

            <div className="flex grow flex-row justify-end gap-4">
              <Button
                onClick={() => {
                  submit().catch((e) => console.log(e));
                }}
              >
                Save
              </Button>

              <ApplicationPreviewDialog
                triggerButton={
                  <button
                    className="max-w-xs rounded-xl bg-white/10 px-4 py-4 backdrop-invert transition duration-300 ease-in-out hover:scale-110"
                  >
                    <h1 className="tracking-none font-black uppercase text-white">
                      Preview
                    </h1>
                  </button>
                }
                dialogDescription={""}
                openDialog={openPreviewDialog}
                setOpenDialog={setOpenPreviewDialog}
              >
                <ApplicationForm
                  name={getFieldValue("name")?.value}
                  description={getFieldValue("description")?.value}
                  questions={
                    questionsState as (ClubApplicationQuestion & {
                      clubApplicationAnswers: ClubApplicationAnswerChoice[];
                    })[]
                  }
                  applicationId={null}
                />
              </ApplicationPreviewDialog>
            </div>

            <ErrorDialog
              dialogDescription={
                "Please make sure that all fields are filled out!"
              }
              openDialog={openErrorDialog}
              setOpenDialog={setOpenErrorDialog}
            />
            <ApplicationPublishConfirmationDialog
              name={getFieldValue("name")?.value}
              description={getFieldValue("description")?.value}
              isApplicationFormValid={isApplicationFormValid}
              publishApplication={publishApplication}
              setErrorDialogOpen={setOpenErrorDialog}
            />
          </main>
        )}
      </Form>
    </>
  );
};

export default ApplicationEditForm;
