import { ClubApplicationAnswerChoice } from "@prisma/client";

import { Checkbox } from "./shadcn_ui/checkbox";

type PropType = {
  answerChoices: ClubApplicationAnswerChoice[];
};

const Checklist = (props: PropType) => {
  const { answerChoices } = props;

  return (
    <>
      <div className="flex flex-col gap-y-2 p-4 text-white">
        {answerChoices.map((answerChoice) => {
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={answerChoice.id}
                className="bg-white text-black checked:bg-white"
              />
              <label
                htmlFor={answerChoice.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {answerChoice.answerChoice}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Checklist;
