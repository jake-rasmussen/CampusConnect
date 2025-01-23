import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Focus, ProfileSocialMedia, School } from "@prisma/client";
import { Field, Form } from "houseform";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";
import { uppercaseToCapitalize } from "~/utils/helpers";
import SkillsCreator from "../dashboard/applications/skillsCreator";
import ProfileSocialMediaEditor, {
  SocialMediaFormType,
} from "./profileSocialMediaEditor";

type ProfileFormType = {
  majors: Focus;
  minors?: Focus;
  about: string;
  school: string;
  year: string;
  skills: string[];
  socialMedia: ProfileSocialMedia[];
};

const CreateProfileEditor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [skills, setSkills] = useState<string[]>([]);
  const [socialMedias, setSocialMedias] = useState<SocialMediaFormType[]>([]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const createProfile = api.profileRouter.createProfile.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Created Profile!");

      setTimeout(() => {
        router.reload();
      }, 1000);
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const handleSelectItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems((prev) => [...prev, item]);
    }
    setInputValue(""); // Clear input after selection
  };

  // Handle item removal
  const handleRemoveItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((selected) => selected !== item));
  };

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          setSkills([]);
          setSocialMedias([]);
        }}
        color="primary"
      >
        Create Profile
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <Form<ProfileFormType>
              onSubmit={async (values) => {
                onClose();

                toast.dismiss();
                toast.loading("Creating New Profile...");

                await createProfile.mutateAsync({
                  skills,
                  socialMedias,
                  school: values.school,
                  year: values.year,
                  about: values.about,
                  majors: values.majors,
                  minors: values.minors,
                });
              }}
            >
              {({ submit }) => (
                <>
                  <ModalHeader>Create Profile</ModalHeader>
                  <ModalBody className="max-h-[70vh] overflow-y-scroll overflow-y-scroll">
                    <main className="flex w-full flex-col items-center gap-4">
                      <section className="flex w-full flex-col gap-4">
                        <Field
                          name="school"
                          onBlurValidate={z
                            .string()
                            .min(1, "Enter your school")
                            .max(250, "Enter a shorter school name")}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Autocomplete
                              label="School"
                              selectedKey={value || ""}
                              onSelectionChange={(e) => {
                                if (e) {
                                  setValue(e as School);
                                } else {
                                  setValue("");
                                }
                              }}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                              isRequired
                            >
                              {Object.values(School).map((school: School) => (
                                <AutocompleteItem
                                  key={school}
                                >
                                  {uppercaseToCapitalize(school)}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          )}
                        </Field>

                        <Field
                          name="year"
                          onChangeValidate={z
                            .string()
                            .min(1, "Enter your year")}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Select
                              label="Year"
                              // selectedKeys={getInPersonKey(value)}
                              onChange={(e) => setValue(e.target.value)}
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
                              <SelectItem key="PHD">PHD</SelectItem>
                            </Select>
                          )}
                        </Field>

                        <div className="flex flex-row gap-4">
                          <Field
                            name="majors"
                            onChangeValidate={z
                              .string()
                              .min(1, "Select your major(s)")}
                          >
                            {({ value, setValue, onBlur, isValid, errors }) => (
                              <Select
                                label="Major(s)"
                                selectionMode="multiple"
                                onChange={(e) => setValue(e.target.value)}
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
                            onChangeValidate={z
                              .string()
                              .min(1, "Select your minor(s)")}
                          >
                            {({ value, setValue, onBlur, isValid, errors }) => (
                              <Select
                                label="Minor(s)"
                                selectionMode="multiple"
                                onChange={(e) => setValue(e.target.value)}
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
                          onBlurValidate={z
                            .string()
                            .min(1, "Enter details about yourself")
                            .max(3000, "Enter a shorter profile description")}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Textarea
                              label="Tell people a little about yourself and about your interests"
                              value={value}
                              onChange={(e) => setValue(e.currentTarget.value)}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                            />
                          )}
                        </Field>

                        <Divider className="my-2 " />

                        <SkillsCreator
                          skills={skills}
                          setSkills={setSkills}
                          placeholder="Add skills to your profile..."
                        />

                        <Divider className="mb-2 " />

                        <ProfileSocialMediaEditor
                          socialMedias={socialMedias}
                          setSocialMedias={setSocialMedias}
                        />
                      </section>
                    </main>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        submit().catch(() => {
                          return;
                        });
                      }}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProfileEditor;
