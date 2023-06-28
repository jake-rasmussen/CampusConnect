import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import { Textarea } from "../ui/textarea";
import EditController from "./editController";

type PropType = {
  clubDescription: string;
  clubId: string;
};

const DescriptionEditor = (props: PropType) => {
  const { clubDescription: originalClubDescription, clubId } = props;

  const [editClubDescription, setEditClubDescription] = useState(
    originalClubDescription ? originalClubDescription : "",
  );

  const queryClient = api.useContext();

  const updateDescription =
    api.clubProfileRouter.updateClubProfileDescription.useMutation({
      onMutate() {
        if (editClubDescription.trim() === "") {
          toast.error("Please Enter a Description!");
        }
      },
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
      saveAction={() =>
        updateDescription.mutate({
          id: clubId,
          description: editClubDescription,
        })
      }
      closeAction={() => setEditClubDescription(originalClubDescription)}
      dialogDescription={"Update the Club Description"}
    >
      <Textarea
        className="col-span-3"
        placeholder="Type your message here."
        value={editClubDescription}
        onChange={(e) => setEditClubDescription(e.currentTarget.value)}
        rows={15}
      />
    </EditController>
  );
};

export default DescriptionEditor;
