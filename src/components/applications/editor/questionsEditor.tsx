import "@prisma/client";

import { ApplicationQuestion, ApplicationQuestionType } from "@prisma/client";
import update from "immutability-helper";
import { Dispatch, SetStateAction, useCallback } from "react";
import { SquarePlus } from "tabler-icons-react";

import DraggableCard from "~/components/draggableCard";
import AnswerChoicesEditor from "./answerChoicesEditor";
import QuestionCard from "./questionCard";

type PropType = {
  questions: ApplicationQuestion[];
  setQuestions: Dispatch<SetStateAction<ApplicationQuestion[]>>;
};

const QuestionsEditor = (props: PropType) => {
  const { questions, setQuestions } = props;

  const updateQuestion = (
    field: string,
    value: boolean | string | string[] | ApplicationQuestionType,
    index: number,
    question: ApplicationQuestion,
  ) => {
    const newQuestionsForm = questions;
    newQuestionsForm[index] = {
      id: question.id,
      required: question.required,
      type: question.type,
      question: question.question,
      orderNumber: question.orderNumber,
      answerChoices: question.answerChoices,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      [field]: value,
    } as ApplicationQuestion;
    setQuestions([...newQuestionsForm]);
  };

  const deleteQuestion = (index: number) => {
    const newQuestionsForm = questions;
    newQuestionsForm.splice(index, 1);
    setQuestions([...newQuestionsForm]);
  };

  const moveQuestions = useCallback((dragIndex: number, hoverIndex: number) => {
    setQuestions((prevQuestions: ApplicationQuestion[]) =>
      update(prevQuestions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevQuestions[dragIndex] as ApplicationQuestion],
        ],
      }),
    );
  }, []);

  return (
    <>
      <section className="border-1 w-[75rem] rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
        {questions.map((question, index: number) => {
          return (
            <DraggableCard
              className="border-1 my-4 rounded-xl border border-white p-4"
              key={`question${index}${question.question}`}
              index={index}
              moveCard={moveQuestions}
            >
              <QuestionCard
                question={question as ApplicationQuestion}
                index={index}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
              />

              <div className="ml-20">
                {question.type === ApplicationQuestionType.MULTIPLE_CHOICE ||
                question.type === ApplicationQuestionType.MULTIPLE_SELECT ? (
                  <AnswerChoicesEditor
                    question={question as ApplicationQuestion}
                    questionIndex={index}
                    updateQuestions={updateQuestion}
                  />
                ) : (
                  <></>
                )}
              </div>
            </DraggableCard>
          );
        })}

        <div className="flex flex-row py-10">
          <button
            className="group flex flex-row items-center justify-center"
            onClick={() => {
              setQuestions([
                ...questions,
                {
                  id: undefined,
                  required: undefined,
                  question: "",
                  type: undefined,
                  answerChoices: [],
                } as unknown as ApplicationQuestion,
              ]);
            }}
          >
            <div className="flex flex-row items-center">
              <SquarePlus className="mx-auto h-14 w-14 text-white duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
              <h1 className="tracking-none whitespace-nowrap text-2xl font-black uppercase text-white group-hover:cursor-pointer group-hover:text-gray">
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
