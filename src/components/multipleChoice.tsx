import { Radio, RadioGroup } from "@heroui/react";
import { useEffect, useState } from "react";

type PropType = {
  answerChoices: string[];
  value?: string;
  isRequired: boolean;
  label: string;
  onChange: (e: string) => void;
  readonly?: boolean;
};

const MultipleChoice = (props: PropType) => {
  const { answerChoices, value, isRequired, label, onChange, readonly } = props;

  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  
  useEffect(() => {
    setSelectedAnswer(value);
  }, [value]);

  return (
    <>
      <RadioGroup
        className="text-white"
        label={<span className="text-xl text-white">{label}</span>}
        isRequired={isRequired}
        onValueChange={(answerChoice) => onChange(answerChoice)}
        value={selectedAnswer}
        isReadOnly={readonly}
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
                color="secondary"
              >
                <span className="text-lg text-white">{answerChoice}</span>
              </Radio>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default MultipleChoice;
