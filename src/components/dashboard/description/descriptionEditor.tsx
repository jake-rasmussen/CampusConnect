import { Textarea } from "@heroui/react";
import { Field, Form } from "houseform";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";
import EditController from "../editController";

type EditorFormType = {
  description: string;
};

type PropType = {
  projectDescription: string;
  projectId: string;
};

const DescriptionEditor = (props: PropType) => {
  const { projectDescription, projectId } = props;

  const queryClient = api.useContext();

  const updateDescription = api.projectRouter.updateProject.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated Description!");
      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const handleSubmit = (values: EditorFormType) => {
    updateDescription.mutate({
      projectId: projectId,
      description: values.description,
    });
  };

  return (
    <Form<EditorFormType>
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ submit }) => (
        <EditController
          dialogDescription={"Update the Description"}
          editType="update"
          handleSubmit={async () => {
            return await submit()
              .then((isValid) => {
                if (isValid) {
                  toast.dismiss();
                  toast.loading("Saving Description...");
                }
                return isValid;
              })
              .catch((e) => {
                return false;
              });
          }}
        >
          <main className="gap-4">
            <Field
              name="description"
              initialValue={projectDescription}
              onBlurValidate={z
                .string()
                .min(1, "Enter a description")
                .max(500, "Description must be less than 500 characters")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Textarea
                  label="Description"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                  minRows={15}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                />
              )}
            </Field>
          </main>
        </EditController>
      )}
    </Form>
  );
};

export default DescriptionEditor;
