import { Input } from "@nextui-org/react";
import { ApplicationQuestion, ApplicationQuestionType } from "@prisma/client";
import { Circle, SquarePlus, X } from "tabler-icons-react";

type PropType = {
  question: ApplicationQuestion;
  questionIndex: number;
  updateQuestions: (
    field: string,
    value: boolean | string | string[] | ApplicationQuestionType,
    index: number,
    question: ApplicationQuestion,
  ) => void;
};

const AnswerChoicesEditor = (props: PropType) => {
  const { question, questionIndex, updateQuestions } = props;

  const createAnswerChoice = () => {
    const newAnswerChoices: string[] = question.answerChoices.concat([""]);
    updateQuestions("answerChoices", newAnswerChoices, questionIndex, question);
  };

  const deleteAnswerChoice = (answerChoiceIndex: number) => {
    const newAnswerChocies = question.answerChoices;
    newAnswerChocies.splice(answerChoiceIndex, 1);

    updateQuestions("answerChoices", newAnswerChocies, questionIndex, question);
  };

  const updateAnswerChoice = (answerChoiceIndex: number, value: string) => {
    const newAnswerChocies = question.answerChoices;
    newAnswerChocies[answerChoiceIndex] = value;
    updateQuestions("answerChoices", newAnswerChocies, questionIndex, question);
  };

  return (
    <section className="my-4">
      <div className="flex flex-col gap-y-2">
        {question.answerChoices &&
          question.answerChoices.map((answerChoice: string, index: number) => (
            <div
              className="my-2 flex flex-row items-center gap-4"
              key={`answerChoice${answerChoice}${index}`}
            >
              <Circle className="mr-2 h-2 w-2 rounded-full text-white backdrop-invert" />
              <Input
                className="max-w-lg"
                label={`Answer Choice ${index + 1}`}
                defaultValue={answerChoice}
                onBlur={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  updateAnswerChoice(index, value);
                }}
              />
              <button
                className="flex items-end justify-end"
                onClick={() => deleteAnswerChoice(index)}
              >
                <X className="h-[2rem] w-auto text-white transition duration-500 ease-in-out hover:rotate-90 hover:scale-110 hover:text-red-600" />
              </button>
            </div>
          ))}
        <div>
          <button
            className="group flex shrink flex-row items-center"
            onClick={() => createAnswerChoice()}
          >
            <SquarePlus className="h-10 w-10 text-white duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
            <h1 className="tracking-none whitespace-nowrap text-xl font-black uppercase text-white group-hover:cursor-pointer group-hover:text-gray">
              Create Answer Choice
            </h1>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnswerChoicesEditor;
