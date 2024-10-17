import { clerkClient, useUser } from "@clerk/nextjs";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { UserType } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { createTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";

const GetStarted = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const queryClient = api.useContext();

  const [selected, setSelected] = useState("");
  const [step, setStep] = useState(0);

  const updateUser = api.usersRouter.updateUser.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Welcome to Campus Connect!");
      queryClient.invalidate().catch((e) => console.log(e));

      setTimeout(() => {
        router.push("/project");
      }, 1000);
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const variants = {
    enter: (direction: number) => ({
      // x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      // x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      // x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  useEffect(() => {}, [selected]);

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-neutral-950">
        <BackgroundBeams />
        <Modal isOpen={true} hideCloseButton size="2xl">
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Welcome to Campus Connect!
                </ModalHeader>
                <ModalBody className="min-h-[30vh]">
                  <motion.div
                    key={step}
                    style={{ willChange: "transform, opacity" }}
                    custom={step}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="w-full"
                  >
                    {step === 0 && (
                      <div className="flex flex-col gap-3">
                        <p>
                          Thank you so much for joining Campus Connect! To
                          start, are you looking to hire or looking for work?
                        </p>
                        <p>
                          You will be able to change this information down the
                          road if you'd like to change your profile.
                        </p>

                        <div className="flex flex-col gap-3 py-4 text-left">
                          <RadioGroup
                            label="Select your intent"
                            value={selected}
                            onValueChange={setSelected}
                          >
                            <Radio value="hire">
                              I'm looking to hire for my project
                            </Radio>
                            <Radio value="work">
                              I'm looking to join another project
                            </Radio>
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {step === 1 &&
                      (selected === "hire" ? (
                        <div className="flex flex-col gap-3">
                          <p>
                            Great! Thank you so much for choosing Campus Connect
                            for helping you look for your next great experience
                          </p>
                          <div className="py-4">
                            <p>
                              With our platform, get started with viewing a
                              bunch of projects to see if there are any that
                              interest you. You can allProjects go to the
                              open-application section to see if there are any
                              applications related to your skillset. Moreover,
                              set up a profile to help projects discover you!
                            </p>

                            <Divider className="my-6" />

                            <div className="flex flex-col items-center justify-center text-center">
                              <p>
                                What are you waiting for! Let Campus Connect
                                help you get connected!
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p>
                            Great! Thank you so much for choosing Campus Connect
                            for helping you bring your startup to the next
                            level.
                          </p>
                          <div className="py-4">
                            <p>
                              With our platform, get started with our no-code
                              solution to create project homepages to gain
                              visibility for your startup. Additionally, use our
                              application management system to help get grow
                              your startup with fantastic personel.
                            </p>

                            <Divider className="my-6" />

                            <div className="flex flex-col items-center justify-center text-center font-bold">
                              <p>
                                What are you waiting for! Let Campus Connect
                                help you grow your startup!
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={prevStep}
                    isDisabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button
                    color="primary"
                    onClick={nextStep}
                    isDisabled={step === 1 || selected.length === 0}
                    className={step === 1 ? "hidden" : ""}
                  >
                    Next
                  </Button>
                  <Button
                    color="primary"
                    className={step !== 1 ? "hidden" : ""}
                    onPress={() => {
                      if (user) {
                        const userType =
                          selected === "hire"
                            ? UserType.EMPLOYER
                            : UserType.EMPLOYEE;

                        console.log({
                          externalId: user.id || "",
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          emailAddress:
                            user.emailAddresses[0]?.toString() || "",
                          userType,
                        });

                        updateUser.mutate({
                          externalId: user.id || "",
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          emailAddress:
                            user.emailAddresses[0]?.toString() || "",
                          userType,
                        });
                      }
                    }}
                  >
                    Finish
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

GetStarted.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout className="min-h-screen">{page}</UserLayout>;
};

export default GetStarted;
