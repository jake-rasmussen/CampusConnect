import { Button, Input, Select, SelectItem } from "@heroui/react";
import { SocialMediaPlatformType } from "@prisma/client";
import { Field, Form } from "houseform";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  SquarePlus,
  Trash,
  WorldWww,
} from "tabler-icons-react";
import { z } from "zod";

import { api } from "~/utils/api";
import EditController from "../dashboard/editController";

export type SocialMediaFormType = {
  url: string;
  platform: SocialMediaPlatformType;
};

type PropType = {
  url?: string;
  platform?: SocialMediaPlatformType;
  socialMediaId?: string;
  socialMedias: SocialMediaFormType[];
  setSocialMedias: Dispatch<SetStateAction<SocialMediaFormType[]>>;
};

const ProfileSocialMediaEditor = (props: PropType) => {
  const { url, platform, socialMediaId, socialMedias, setSocialMedias } = props;

  const handleSubmit = (socialMedia: SocialMediaFormType) => {
    setSocialMedias([...socialMedias, socialMedia]);
  };

  const handleDelete = (targetSocialMedia: SocialMediaFormType) => {
    let socialMediaIndex = -1;
    socialMedias.forEach((socialMedia, index) => {
      if (
        targetSocialMedia.platform === socialMedia.platform &&
        targetSocialMedia.url === socialMedia.url
      )
        socialMediaIndex = index;
    });
    const newSocialMedias: SocialMediaFormType[] = socialMedias;
    newSocialMedias.splice(socialMediaIndex, 1);
    setSocialMedias([...newSocialMedias]);
  };

  return (
    <Form<SocialMediaFormType>
      onSubmit={(values, { reset }) => {
        if (values.url && values.platform) {
          handleSubmit(values);
          reset();
        }
      }}
    >
      {({ submit }) => (
        <div>
          <div className="text-center">
            <h3 className="tracking-none text-xl font-black uppercase">
              Add Social Media
            </h3>
            <p className="py-2">
              Link your socials so people can reach out to you
            </p>
          </div>

          <div className="flex flex-row">
            <div className="flex grow flex-col gap-4 py-4">
              <Field
                name="url"
                onSubmitValidate={z
                  .string()
                  .min(1, "Enter a URL")
                  .url("Enter a valid url")}
              >
                {({ value, setValue, onBlur, isValid, errors }) => (
                  <Input
                    label="Enter URL"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onBlur={onBlur}
                    isInvalid={!isValid}
                    errorMessage={errors[0]}
                  />
                )}
              </Field>

              <Field
                name="platform"
                // initialValue={platform}
                onSubmitValidate={z.enum(
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
                    onChange={(e) =>
                      setValue(e.target.value as SocialMediaPlatformType)
                    }
                    onBlur={onBlur}
                    isInvalid={!isValid}
                    errorMessage={errors[0]}
                  >
                    <SelectItem key="TWITTER">Twitter</SelectItem>
                    <SelectItem key="INSTAGRAM">Instagram</SelectItem>
                    <SelectItem key="FACEBOOK">Facebook</SelectItem>
                    <SelectItem key="LINKEDIN">LinkedIn</SelectItem>
                    <SelectItem key="WEBSITE">Website</SelectItem>
                  </Select>
                )}
              </Field>
            </div>

            <button
              className="group flex h-40 h-full w-40 shrink flex-row items-center"
              onClick={() =>
                submit().catch(() => {
                  return;
                })
              }
            >
              <SquarePlus className="m-10 h-full w-full text-primary duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
            </button>
          </div>

          <div>
            {socialMedias.map((socialMedia: SocialMediaFormType, index) => (
              <div
                className="my-2 flex flex-row items-center gap-2"
                key={`socialMedia${index}${url}`}
              >
                {socialMedia.platform === SocialMediaPlatformType.FACEBOOK ? (
                  <BrandFacebook className="h-10 w-10" />
                ) : socialMedia.platform ===
                  SocialMediaPlatformType.INSTAGRAM ? (
                  <BrandInstagram className="h-10 w-10" />
                ) : socialMedia.platform ===
                  SocialMediaPlatformType.LINKEDIN ? (
                  <BrandLinkedin className="h-10 w-10" />
                ) : socialMedia.platform === SocialMediaPlatformType.TWITTER ? (
                  <BrandTwitter className="h-10 w-10" />
                ) : (
                  <WorldWww className="h-10 w-10" />
                )}
                <Link
                  className="text-neutral-500 underline"
                  href={socialMedia.url}
                  target="_blank"
                >
                  {socialMedia.url}
                </Link>

                <div className="flex grow items-end justify-end">
                  <Button
                    onPress={() => {
                      handleDelete(socialMedia);
                    }}
                    variant="light"
                    isIconOnly
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Form>
  );
};

export default ProfileSocialMediaEditor;
