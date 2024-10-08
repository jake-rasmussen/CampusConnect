import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

type PropType = {
  answerChoices: string[];
  value?: string;
  isRequired: boolean;
  label: string;
  onChange: (e: string) => void;
};

const MultipleChoice = (props: PropType) => {
  const { answerChoices, value, isRequired, label, onChange } = props;

  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  useEffect(() => {
    setSelectedAnswer(value);
  }, [value]);

  console.log(selectedAnswer)

  return (
    <>
      <RadioGroup
        className="text-white"
        label={<span className="text-white text-lg">{label}</span>}
        isRequired={isRequired}
        value={selectedAnswer}
      >
        {answerChoices.map((answerChoice: string, index: number) => {
          return (
            <div
              className="flex items-center space-x-2"
              key={`${answerChoice}${index}`}
            >
              <Radio
                value={answerChoice}
                id={`${answerChoice}${index}`}
                onClick={() => {
                  // setSelectedAnswer(answerChoice);
                  onChange(answerChoice);
                }}
                color="secondary"
              >
                <span className="text-white">{answerChoice}</span>
              </Radio>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
