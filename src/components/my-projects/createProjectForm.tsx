import { useClerk, useUser } from "@clerk/clerk-react";
import { clerkClient } from "@clerk/nextjs";
import { Field, Form } from "houseform";
import router, { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { Textarea } from "~/components/shadcn_ui/textarea";
import { api } from "~/utils/api";
import Button from "../button";
import ErrorMessage from "../dashboard/errorMessage";
import { Input } from "../shadcn_ui/input";

type ApplicationFormType = {
  name: string;
  description: string;
};

const CreateProjectForm = (props: {
  setOpenDialog: React.Dispatch<boolean>;
}) => {
  const { setOpenDialog } = props;

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
      <Form<ApplicationFormType>
        onSubmit={async (values) => {
          setOpenDialog(false);

          toast.dismiss();
          toast.loading("Creating New Project...");

          await createProject.mutateAsync({
            name: values.name,
            description: values.description,
          });
        }}
      >
        {({ submit, errors }) => (
          <main className="flex w-full flex-col items-center gap-4 py-4">
            <section className="mx-10 flex w-full flex-col gap-4">
              <Field
                name="name"
                onBlurValidate={z.string().min(1, "Enter a project name").max(35, "Project name must be less than 35 characters")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <div>
                    <span className="font-semibold">Project Name</span>
                    <Input
                      className="h-[4rem]"
                      placeholder="Enter Project Name"
                      value={value}
                      onChange={(e) => setValue(e.currentTarget.value)}
                      onBlur={onBlur}
                    />
                    {!isValid && <ErrorMessage message={errors[0]} />}
                  </div>
                )}
              </Field>

              <Field
                name="description"
                onBlurValidate={z
                  .string()
                  .min(1, "Please provide a description")
                  .max(500, "Description must be less than 500 characters")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <div>
                    <span className="font-semibold">Project Description</span>
                    <Textarea
                      className="rounded-xl bg-white p-4"
                      placeholder="Enter a project description"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      onBlur={onBlur}
                      rows={4}
                    />
                    {!isValid && <ErrorMessage message={errors[0]} />}
                  </div>
                )}
              </Field>

              <div className="flex justify-end">
                <Button
                  onClickFn={() => {
                    submit().catch(() => {
                      return;
                    });
                  }}
                  className="my-4"
                >
                  Submit
                </Button>
              </div>
            </section>
          </main>
        )}
      </Form>
    </>
  );
};

export default CreateProjectForm;
