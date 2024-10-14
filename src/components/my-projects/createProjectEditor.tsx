import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import { Button, useDisclosure } from "@nextui-org/react";

import { Field, Form } from "houseform";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";
import { Input, Textarea } from "@nextui-org/react";

type ApplicationFormType = {
  name: string;
  description: string;
};


const CreateProjectEditor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const createProject = api.projectRouter.createProject.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Created Project!");

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
      <Button onPress={onOpen} color="primary">
        Create your own project!
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form<ApplicationFormType>
              onSubmit={async (values) => {
                onClose();

                toast.dismiss();
                toast.loading("Creating New Project...");

                await createProject.mutateAsync({
                  name: values.name,
                  description: values.description,
                });
              }}
            >

              {({ submit }) => (
                <>
                  <ModalHeader>Create Project</ModalHeader>
                  <ModalBody className="overflow-y-scroll max-h-[70vh] overflow-y-scroll">
                    <main className="flex w-full flex-col items-center gap-4">
                      <section className="mx-10 flex w-full flex-col gap-4">
                        <Field
                          name="name"
                          onBlurValidate={z
                            .string()
                            .min(1, "Enter a project name")
                            .max(35, "Project name must be less than 35 characters")}
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
                            .max(500, "Description must be less than 500 characters")}
                        >
                          {({ value, setValue, onBlur, isValid, errors }) => (
                            <Textarea
                              className="rounded-xl bg-white"
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
        </ModalContent >
      </Modal >
    </>
  );
};

export default CreateProjectEditor;
