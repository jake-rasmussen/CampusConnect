import {
  ApplicationQuestion,
  ApplicationQuestionType,
  ApplicationSubmissionAnswer,
} from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
} from "~/utils/helpers";
import Button from "../button";
import Checklist from "../checklist";
import FileUpload from "../fileUpload";
import LoadingPage from "../loadingPage";
import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";

type PropType = {
  projectId: string;
  applicationId: string;
  name: string;
  description: string;
  deadline?: Date;
  questions: ApplicationQuestion[];
  savedAnswers?: ApplicationSubmissionAnswer[];
  readonly?: boolean;
  handleSaveAnswers?: (
    answers: ApplicationSubmissionAnswer[],
    files: File[],
    submit?: boolean,
  ) => void;
  isSaving?: boolean;
};

export type ApplicationFormSubmissionAnswer = Omit<
  ApplicationSubmissionAnswer,
  "id" | "applicationSubmissionId"
>;

type ApplicationForm = {
  name: string;
  description: string;
  deadline?: Date;
  questions: ApplicationQuestion[];
  answers: ApplicationFormSubmissionAnswer[];
};

const ApplicationForm = (props: PropType) => {
  const {
    projectId,
    applicationId,
    name,
    description,
    questions,
    deadline,
    savedAnswers,
    readonly,
    handleSaveAnswers,
    isSaving,
  } = props;

  const [answersMap, setAnswersMap] = useState<
    Map<string, ApplicationFormSubmissionAnswer>
  >(new Map());

  const [filesMap, setFilesMap] = useState<Map<string, File>>(new Map());

  useEffect(() => {
    if (savedAnswers) {
      savedAnswers.forEach((savedAnswer) => {
        const { answer } = savedAnswer.answer as { answer: string | string[] };
        setAnswersMap((prevAnswersMap) => {
          const updatedMap = new Map(prevAnswersMap); // Clone the existing Map
          updatedMap.set(savedAnswer.applicationQuestionId, {
            answer,
            applicationQuestionId: savedAnswer.applicationQuestionId,
          });
          return updatedMap; // Return the updated Map
        });
      });
    }
  }, [savedAnswers]);

  const handleUpdateAnswer = (
    questionId: string,
    answer: string | string[],
  ) => {
    if (questionId) {
      const updatedMap = new Map(answersMap);
      updatedMap.set(questionId, {
        answer,
        applicationQuestionId: questionId,
      });
      setAnswersMap(updatedMap);
    }
  };

  const handleUpdateFile = (questionId: string, answer: File) => {
    if (questionId) {
      const updatedMap = new Map(filesMap);
      updatedMap.set(questionId, answer);
      setFilesMap(updatedMap);
    }
  };

  const handleSubmitAnswers = (
    answers: ApplicationSubmissionAnswer[],
    files: File[],
  ) => {
    if (!checkValidAnswers()) {
      toast.dismiss();
      toast.error("Please fill out the entire form!");
    } else {
      if (applicationId && handleSaveAnswers) {
        handleSaveAnswers(answers, files, true);
      }
    }
  };

  const checkValidAnswers = () => {
    if (!questions) return false;

    for (const question of questions) {
      if (question.required) {
        if (!answersMap.has(question.id)) return false;
        if (answersMap.get(question.id)?.answer === "") return false;
      }
    }

    return true;
  };

  if (!applicationId) {
    return <LoadingPage />;
  } else {
    return (
      <section className="flex flex-col gap-y-4">
        <h1 className="text-center text-4xl font-black uppercase text-black underline">
          {name}
        </h1>
        {!readonly && (
          <h2 className="text-center text-lg font-bold text-black">
            {`Deadline: ${
              deadline
                ? dateToStringFormatted(deadline) +
                  " at " +
                  dateToTimeStringFormatted(deadline)
                : " TBD"
            }`}
          </h2>
        )}

        <p className="text-center text-black">{description}</p>

        <div className="border-1 flex flex-col gap-y-8 overflow-y-scroll rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
          <form className="flex flex-col gap-y-4">
            {questions.map((question: ApplicationQuestion, index: number) => (
              <div key={`question${index}`}>
                <div className="flex flex-row items-start">
                  {question.required && (
                    <h1 className="mx-1 my-0.5 font-black text-red-600">*</h1>
                  )}
                  <h2 className="max-w-2xl capitalize text-white">
                    {question.question}
                  </h2>
                </div>

                {question.type === ApplicationQuestionType.TEXT_INPUT && (
                  <Input
                    value={
                      (answersMap?.get(question.id)?.answer as string) || ""
                    }
                    onChange={(e) => {
                      if (!readonly)
                        handleUpdateAnswer(question.id, e.currentTarget.value);
                    }}
                  />
                )}
                {question.type === ApplicationQuestionType.TEXT_FIELD && (
                  <Textarea
                    className="h-[3rem] rounded-xl bg-white"
                    value={
                      (answersMap?.get(question.id)?.answer as string) || ""
                    }
                    onChange={(e) => {
                      if (!readonly)
                        handleUpdateAnswer(question.id, e.currentTarget.value);
                    }}
                    rows={4}
                  />
                )}
                {question.type === ApplicationQuestionType.MULTIPLE_CHOICE && (
                  <MultipleChoice
                    answerChoices={question.answerChoices}
                    value={
                      (answersMap?.get(question.id)?.answer as string) || ""
                    }
                    onChange={(e: string) => {
                      if (!readonly) handleUpdateAnswer(question.id, e);
                    }}
                  />
                )}
                {question.type === ApplicationQuestionType.MULTIPLE_SELECT && (
                  <Checklist
                    answerChoices={question.answerChoices}
                    value={
                      (answersMap?.get(question.id)?.answer as string[]) || []
                    }
                    onChange={(e: string[]) => {
                      if (!readonly) handleUpdateAnswer(question.id, e);
                    }}
                  />
                )}

                {question.type === ApplicationQuestionType.FILE_UPLOAD && (
                  <FileUpload
                    value={
                      (answersMap?.get(question.id)?.answer as string) || ""
                    }
                    onChange={(e: File) => {
                      console.log("Here");
                      if (!readonly) {
                        handleUpdateAnswer(question.id, e.name);
                        console.log(e.name, answersMap);
                        handleUpdateFile(question.id, e);
                      }
                    }}
                    projectId={projectId}
                    applicationId={applicationId}
                    readonly={readonly}
                  />
                )}
              </div>
            ))}
            {!readonly && (
              <div className="my-2 flex grow flex-row justify-center gap-4">
                <Button
                  onClickFn={() => {
                    if (handleSaveAnswers && answersMap.size > 0) {
                      handleSaveAnswers(
                        Array.from(
                          answersMap.values(),
                        ) as ApplicationSubmissionAnswer[],
                        Array.from(filesMap.values()),
                      );
                    }
                  }}
                  disabled={isSaving}
                >
                  Save for later
                </Button>
                <Button
                  className="bg-white/10 backdrop-invert"
                  onClickFn={() =>
                    handleSubmitAnswers(
                      Array.from(
                        answersMap.values(),
                      ) as ApplicationSubmissionAnswer[],
                      Array.from(filesMap.values()),
                    )
                  }
                  disabled={isSaving}
                >
                  Submit application
                </Button>
              </div>
            )}
          </form>
        </div>
      </section>
    );
  }
};

export default ApplicationForm;
