import {
  ClubApplicationAnswerChoice,
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import { useState } from "react";

import Checklist from "../checklist";
import FileUpload from "../fileUpload";
import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";

// TODO: add id field to fetch user answers

type PropType = {
  questions: (ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswerChoice[];
  })[];
  applicationId?: string;
};

const ApplicationForm = (props: PropType) => {
  const { questions } = props;

  // TODO: if applicaiton id is passed down fetch questions from application id instead of using questions

  const [questionsMap, setQuestionsMap] =
    useState<ClubApplicationQuestion[]>(questions); // TODO: fetch if id is provided

  return (
    <>
      <div className="border-1 flex flex-col gap-y-8 rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
        {questions.map(
          (
            question: ClubApplicationQuestion & {
              clubApplicationAnswers: ClubApplicationAnswerChoice[];
            },
            index: number,
          ) => (
            <div key={`applicationQuestion${index}${question.question}`} className="">
              <div className="flex flex-row items-start">
                {question.required && (
                  <h1 className="mx-1 my-0.5 font-black text-red-600">*</h1>
                )}
                <h2 className="max-w-2xl capitalize text-white">
                  {question.question}
                </h2>
              </div>

              {question.type === ClubApplicationQuestionType.TEXT_INPUT && (
                <Input />
              )}
              {question.type === ClubApplicationQuestionType.TEXT_FIELD && (
                <Textarea
                  className="h-[3rem] rounded-xl bg-white p-4"
                  rows={4}
                />
              )}
              {question.type ===
                ClubApplicationQuestionType.MULTIPLE_CHOICE && (
                <MultipleChoice
                  answerChoices={question.clubApplicationAnswers}
                />
              )}
              {question.type === ClubApplicationQuestionType.FILE_UPLOAD && (
                <FileUpload />
              )}
              {question.type ===
                ClubApplicationQuestionType.MULTIPLE_SELECT && (
                <Checklist answerChoices={question.clubApplicationAnswers} />
              )}
            </div>
          ),
        )}
      </div>

      {/* TODO: add buttons for submit / save */}
    </>
  );
};

export default ApplicationForm;
