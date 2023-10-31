import {
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
  ClubApplicationSubmissionAnswer,
  ClubApplicationSubmissionStatus,
} from "@prisma/client";
import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "~/components/button";
import { api } from "~/utils/api";
import { dateToStringFormatted } from "~/utils/helpers";
import Checklist from "../checklist";
import FileUpload from "../fileUpload";
import LoadingPage from "../loadingPage";
import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";

type PropType = {
  clubId: string;
  name?: string;
  description?: string;
  deadline?: Date;
  questions?: ClubApplicationQuestion[];
  savedAnswers?: ClubApplicationSubmissionAnswer[];
  clubApplicationId?: string;
  clubApplicationSubmissionId?: string;
  readonly?: boolean;
};

type AnswerTypes = string | string[] | undefined;

type LocalClubApplicationSubmissionAnswer = Omit<
  ClubApplicationSubmissionAnswer,
  "id" | "clubApplicationSubmissionId"
>;

type ApplicationForm = {
  name: string;
  description: string;
  deadline?: Date;
  questions: ClubApplicationQuestion[];
  answers: LocalClubApplicationSubmissionAnswer[];
};

const ApplicationForm = (props: PropType) => {
  const {
    clubId,
    name,
    description,
    deadline,
    questions,
    savedAnswers,
    clubApplicationId,
    clubApplicationSubmissionId,
    readonly,
  } = props;

  const [isSaving, setIsSaving] = useState(false);

  const [applicationFormState, setApplicationFormState] =
    useState<ApplicationForm>({
      name: name || "",
      description: description || "",
      questions: questions || [],
      answers: savedAnswers || [],
    });

  useEffect(() => {
    if (savedAnswers) {
      setApplicationFormState({
        ...applicationFormState,
        answers: savedAnswers,
      });
    }
  }, [savedAnswers]);

  const upsertClubApplicationSubmission =
    api.clubApplicationSubmissionRouter.upsertClubApplicationSubmission.useMutation(
      {
        onSuccess() {
          toast.dismiss();
          toast.success("Success!");
          // toast.loading("Redirecting to club home page...");
          setTimeout(() => {
            router.push(`/club/${clubId}`);
          }, 1000);
        },
        onError() {
          toast.dismiss();
          toast.error("Error...");
          setIsSaving(false);
        },
      },
    );

  const createClubApplicationSubmissionAnswer =
    api.clubApplicationSubmissionAnswerRouter.createClubApplicationSubmissionAnswer.useMutation(
      {},
    );
  const deleteClubApplicationSubmissionAnswerChoices =
    api.clubApplicationSubmissionAnswerRouter.deleteAllClubApplicationSubmissionAnswersByClubApplicationSubmissionId.useMutation(
      {},
    );

  useEffect(() => {
    if (clubApplicationId) {
      setApplicationFormState({
        name: name || "",
        description: description || "",
        questions: questions || [],
        answers: savedAnswers || [],
        deadline,
      });
    }
  }, [clubApplicationId]);

  const checkValidAnswers = (
    answers: LocalClubApplicationSubmissionAnswer[],
  ) => {
    if (!questions) return false;
    for (let i = 0; i < answers.length; i++) {
      if (
        answers[i] !== undefined &&
        answers[i]?.answer === undefined &&
        questions[i]?.required
      )
        return false;
    }
    return true;
  };

  const handleUpdateAnswers = (
    value: AnswerTypes,
    questionId: string,
    index: number,
  ) => {
    const updatedAnswers = [...applicationFormState.answers];
    if (typeof value === "string") {
      updatedAnswers[index] = {
        answer: value,
        selectedAnswers: [],
        clubApplicationQuestionId: questionId,
      };
    } else if (Array.isArray(value)) {
      updatedAnswers[index] = {
        answer: null,
        selectedAnswers: value,
        clubApplicationQuestionId: questionId,
      };
    }

    setApplicationFormState({
      ...applicationFormState,
      answers: updatedAnswers,
    });
  };

  const handleSubmitAnswers = (
    answers: LocalClubApplicationSubmissionAnswer[],
  ) => {
    if (!checkValidAnswers(answers)) {
      toast.dismiss();
      toast.error("Please fill out the entire form!");
    } else {
      if (clubApplicationId && !isSaving) {
        setIsSaving(true);
        upsertClubApplicationSubmission.mutate({
          clubApplicationSubmissionId,
          clubApplicationId,
          status: ClubApplicationSubmissionStatus.SUBMITTED,
        });
      }
    }
  };

  const handleSaveAnswers = async (
    answers: LocalClubApplicationSubmissionAnswer[],
  ) => {
    if (clubApplicationId && !isSaving) {
      setIsSaving(true);
      const clubApplicationSubmission =
        await upsertClubApplicationSubmission.mutateAsync({
          clubApplicationSubmissionId,
          clubApplicationId,
          status: ClubApplicationSubmissionStatus.DRAFT,
        });

      deleteClubApplicationSubmissionAnswerChoices.mutate({
        clubApplicationSubmissionId: clubApplicationSubmission.id,
      });

      answers.forEach(
        (answer: LocalClubApplicationSubmissionAnswer) => {
          createClubApplicationSubmissionAnswer.mutate({
            clubApplicationSubmissionId: clubApplicationSubmission.id,
            clubApplicationQuestionId: applicationFormState.questions.find(
              (question) => question.id === answer.clubApplicationQuestionId,
            )?.id as unknown as string,
            answer: answer.answer || answer.selectedAnswers,
          });
        },
      );
    }
  };

  if (!clubApplicationId) {
    return <LoadingPage />;
  } else {
    return (
      <section className="flex flex-col gap-y-4">
        <h1 className="text-center text-4xl font-black uppercase text-black underline">
          {applicationFormState.name}
        </h1>
        <h2 className="text-center text-lg font-bold text-black">
          Deadline:
          {applicationFormState.deadline
            ? dateToStringFormatted(applicationFormState.deadline)
            : " TBD"}
        </h2>
        <p className="text-center text-black">
          {applicationFormState.description}
        </p>

        <div className="border-1 flex flex-col gap-y-8 overflow-y-scroll rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
          {applicationFormState.questions.map(
            (question: ClubApplicationQuestion, index: number) => (
              <div key={`applicationQuestion${index}${question.question}`}>
                <div className="flex flex-row items-start">
                  {question.required && (
                    <h1 className="mx-1 my-0.5 font-black text-red-600">*</h1>
                  )}
                  <h2 className="max-w-2xl capitalize text-white">
                    {question.question}
                  </h2>
                </div>

                {question.type === ClubApplicationQuestionType.TEXT_INPUT && (
                  <Input
                    value={
                      applicationFormState.answers.find(
                        (answer) =>
                          question.id === answer.clubApplicationQuestionId,
                      )?.answer || ""
                    }
                    onChange={(e) => {
                      if (e.currentTarget.value.trim() === "") {
                        handleUpdateAnswers(undefined, question.id, index);
                      } else {
                        handleUpdateAnswers(
                          e.currentTarget.value,
                          question.id,
                          index,
                        );
                      }
                    }}
                  />
                )}
                {question.type === ClubApplicationQuestionType.TEXT_FIELD && (
                  <Textarea
                    className="h-[3rem] rounded-xl bg-white p-4"
                    value={
                      applicationFormState.answers.find(
                        (answer) =>
                          question.id === answer.clubApplicationQuestionId,
                      )?.answer || ""
                    }
                    onChange={(e) => {
                      if (e.currentTarget.value.trim() === "") {
                        handleUpdateAnswers(undefined, question.id, index);
                      } else {
                        handleUpdateAnswers(
                          e.currentTarget.value,
                          question.id,
                          index,
                        );
                      }
                    }}
                    rows={4}
                  />
                )}
                {question.type ===
                  ClubApplicationQuestionType.MULTIPLE_CHOICE && (
                    <MultipleChoice
                      answerChoices={question.clubApplicationAnswerChoices}
                      savedAnswer={
                        applicationFormState.answers.find(
                          (answer) =>
                            question.id === answer.clubApplicationQuestionId,
                        )?.answer || ""
                      }
                      onChange={(value: string) =>
                        handleUpdateAnswers(value, question.id, index)
                      }
                    />
                  )}
                {question.type === ClubApplicationQuestionType.FILE_UPLOAD && (
                  <FileUpload />
                )}
                {question.type ===
                  ClubApplicationQuestionType.MULTIPLE_SELECT && (
                    <Checklist
                      answerChoices={question.clubApplicationAnswerChoices}
                      savedAnswers={
                        applicationFormState.answers.find(
                          (answer) =>
                            question.id === answer.clubApplicationQuestionId,
                        )?.selectedAnswers || []
                      }
                      onChange={(values: string[]) =>
                        handleUpdateAnswers(values, question.id, index)
                      }
                    />
                  )}
              </div>
            ),
          )}
        </div>
        {!readonly && (
          <div className="my-2 flex grow flex-row justify-center gap-4">
            <Button
              onClick={() => handleSaveAnswers(applicationFormState.answers)}
            >
              Save for later
            </Button>
            <Button
              className="bg-white/10 backdrop-invert"
              onClick={() => handleSubmitAnswers(applicationFormState.answers)}
            >
              Submit application
            </Button>
          </div>
        )}
      </section>
    );
  }
};

export default ApplicationForm;
