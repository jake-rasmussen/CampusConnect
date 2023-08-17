import { Label } from "./shadcn_ui/label";
import { RadioGroup, RadioGroupItem } from "./shadcn_ui/radio-group";

import type { ClubApplicationAnswerChoice } from "@prisma/client";

type PropType = {
  answerChoices: ClubApplicationAnswerChoice[];
};

const MultipleChoice = (props: PropType) => {
  const { answerChoices } = props;

  return (
    <>
      <RadioGroup defaultValue="comfortable" className="p-4 text-white">
        {answerChoices.map((answerChoice) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={`${answerChoice.id}`}
            >
              <RadioGroupItem
                value={answerChoice.answerChoice}
                id={answerChoice.id}
                className="bg-white text-primary"
              />
              <Label htmlFor={answerChoice.id}>
                {answerChoice.answerChoice}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
