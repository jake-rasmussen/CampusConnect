import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useEffect, useState } from "react";

type PropType = {
  answerChoices: string[];
  value?: string[];
  isRequired: boolean;
  label: string;
  onChange(values: string[]): void;
  readonly?: boolean;
};

const Checklist = (props: PropType) => {
  const { answerChoices, value, isRequired, label, onChange, readonly = false } = props;

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
        onValueChange={(answerChoice) => {
          onChange(answerChoice);
        }}
        isRequired={isRequired}
        isReadOnly={readonly}
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
