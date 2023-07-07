import { Field, Form } from "houseform";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { api } from "~/utils/api";
import { Textarea } from "../../shadcn_ui/textarea";
import EditController from "../editController";
import ErrorMessage from "../errorMessage";

type EditorFormType = {
  description: string;
};

type PropType = {
  clubDescription: string;
  clubId: string;
};

const DescriptionEditor = (props: PropType) => {
  const { clubDescription, clubId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const updateDescription =
    api.clubProfileRouter.updateClubProfileDescription.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Updated Club Description!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  return (
    <EditController
      dialogDescription={"Update the Club Description"}
      editType="update"
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <Form<EditorFormType>
        onSubmit={(values, isValid) => {
          const { description } = values;
          updateDescription.mutate({
            id: clubId,
            description: description,
          });
          setOpenDialog(false);
        }}
      >
        {({ submit }) => (
          <main className="gap-4">
            <Field
              name="description"
              initialValue={clubDescription}
              onBlurValidate={z.string().min(1, "Enter a description")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <div>
                  <span className="font-semibold">Description</span>
                  <Textarea
                    className="bg-white"
                    placeholder="Type your description here."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    rows={15}
                  />
                  {!isValid && <ErrorMessage message={errors[0]} />}
                </div>
              )}
            </Field>
            <Button
              onClick={() => {
                submit().catch((e) => console.log(e));
              }}
              className="my-4"
            >
              Submit
            </Button>
          </main>
        )}
      </Form>
    </EditController>
  );
};

export default DescriptionEditor;
