import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button, Input, Textarea, useDisclosure } from "@heroui/react";
import { Field, Form } from "houseform";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";

type ApplicationFormType = {
  name: string;
  description: string;
};

const CreateProjectEditor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  // const createProject = api.projectRouter.createProject.useMutation({
  //   onSuccess() {
  //     toast.dismiss();
  //     toast.success("Successfully Created Startup!");

  //     setTimeout(() => {
  //       router.reload();
  //     }, 1000);
  //   },
  //   onError() {
  //     toast.dismiss();
  //     toast.error("Error...");
  //   },
  // });

  const createProjectCreationForm =
    api.projectRouter.createProjectCreationForm.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Submitted Form!");
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create a startup!
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form<ApplicationFormType>
              onSubmit={async (values) => {
                onClose();

                toast.dismiss();
                toast.loading("Creating Form...");

                await createProjectCreationForm.mutateAsync({
                  name: values.name,
                  validation: values.description,
                });
              }}
            >
              {({ submit }) => (
                <>
                  <ModalHeader>Create Startup</ModalHeader>
                  <ModalBody className="max-h-[70vh] overflow-y-scroll overflow-y-scroll">
                    <main className="flex w-full flex-col items-center gap-4">
                      <p>
                        Please submit some information about your startup. It
                        should take 1-2 business days to be approved, and you
                        will receive an email once it is verified!
                      </p>

                      <section className="mx-10 flex w-full flex-col gap-4">
                        <Field
                          name="name"
                          onBlurValidate={z
                            .string()
                            .min(1, "Enter a startup name")
                            .max(
                              35,
                              "Startup name must be less than 35 characters",
                            )}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Input
                              label="Name"
                              value={value}
                              onChange={(e) => setValue(e.currentTarget.value)}
                              onBlur={onBlur}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                            />
                          )}
                        </Field>

                        <Field
                          name="description"
                          onBlurValidate={z
                            .string()
                            .min(1, "Enter a description")
                            .max(
                              1000,
                              "Description must be less than 1000 characters",
                            )}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Textarea
                              label="Description"
                              onChange={(e) => setValue(e.target.value)}
                              value={value}
                              onBlur={onBlur}
                              rows={4}
                              isInvalid={!isValid}
                              errorMessage={errors[0]}
                            />
                          )}
                        </Field>
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

export default CreateProjectEditor;
