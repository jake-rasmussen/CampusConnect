import { Dispatch, SetStateAction, useState } from "react";
import { Trash, X } from "tabler-icons-react";

import { Badge } from "~/components/shadcn_ui/badge";
import { Input } from "~/components/shadcn_ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/shadcn_ui/tooltip";

type PropType = {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
};

const SkillsCreator = (props: PropType) => {
  const { skills, setSkills } = props;

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
      <section className="mt-8 text-center">
        <h3 className="tracking-none text-xl font-black uppercase">
          Create Skills
        </h3>
        <p className="py-2">
          Make your application more discoverable by adding relevant skills!
        </p>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.length > 0) handleAddSkill(value);
          }}
          placeholder="Enter skill for application..."
          className="my-4 py-4"
        />

        <div className="mx-auto flex max-w-xs flex-wrap items-center justify-center gap-2 pt-4">
          {skills.map((skill, index) => (
            <TooltipProvider key={`skillTooltip${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="relative"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-black bg-opacity-30 p-px">
                      <X className="h-4 w-4 text-white" />
                    </div>
                    <Badge className="h-[2rem] bg-secondary capitalize text-white shadow-xl hover:cursor-pointer">
                      {skill}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <Trash />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </section>
    </>
  );
};

export default SkillsCreator;
