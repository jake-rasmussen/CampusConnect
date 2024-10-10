import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import { Button, Divider, Select, SelectItem, useDisclosure } from "@nextui-org/react";

import { Field, Form } from "houseform";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";
import { Input, Textarea } from "@nextui-org/react";
import { ProfileSocialMedia, SocialMediaPlatformType } from "@prisma/client";
import SkillsCreator from "../dashboard/applications/skillsCreator";
import { SetStateAction, useState } from "react";
import ProfileSocialMediaEditor, { SocialMediaFormType } from "./profileSocialMediaEditor";

type ProfileFormType = {
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

  const router = useRouter();
  const queryClient = api.useContext();

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

  return (
    <>
      <Button onPress={() => {
        onOpen();
        setSkills([]);
        setSocialMedias([]);
      }} color="primary">
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
                });
              }}
            >

              {({ submit }) => (
                <>
                  <ModalHeader>Create Profile</ModalHeader>
                  <ModalBody className="overflow-y-scroll max-h-[70vh] overflow-y-scroll">
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
                            <Input
                              label="School"
                              value={value}
                              isRequired
                              onChange={(e) => setValue(e.currentTarget.value)}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                            />
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

                        <SkillsCreator skills={skills} setSkills={setSkills} placeholder="Add skills to your profile..." />

                        <Divider className="mb-2 " />

                        <ProfileSocialMediaEditor socialMedias={socialMedias} setSocialMedias={setSocialMedias} />

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
        </ModalContent >
      </Modal >
    </>
  );
};

export default CreateProfileEditor;
