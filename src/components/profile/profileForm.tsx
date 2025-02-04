import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { Focus } from "@prisma/client";
import { Field } from "houseform";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { uppercaseToCapitalize } from "~/utils/helpers";
import SkillsCreator from "../dashboard/applications/skillsCreator";
import { ProfileFormType } from "./profileEditor";
import ProfileSocialMediaEditor, {
  SocialMediaFormType,
} from "./profileSocialMediaEditor";

type PropType = {
  step: number;
  formData: Partial<ProfileFormType>;
  setFormData: Dispatch<SetStateAction<Partial<ProfileFormType>>>;
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
  socialMedias: SocialMediaFormType[];
  setSocialMedias: Dispatch<SetStateAction<SocialMediaFormType[]>>;
};

const ProfileForm = (props: PropType) => {
  const {
    step,
    formData,
    setFormData,
    skills,
    setSkills,
    socialMedias,
    setSocialMedias,
  } = props;

  const saveFieldData = (field: keyof ProfileFormType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {step === 0 && (
        <main className="flex w-full flex-col items-center gap-4">
          <section className="flex w-full flex-col gap-4">
            <Field
              name="year"
              initialValue={formData.year || ""}
              onChangeValidate={z.string().min(1, "Enter your year")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Select
                  label="Year"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    saveFieldData("year", e.target.value);
                  }}
                  defaultSelectedKeys={formData.year ? [formData.year] : []}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                >
                  <SelectItem key="FRESHMAN">Freshman</SelectItem>
                  <SelectItem key="SOPHOMORE">Sophomore</SelectItem>
                  <SelectItem key="JUNIOR">Junior</SelectItem>
                  <SelectItem key="SENIOR">Senior</SelectItem>
                  <SelectItem key="MASTERS">Masters</SelectItem>
                  <SelectItem key="PHD">PhD</SelectItem>
                </Select>
              )}
            </Field>

            <div className="flex flex-row gap-4">
              <Field
                name="majors"
                initialValue={formData.majors || ""}
                onChangeValidate={z
                  .array(z.nativeEnum(Focus))
                  .min(1, "Select your major(s)")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <Select<Focus[]>
                    label="Major(s)"
                    selectionMode="multiple"
                    onSelectionChange={(e) => {
                      setValue(Array.from(e) as Focus[]);
                      saveFieldData("majors", Array.from(e) as Focus[]);
                    }}
                    selectedKeys={value}
                    defaultSelectedKeys={new Set(formData.majors)}
                    onBlur={onBlur}
                    isInvalid={!isValid}
                    errorMessage={errors[0]}
                    isRequired
                  >
                    {Object.values(Focus)
                      .sort()
                      .map((focus: Focus) => (
                        <SelectItem key={focus}>
                          {uppercaseToCapitalize(focus)}
                        </SelectItem>
                      ))}
                  </Select>
                )}
              </Field>

              <Field
                name="minors"
                initialValue={formData.minors || ""}
                onChangeValidate={z
                  .array(z.nativeEnum(Focus))
                  .min(1, "Select your minor(s)")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <Select
                    label="Minor(s)"
                    value={value}
                    selectionMode="multiple"
                    onSelectionChange={(e) => {
                      setValue(Array.from(e) as Focus[]);
                      saveFieldData("minors", Array.from(e) as Focus[]);
                    }}
                    selectedKeys={value}
                    defaultSelectedKeys={new Set(formData.majors)}
                    onBlur={onBlur}
                    isInvalid={!isValid}
                    errorMessage={errors[0]}
                  >
                    {Object.values(Focus)
                      .sort()
                      .map((focus: Focus) => (
                        <SelectItem key={focus}>
                          {uppercaseToCapitalize(focus)}
                        </SelectItem>
                      ))}
                  </Select>
                )}
              </Field>
            </div>

            <Field
              name="about"
              initialValue={formData.about || ""}
              onBlurValidate={z
                .string()
                .min(1, "Enter details about yourself")
                .max(3000, "Enter a shorter profile description")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Textarea
                  label="Tell people a little about yourself and about your interests"
                  value={value}
                  onChange={(e) => {
                    setValue(e.currentTarget.value);
                    saveFieldData("about", e.currentTarget.value);
                  }}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                />
              )}
            </Field>
          </section>
        </main>
      )}

      {step === 1 && (
        <SkillsCreator
          skills={skills}
          setSkills={setSkills}
          placeholder="Add skills to your profile..."
        />
      )}

      {step === 2 && (
        <ProfileSocialMediaEditor
          socialMedias={socialMedias}
          setSocialMedias={setSocialMedias}
        />
      )}
    </>
  );
};

export default ProfileForm;
