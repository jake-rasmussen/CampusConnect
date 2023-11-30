import { type SocialMediaPlatformType } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import SocialMediaForm from "./socialMediaForm";

import type { SocialMediaFormType } from "./socialMediaForm";

type PropType = {
  url: string;
  platform: SocialMediaPlatformType;
  socialMediaId: string;
  projectId: string
};

const SocialMediaCardEditor = (props: PropType) => {
  const { url, platform, socialMediaId, projectId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const updateSocialMedia =
    api.socialMediaRouter.updateSocialMediaById.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Updated Social Media!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const deleteSocialMedia =
    api.socialMediaRouter.deleteSocialMediaById.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Deleted Social Media!");
        queryClient.invalidate().catch((e) => console.log(e));
        setOpenDialog(false);
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleUpdate = (values: SocialMediaFormType) => {
    updateSocialMedia.mutate({
      id: socialMediaId,
      url: values.url,
      platform: values.platform,
      projectId,
    });
  };

  const handleDelete = () => {
    deleteSocialMedia.mutate({
      id: socialMediaId,
      projectId
    });
  };

  return (
    <EditController
      dialogDescription={"Update the Contact Info"}
      editType="update"
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      className="rounded-xl"
    >
      <SocialMediaForm
        url={url}
        platform={platform}
        setOpenDialog={setOpenDialog}
        onSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default SocialMediaCardEditor;
