import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import SocialMediaForm from "./socialMediaForm";

import type { SocialMediaFormType } from "./socialMediaForm";

type PropType = {
  projectId: string;
};

const SocialMediasEditor = (props: PropType) => {
  const { projectId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const createSocialMedia = api.socialMediaRouter.createSocialMedia.useMutation(
    {
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Created the Social Media!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    },
  );

  const handleSubmit = (values: SocialMediaFormType) => {
    createSocialMedia.mutate({
      projectId,
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
