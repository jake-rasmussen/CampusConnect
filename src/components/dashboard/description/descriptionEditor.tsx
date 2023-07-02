import { Field, Form } from "houseform";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { api } from "~/utils/api";
import { Textarea } from "../../shadcn_ui/textarea";
import EditController from "../editController";

type PropType = {
  clubDescription: string;
  clubId: string;
};

const DescriptionEditor = (props: PropType) => {
  const { clubDescription, clubId } = props;

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
    >
      <Form
        onSubmit={(values, errors) => {
          if (errors.errors.length > 0) {
            toast.dismiss();
            errors.errors.map((error) => {
              toast.error(error);
            });
          } else {
            updateDescription.mutate({
              id: clubId,
              description: values.description,
            });
          }
        }}
        submitWhenInvalid
      >
        {({ submit }) => (
          <main className="gap-4">
            <Field
              name="description"
              initialValue={clubDescription}
              onSubmitValidate={z
                .string()
                .min(
                  50,
                  "Please enter a description longer than 50 characters",
                )}
            >
              {({ value, setValue, onBlur }) => (
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
                </div>
              )}
            </Field>
            <Button onClick={submit} className="my-4">
              Submit
            </Button>
          </main>
        )}
      </Form>
    </EditController>
  );
};

export default DescriptionEditor;
