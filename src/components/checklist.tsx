import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";

type PropType = {
  answerChoices: string[];
  value?: string[];
  isRequired: boolean;
  label: string;
  onChange(values: string[]): void;
};

const Checklist = (props: PropType) => {
  const { answerChoices, value, isRequired, label, onChange } = props;

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (value) setSelectedAnswers(value);
  }, [value]);

  return (
    <>
      <CheckboxGroup
        label={<span className="text-xl text-white">{label}</span>}
        defaultValue={selectedAnswers}
        value={value}
        isRequired={isRequired}
      >
        {answerChoices.map((answerChoice: string, index: number) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={`checklist${index}${answerChoice}`}
            >
              <Checkbox
                id={`${answerChoice}${index}`}
                color="secondary"
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
                value={answerChoice}
              >
                <span className="text-lg text-white">{answerChoice}</span>
              </Checkbox>
            </div>
          );
        })}
      </CheckboxGroup>
    </>
  );
};

export default Checklist;
