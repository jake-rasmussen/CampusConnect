import "@prisma/client";
import update from "immutability-helper"; // TODO: look into this
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { SquarePlus } from "tabler-icons-react";

import Button from "~/components/button";
import QuestionCard from "./questionCard";

import type {
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";

export type ClubApplicationQuestionForForm = {
  id: string | undefined;
  required: boolean | undefined;
  question: string;
  type: ClubApplicationQuestionType | undefined;
};

type PropType = {
  questionsForm: ClubApplicationQuestionForForm[];
  setQuestionsForm: Dispatch<SetStateAction<ClubApplicationQuestionForForm[]>>;
};

const QuestionsEditor = (props: PropType) => {
  const { questionsForm, setQuestionsForm } = props;

  const updateQuestionsForm = (
    field: string,
    value: boolean | string | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestionForForm,
  ) => {
    const newQuestionsForm = questionsForm;
    newQuestionsForm[index] = {
      id: question.id,
      required: question.required,
      type: question.type,
      question: question.question,
      [field]: value,
    };
    setQuestionsForm(newQuestionsForm);
  };

  const deleteQuestionFormElement = (index: number) => {
    const newQuestionsForm = questionsForm;
    newQuestionsForm.splice(index, 1);
    setQuestionsForm([...newQuestionsForm]);
  };

  const moveQuestions = useCallback((dragIndex: number, hoverIndex: number) => {
    setQuestionsForm((prevQuestions: ClubApplicationQuestionForForm[]) =>
      update(prevQuestions, {
        $splice: [
          [dragIndex, 1],
          [
            hoverIndex,
            0,
            prevQuestions[dragIndex] as ClubApplicationQuestionForForm,
          ],
        ],
      }),
    );
  }, []);

  return (
    <>
      <section className="border-1 w-[75rem] rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
        {questionsForm.map(
          (question: ClubApplicationQuestionForForm, index: number) => {
            return (
              <QuestionCard
                question={question as ClubApplicationQuestion}
                index={index}
                updateQuestionsForm={updateQuestionsForm}
                deleteQuestionFormElement={deleteQuestionFormElement}
                moveQuestions={moveQuestions}
                key={`question${index}${question.question}`}
              />
            );
          },
        )}

        <div className="py-10">
          <button
            className="group flex flex-row items-center justify-center"
            onClick={() => {
              setQuestionsForm([
                ...questionsForm,
                {
                  id: undefined,
                  required: undefined,
                  question: "",
                  type: undefined,
                },
              ]);
            }}
          >
            <div className="flex flex-row items-center">
              <SquarePlus className="mx-auto h-14 w-14 text-white duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
              <h1 className="tracking-none text-2xl font-black uppercase text-white group-hover:cursor-pointer group-hover:text-gray">
                Create Question
              </h1>
            </div>
          </button>
        </div>

      </section>
    </>
  );
};

export default QuestionsEditor;
