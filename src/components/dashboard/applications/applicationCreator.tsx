import { Field, Form } from "houseform";
import router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { Input } from "~/components/shadcn_ui/input";
import { Textarea } from "~/components/shadcn_ui/textarea";
import { api } from "~/utils/api";
import EditController from "../editController";
import ErrorMessage from "../errorMessage";

import type { FieldInstance } from "houseform";

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
        queryClient.applicationRouter.getProjectApplicationsByProjectIdForAdmin.invalidate({ projectId });
        router.push(`/admin/${projectId}/application/${application.id}`);
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    },
  );

  return (
    <EditController
      dialogDescription={"Create a new application"}
      editType={"create"}
      createDescription={"Create new application"}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
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
          <>
            <Field
              name={"name"}
              onBlurValidate={z.string().min(1, "Please provide a name")}
            >
              {(field: FieldInstance) => (
                <div>
                  <span className="font-semibold">Application Name</span>
                  <Input
                    className="h-[3rem] rounded-xl bg-white"
                    placeholder={"Enter an application name"}
                    onChange={(e) => field.setValue(e.target.value)}
                    value={field.value as string}
                    onBlur={field.onBlur}
                  />
                  {!field.isValid && <ErrorMessage message={field.errors[0]} />}
                </div>
              )}
            </Field>

            <Field
              name={"description"}
              onBlurValidate={z.string().min(1, "Please provide a description")}
            >
              {(field: FieldInstance) => (
                <div>
                  <span className="font-semibold">Application Description</span>
                  <Textarea
                    className="h-[3rem] rounded-xl bg-white"
                    placeholder={"Enter an application description"}
                    onChange={(e) => field.setValue(e.target.value)}
                    value={field.value as string}
                    onBlur={field.onBlur}
                    rows={4}
                  />
                  {!field.isValid && <ErrorMessage message={field.errors[0]} />}
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
          </>
        )}
      </Form>
    </EditController>
  );
};

export default ApplicationCreator;
