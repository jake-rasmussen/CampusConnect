import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button, useDisclosure } from "@heroui/react";
import { Focus, ProfileSocialMedia, School } from "@prisma/client";
import { motion } from "framer-motion";
import { Form } from "houseform";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit } from "tabler-icons-react";

import { api } from "~/utils/api";
import ProfileForm from "./profileForm";
import { SocialMediaFormType } from "./profileSocialMediaEditor";

export type ProfileFormType = {
  majors: Focus[];
  minors?: Focus[];
  about: string;
  school: string;
  year: string;
  skills: string[];
  socialMedia: ProfileSocialMedia[];
};

type PropType = {
  editType: "update" | "create";
  initialValues?: Partial<ProfileFormType>; // Optional initial values for editing
};

const ProfileEditor = ({ editType, initialValues = {} }: PropType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [skills, setSkills] = useState<string[]>(initialValues.skills || []);
  const [socialMedias, setSocialMedias] = useState<SocialMediaFormType[]>(
    initialValues.socialMedia || [],
  );
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ProfileFormType>>({
    majors: initialValues.majors || [],
    minors: initialValues.minors || [],
    about: initialValues.about || "",
    school: initialValues.school || School.JOHNS_HOPKINS_UNIVERSITY,
    year: initialValues.year || "",
  });

  const router = useRouter();
  const queryClient = api.useContext();

  useEffect(() => {
    if (initialValues) {
      setSkills(initialValues.skills || []);
      setSocialMedias(initialValues.socialMedia || []);
      setFormData({
        majors: initialValues.majors || [],
        minors: initialValues.minors || [],
        about: initialValues.about || "",
        school: initialValues.school || School.JOHNS_HOPKINS_UNIVERSITY,
        year: initialValues.year || "",
      });
    }
  }, []);

  const createProfile = api.profileRouter.createProfile.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Created Profile!");
      setTimeout(() => router.reload(), 1000);
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const updateProfile = api.profileRouter.updateProfile.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated Profile!");
      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <>
      {editType === "create" ? (
        <Button
          onPress={() => {
            setStep(0);
            onOpen();
          }}
          color="primary"
        >
          Create Profile
        </Button>
      ) : (
        <button
          onClick={() => {
            setStep(0);
            onOpen();
          }}
        >
          <Edit className="h-20 w-20 text-primary transition duration-300 ease-in-out hover:text-secondary" />
        </button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <Form<ProfileFormType>
              onSubmit={async () => {
                onClose();
                toast.dismiss();

                if (editType === "create") {
                  toast.loading("Creating New Profile...");
                  await createProfile.mutateAsync({
                    skills,
                    socialMedias,
                    school: formData.school!,
                    year: formData.year!,
                    about: formData.about!,
                    majors: formData.majors!,
                    minors: formData.minors || [],
                  });
                } else {
                  toast.loading("Updating Profile...");
                  await updateProfile.mutateAsync({
                    skills,
                    socialMedias,
                    school: formData.school!,
                    year: formData.year!,
                    about: formData.about!,
                    majors: formData.majors!,
                    minors: formData.minors || [],
                  });
                }
              }}
            >
              {({ submit }) => (
                <>
                  <ModalHeader>
                    {editType === "create" ? "Create Profile" : "Edit Profile"}
                  </ModalHeader>
                  <ModalBody className="max-h-[70vh] overflow-visible overflow-y-scroll overflow-visible">
                    <motion.div
                      key={step}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <ProfileForm
                        step={step}
                        formData={formData}
                        setFormData={setFormData}
                        skills={skills}
                        setSkills={setSkills}
                        socialMedias={socialMedias}
                        setSocialMedias={setSocialMedias}
                      />
                    </motion.div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={step === 0 ? onClose : prevStep}
                    >
                      {step === 0 ? "Close" : "Back"}
                    </Button>
                    {step < 2 && (
                      <Button
                        color="primary"
                        onClick={nextStep}
                        isDisabled={
                          step === 0 &&
                          (!formData.about ||
                            !formData.majors?.length ||
                            !formData.year)
                        }
                      >
                        Next
                      </Button>
                    )}
                    {step === 2 && (
                      <Button onClick={submit} color="primary">
                        Submit
                      </Button>
                    )}
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

export default ProfileEditor;
