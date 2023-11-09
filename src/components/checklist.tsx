import { useEffect, useState } from "react";

import { Checkbox } from "./shadcn_ui/checkbox";

type PropType = {
  answerChoices: string[];
  value?: string[];
  onChange(values: string[]): void;
};

const Checklist = (props: PropType) => {
  const { answerChoices, value, onChange } = props;

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (value) setSelectedAnswers(value);
  }, [value]);

  return (
    <>
      <div className="flex flex-col gap-y-2 p-4 text-white">
        {answerChoices.map((answerChoice: string, index: number) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={`checklist${index}${answerChoice}`}
            >
              <Checkbox
                id={`${answerChoice}${index}`}
                className="bg-white text-black checked:bg-white"
                onClick={() => {
                  let updatedAnswers = [...selectedAnswers];
                  if (selectedAnswers.includes(answerChoice)) {
                    const targetIndex = selectedAnswers.indexOf(answerChoice);
                    updatedAnswers.splice(targetIndex, 1);
                  } else {
                    updatedAnswers.push(answerChoice);
                  }
                  setSelectedAnswers(updatedAnswers);
                  onChange(updatedAnswers);
                }}
                checked={value && value.includes(answerChoice)}
              />
              <label
                htmlFor={`${answerChoice}${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {answerChoice}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Checklist;
