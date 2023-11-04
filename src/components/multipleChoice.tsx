import { ChangeEvent, useEffect } from "react";

import { Label } from "./shadcn_ui/label";
import { RadioGroup, RadioGroupItem } from "./shadcn_ui/radio-group";

type PropType = {
  answerChoices: string[];
  defaultValue?: string;
  value?: string;
  onChange: (e: string) => void;
};

const MultipleChoice = (props: PropType) => {
  const { answerChoices, defaultValue, value, onChange } = props;

  return (
    <>
      <RadioGroup defaultValue="comfortable" className="p-4 text-white">
        {answerChoices.map((answerChoice: string, index: number) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={`${answerChoice}${index}`}
            >
              <RadioGroupItem
                value={answerChoice}
                id={`${answerChoice}${index}`}
                onClick={() => onChange(answerChoice)}
                defaultChecked={defaultValue === answerChoice}
                checked={value === answerChoice}
                className="bg-white text-primary"
              />
              <Label htmlFor={`${answerChoice}${index}`}>{answerChoice}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
