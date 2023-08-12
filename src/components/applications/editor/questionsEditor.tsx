import "@prisma/client";

import {
  ClubApplicationAnswer,
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import update from "immutability-helper";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { SquarePlus } from "tabler-icons-react";

import Application from "../application";
import AnswerChoicesEditor from "./answerChoicesEditor";
import ApplicationPreviewDialog from "./applicationPreviewDialog";
import QuestionCard from "./questionCard";

export type ClubApplicationQuestionForForm = {
  id: string | undefined;
  required: boolean | undefined;
  question: string;
  clubApplicationAnswers: ClubApplicationAnswer[];
  type: ClubApplicationQuestionType | undefined;
};

type PropType = {
  questionsForm: ClubApplicationQuestionForForm[];
  setQuestionsForm: Dispatch<SetStateAction<ClubApplicationQuestionForForm[]>>;
  setQuestionsFormToDelete: Dispatch<
    SetStateAction<ClubApplicationQuestionForForm[]>
  >;
  setAnswerChoicesToDelete: Dispatch<
    SetStateAction<ClubApplicationAnswer[]>
  >;
};

const QuestionsEditor = (props: PropType) => {
  const { questionsForm, setQuestionsForm, setQuestionsFormToDelete, setAnswerChoicesToDelete} = props;

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  const updateQuestionsForm = (
    field: string,
    value:
      | boolean
      | string
      | ClubApplicationAnswer[]
      | ClubApplicationQuestionType,
    index: number,
    question: ClubApplicationQuestionForForm,
  ) => {
    const newQuestionsForm = questionsForm;
    newQuestionsForm[index] = {
      id: question.id,
      required: question.required,
      type: question.type,
      question: question.question,
      clubApplicationAnswers: question.clubApplicationAnswers,
      [field]: value,
    };
    setQuestionsForm([...newQuestionsForm]);
  };

  const deleteQuestion = (index: number) => {
    const newQuestionsForm = questionsForm;
    const questionToDelete = newQuestionsForm[index]!;
    newQuestionsForm.splice(index, 1);

    setQuestionsForm([...newQuestionsForm]);
    setQuestionsFormToDelete((prev: ClubApplicationQuestionForForm[]) => [
      ...prev,
      questionToDelete,
    ]);
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
              <div
                className="border-1  my-4 rounded-xl  border  border-white p-4"
                key={`question${index}${question.question}`}
              >
                <QuestionCard
                  question={
                    question as ClubApplicationQuestion & {
                      clubApplicationAnswers: ClubApplicationAnswer[];
                    }
                  }
                  index={index}
                  updateQuestionsForm={updateQuestionsForm}
                  deleteQuestion={deleteQuestion}
                  moveQuestions={moveQuestions}
                />

                <div className="ml-20">
                  {question.type ===
                    ClubApplicationQuestionType.MULTIPLE_CHOICE ||
                    question.type ===
                    ClubApplicationQuestionType.MULTIPLE_SELECT ? (
                    <AnswerChoicesEditor
                      question={
                        question as ClubApplicationQuestion & {
                          clubApplicationAnswers: ClubApplicationAnswer[];
                        }
                      }
                      questinIndex={index}
                      updateQuestionsForm={updateQuestionsForm}
                      setAnswerChoicesToDelete={setAnswerChoicesToDelete}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          },
        )}

        <div className="flex flex-row py-10">
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
                  clubApplicationAnswers: [],
                },
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

          <div className="flex grow justify-end">
            <ApplicationPreviewDialog
              dialogDescription={""}
              openDialog={openPreviewDialog}
              setOpenDialog={setOpenPreviewDialog}
            >
              <Application
                questions={
                  questionsForm as (ClubApplicationQuestion & {
                    clubApplicationAnswers: ClubApplicationAnswer[];
                  })[]
                }
              />
            </ApplicationPreviewDialog>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionsEditor;
