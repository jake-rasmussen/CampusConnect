import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import SocialMediaForm, { type SocialMediaFormType } from "./socialMediaForm";

type PropType = {
  clubId: string;
};

const SocialMediasEditor = (props: PropType) => {
  const { clubId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const createSocialMedia =
    api.clubSocialMediaRouter.createClubSocialMedia.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Created the Club Contact Info!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleSubmit = (values: SocialMediaFormType) => {
    createSocialMedia.mutate({
      clubId,
      url: values.url,
      platform: values.platform,
    });
  };

  return (
    <EditController
      dialogDescription="Create Social Media"
      createDescription="Create New Social Media"
      editType="create"
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <SocialMediaForm onSubmit={handleSubmit} setOpenDialog={setOpenDialog} />
    </EditController>
  );
};

export default SocialMediasEditor;
