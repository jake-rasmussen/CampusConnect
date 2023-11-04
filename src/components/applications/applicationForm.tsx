import {
  Application,
  ApplicationQuestion,
  ApplicationQuestionType,
  ApplicationSubmission,
  ApplicationSubmissionAnswer,
  Prisma,
} from "@prisma/client";
import { Field, FieldArray, FieldArrayItem, Form } from "houseform";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { dateToStringFormatted } from "~/utils/helpers";
import Button from "../button";
import LoadingPage from "../loadingPage";
import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";
import Checklist from "../checklist";

type PropType = {
  projectId: string;
  applicationId: string;
  name: string;
  description: string;
  deadline?: Date;
  questions: ApplicationQuestion[];
  savedAnswers?: ApplicationFormSubmissionAnswer[];
  readonly?: boolean;
  handleSaveAnswers: (answers: ApplicationFormSubmissionAnswer[]) => void;
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
    handleSaveAnswers
  } = props;

  const handleSubmitAnswers = (answers: ApplicationSubmissionAnswer[]) => {
    if (!checkValidAnswers(answers)) {
      toast.dismiss();
      toast.error("Please fill out the entire form!");
    } else {
      if (applicationId) {
        handleSaveAnswers(answers);
      }
    }
  };

  const checkValidAnswers = (answers: ApplicationFormSubmissionAnswer[]) => {
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

  const checkSavedAnswer = (question: ApplicationQuestion) => {
    return savedAnswers &&
      (savedAnswers.find(
        (answer) =>
          answer.applicationQuestionId ===
          question.id,
      )?.answer as string | string[]) || ""
  }

  if (!applicationId) {
    return <LoadingPage />;
  } else {
    return (
      <section className="flex flex-col gap-y-4">
        <h1 className="text-center text-4xl font-black uppercase text-black underline">
          {name}
        </h1>
        <h2 className="text-center text-lg font-bold text-black">
          Deadline:
          {deadline ? dateToStringFormatted(deadline) : " TBD"}
        </h2>
        <p className="text-center text-black">{description}</p>

        <div className="border-1 flex flex-col gap-y-8 overflow-y-scroll rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
          <Form
            onSubmit={async (values) => {
              await handleSubmitAnswers(values as ApplicationSubmissionAnswer[]);
            }}
          >
            {({ submit }) => (
              <form className="flex flex-col gap-y-8">
                {questions.map((question: ApplicationQuestion, index: number) => (
                  <Field<ApplicationFormSubmissionAnswer>
                    name={`answer${index}`}
                    key={`answer-${index}`}
                  >
                    {({ value, setValue }) => {
                      return (
                        <div>
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
                              defaultValue={checkSavedAnswer(question) as string}
                              onChange={(e) => setValue({
                                ...value,
                                applicationQuestionId: question.id,
                                answer: e.currentTarget.value
                              })}
                            />
                          )}
                          {question.type === ApplicationQuestionType.TEXT_FIELD && (
                            <Textarea
                              className="h-[3rem] rounded-xl bg-white p-4"
                              defaultValue={checkSavedAnswer(question) as string}
                              onChange={(e) => setValue({
                                ...value,
                                applicationQuestionId: question.id,
                                answer: e.currentTarget.value
                              })}
                              rows={4}
                            />
                          )}
                          {question.type ===
                            ApplicationQuestionType.MULTIPLE_CHOICE && (
                              <MultipleChoice
                                answerChoices={question.answerChoices}
                                defaultValue={checkSavedAnswer(question) as string}
                                value={value.answer as string}
                                onChange={(e: string) => setValue({
                                  ...value,
                                  applicationQuestionId: question.id,
                                  answer: e
                                })}
                              />
                            )}
                          {question.type ===
                            ApplicationQuestionType.MULTIPLE_SELECT && (
                              <Checklist
                                answerChoices={question.answerChoices}
                                defaultValue={checkSavedAnswer(question) as string[]}
                                value={value.answer as string[]}
                                onChange={(e: string[]) => setValue({
                                  ...value,
                                  applicationQuestionId: question.id,
                                  answer: e
                                })
                                }
                              />
                            )}
                          {/* 
                          {question.type === ClubApplicationQuestionType.FILE_UPLOAD && (
                            <FileUpload />
                          )}
                          */}
                        </div>
                      )
                    }}
                  </Field>
                )
                )}
                {!readonly && (
                  <div className="my-2 flex grow flex-row justify-center gap-4">
                    <Button
                      onClick={() => submit()}
                    >
                      Save for later
                    </Button>
                    <Button
                      className="bg-white/10 backdrop-invert"
                      onClick={() => submit()}
                    >
                      Submit application
                    </Button>
                  </div>
                )}
              </form>
            )}
          </Form>
        </div>
      </section>
    );
  }
};

export default ApplicationForm;
