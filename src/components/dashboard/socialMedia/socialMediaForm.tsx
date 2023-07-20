import { SocialMediaPlatformType } from "@prisma/client";
import { Field, Form } from "houseform";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { Input } from "~/components/shadcn_ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn_ui/select";
import DeleteController from "../deleteController";
import ErrorMessage from "../errorMessage";

export type SocialMediaFormType = {
  url: string;
  platform: SocialMediaPlatformType;
};

type PropType = {
  url?: string;
  platform?: SocialMediaPlatformType;
  setOpenDialog: React.Dispatch<boolean>;
  onSubmit: (values: SocialMediaFormType) => void;
  handleDelete?: () => void;
};

const SocialMediaForm = (props: PropType) => {
  const { url, platform, setOpenDialog, onSubmit, handleDelete } = props;

  return (
    <Form<SocialMediaFormType>
      onSubmit={(values) => {
        onSubmit(values);
        setOpenDialog(false);
        toast.dismiss();
        toast.success("Success submitting the form!");
      }}
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="url"
            initialValue={url}
            onBlurValidate={z
              .string()
              .min(1, "Enter a URL")
              .url("Enter a valid url")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-4">
                <span className="font-semibold">Social Media URL</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter URL"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
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
              <div className="col-span-4">
                <span className="whitespace-nowrap font-semibold">
                  Platform Type
                </span>
                <Select
                  defaultValue={value ? value : ""}
                  onValueChange={(input) =>
                    setValue(input.toUpperCase() as SocialMediaPlatformType)
                  }
                >
                  <SelectTrigger className="col-span-4 h-[3rem] rounded-xl bg-white">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white" onBlur={onBlur}>
                    <SelectItem value="TWITTER">Twitter</SelectItem>
                    <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                    <SelectItem value="FACEBOOK">Facebook</SelectItem>
                    <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                    <SelectItem value="WEBSITE">Website</SelectItem>
                  </SelectContent>
                </Select>
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <div className="col-span-4 flex flex-row justify-end">
            {handleDelete && (
              <div className="mx-8 flex w-auto grow justify-end">
                <DeleteController
                  dialogDescription="Are you sure you want to delete the Social Media?"
                  handleDelete={handleDelete}
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  submit().catch((e) => console.log(e));
                }}
                className="my-4"
              >
                Submit
              </Button>
            </div>
          </div>
        </main>
      )}
    </Form>
  );
};

export default SocialMediaForm;
