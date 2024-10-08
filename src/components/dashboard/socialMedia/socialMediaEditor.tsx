import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";

import { SocialMediaPlatformType } from "@prisma/client";
import { Field, Form } from "houseform";
import { z } from "zod";
import { Input, Select, SelectItem } from "@nextui-org/react";

type SocialMediaFormType = {
  url: string;
  platform: SocialMediaPlatformType;
};

type PropType = {
  projectId: string;
  url?: string;
  platform?: SocialMediaPlatformType;
  socialMediaId?: string;
};

const SocialMediaEditor = (props: PropType) => {
  const { projectId, url, platform, socialMediaId } = props;

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
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleSubmit = (values: SocialMediaFormType) => {
    if (socialMediaId) {
      updateSocialMedia.mutate({
        id: socialMediaId,
        url: values.url,
        platform: values.platform,
        projectId,
      });
    } else {
      createSocialMedia.mutate({
        projectId,
        url: values.url,
        platform: values.platform,
      });
    }
  };

  const handleDelete = () => {
    if (socialMediaId) {
      deleteSocialMedia.mutate({
        id: socialMediaId,
        projectId,
      });
    }
  };

  return (
    <Form<SocialMediaFormType>
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ submit }) => (
        <EditController
          dialogDescription="Create Social Media"
          createDescription="Create New Social Media"
          editType={socialMediaId ? "update" : "create"}
          handleSubmit={async () => {
            return await submit().then((isValid) => {
              if (isValid) {
                toast.dismiss();
                toast.loading("Saving Social Media...");
              }
              return isValid;
            }).catch((e) => {
              console.log(e);
              return false;
            });
          }}
          handleDelete={socialMediaId ? handleDelete : undefined}
        >
          <main className="grid grid-cols-4 gap-4">
            <Field
              name="url"
              initialValue={url}
              onBlurValidate={z
                .string()
                .min(1, "Enter a URL")
                .url("Enter a valid url")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                 className="col-span-4"
                  placeholder="Enter URL"
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
              name="platform"
              initialValue={platform}
              onChangeValidate={z.enum(
                [
                  SocialMediaPlatformType.TWITTER,
                  SocialMediaPlatformType.INSTAGRAM,
                  SocialMediaPlatformType.FACEBOOK,
                  SocialMediaPlatformType.LINKEDIN,
                  SocialMediaPlatformType.WEBSITE,
                ],
                {
                  errorMap: () => {
                    return { message: "Select Platform" };
                  },
                },
              )}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Select
                  label="Platform"
                  className="col-span-4"
                  selectedKeys={[value]}
                  onChange={(e) => setValue(e.target.value as SocialMediaPlatformType)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                >
                  <SelectItem key="TWITTER">Twitter</SelectItem>
                  <SelectItem key="INSTAGRAM">Instagram</SelectItem>
                  <SelectItem key="FACEBOOK">Facebook</SelectItem>
                  <SelectItem key="LINKEDIN">LinkedIn</SelectItem>
                  <SelectItem key="WEBSITE">Website</SelectItem>
                </Select>
              )}
            </Field>
          </main>
        </EditController>
      )}
    </Form>
  );
};

export default SocialMediaEditor;
