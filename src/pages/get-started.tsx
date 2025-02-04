import { useUser } from "@clerk/nextjs";
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
import { api } from "~/utils/api";

const GetStarted = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const queryClient = api.useContext();

  const [selected, setSelected] = useState("");
  const [step, setStep] = useState(0);

  const updateUser = api.usersRouter.updateUser.useMutation({
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Welcome to Campus Connect!");

      await user?.reload();

      queryClient.invalidate();
      router.reload();
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
        <Modal isOpen={true} hideCloseButton size="xl">
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Welcome to Campus Connect!
                </ModalHeader>
                <ModalBody>
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
                          We're thrilled to have you here! Campus Connect is a
                          platform designed to connect ambitious student
                          founders with talented students eager to get involved
                          in exciting projects.
                        </p>
                        <p>
                          To help us get started, we’d like to know: are you
                          looking to hire for your project, or are you seeking
                          an opportunity to work on one?
                        </p>
                        <i>
                          Don’t worry—you can update this preference at any time
                          to reflect your goals.
                        </i>

                        <div className="flex flex-col gap-3 py-4 text-left">
                          <RadioGroup
                            label="Select your intent"
                            value={selected}
                            onValueChange={setSelected}
                          >
                            <Radio value="hire">
                              I'm looking to hire for my startup
                            </Radio>
                            <Radio value="work">
                              I'm looking to join another startup
                            </Radio>
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {step === 1 &&
                      (selected === "hire" ? (
                        <div className="flex flex-col gap-3">
                          <p>
                            Fantastic! Thank you for choosing Campus Connect to
                            help you grow your startup.
                          </p>
                          <div className="py-4">
                            <p>
                              With our platform, you can create a professional
                              homepage for your startup, making it easy to gain
                              visibility and attract top talent. Use our
                              application management tools to find exceptional
                              team members who can take your startup to the next
                              level.
                            </p>

                            <Divider className="my-6" />

                            <div className="flex flex-col items-center justify-center text-center font-bold">
                              <p>
                                What are you waiting for? Let Campus Connect
                                help you build your dream team!
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p>
                            Amazing! Thank you for choosing Campus Connect to
                            help you discover your next great opportunity.
                          </p>
                          <div className="py-4">
                            <p>
                              Browse a wide variety of startups hiring for
                              exciting roles. Explore the "Open Applications"
                              section to find opportunities that match your
                              skills and interests. Set up your profile to
                              showcase your talents and let startups find you!
                            </p>

                            <Divider className="my-6" />

                            <div className="flex flex-col items-center justify-center text-center font-bold">
                              <p>
                                Start your journey with Campus Connect today and
                                find the perfect opportunity to grow and
                                succeed!
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
                        toast.loading("Getting you set up...");

                        const userType =
                          selected === "hire"
                            ? UserType.EMPLOYER
                            : UserType.EMPLOYEE;

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
