import { Input, Textarea } from "@nextui-org/react";
import { Field, Form } from "houseform";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { api } from "~/utils/api";
import EditController from "../editController";

type Props = {
  projectId: string;
};

type ApplicationFormType = {
  name: string;
  description: string;
};

const ApplicationCreator = ({ projectId }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const queryClient = api.useContext();

  const createApplication = api.applicationRouter.createApplication.useMutation(
    {
      onSuccess(application) {
        queryClient.applicationRouter.getProjectApplicationsByProjectIdForAdmin.invalidate(
          { projectId },
        );
        router.push(`/admin/${projectId}/application/${application.id}`);
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    },
  );

  return (
    <Form<ApplicationFormType>
      onSubmit={(values, isValid) => {
        if (isValid) {
          toast.dismiss();
          toast.loading("Entering Application View...");

          const { name, description } = values;
          createApplication.mutate({
            projectId,
            name,
            description,
          });
        }
      }}
    >
      {({ submit }) => (
        <EditController
          dialogDescription="Create a New Application"
          editType="create"
          createDescription="Create New Application"
          handleSubmit={async () => {
            return await submit()
              .then((isValid) => {
                if (isValid) {
                  toast.dismiss();
                  toast.loading("Saving Application...");
                }
                return isValid;
              })
              .catch((e) => {
                console.log(e);
                return false;
              });
          }}
        >
          <Field
            name={"name"}
            onBlurValidate={z
              .string()
              .min(1, "Enter an application name")
              .max(30, "Please enter shorter application name")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <Input
                label="Application Name"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onBlur={onBlur}
                isInvalid={!isValid}
                errorMessage={errors[0]}
                isRequired
              />
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
              <Textarea
                label="Application Description"
                onChange={(e) => setValue(e.currentTarget.value)}
                value={value}
                onBlur={onBlur}
                minRows={4}
                isInvalid={!isValid}
                errorMessage={errors[0]}
                isRequired
              />
            )}
          </Field>
        </EditController>
      )}
    </Form>
  );
};

export default ApplicationCreator;
