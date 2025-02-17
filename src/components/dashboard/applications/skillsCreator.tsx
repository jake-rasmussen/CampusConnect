import { Chip, Input } from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "tabler-icons-react";

type PropType = {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
};

const SkillsCreator = (props: PropType) => {
  const { skills, setSkills, placeholder } = props;

  const [value, setValue] = useState<string>("");

  const handleAddSkill = (skill: string) => {
    const updatedSkills = skills;
    updatedSkills.push(skill);
    setSkills([...updatedSkills]);
    setValue("");
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills;
    updatedSkills.splice(index, 1);
    setSkills([...updatedSkills]);
  };

  return (
    <>
      <section className="text-center">
        <h3 className="tracking-none text-xl font-black uppercase">
          Add Skills
        </h3>
        <p className="py-2">
          Increase discoverability by adding relevant skills!
        </p>
        <Input
          size="lg"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.length > 0) handleAddSkill(value);
          }}
          placeholder={placeholder}
          className="py-4"
        />

        <div className="mx-auto flex max-w-xs flex-wrap items-center justify-center gap-2 pt-4">
          {skills.map((skill, index) => (
            <div className="relative" onClick={() => handleRemoveSkill(index)}>
              <Chip className="h-[2rem] bg-secondary capitalize text-white shadow-xl hover:cursor-pointer" key={skill}>
                {skill}
              </Chip>

              <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-black bg-opacity-30 p-px">
                <X className="h-4 w-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SkillsCreator;
