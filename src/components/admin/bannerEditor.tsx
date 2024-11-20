import {
  Button,
  Divider,
  Input,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import LoadingSection from "../loadingSection";

type PropType = {
  projectId: string;
};

const BannerEditor = (props: PropType) => {
  const { projectId } = props;

  const [fileSrc, setFileSrc] = useState<string>();
  const [file, setFile] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createSignedUrlUpload =
    api.supabaseRouter.createSignedUrlUploadBanner.useMutation({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      if (files[0]) {
        setFile(files[0]);
        setFileSrc(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const url = await createSignedUrlUpload.mutateAsync({
        projectId,
      });

      try {
        await fetch(url as string, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file.slice(),
        }).finally(() => {
          toast.success("Successfully uploaded file!");
        });
      } catch (e) {
        toast.dismiss();
        toast.error("Error...");
        return;
      }
    } else {
      toast.error("Enter a file");
    }
  };

  return (
    <section className="h-full w-full">
      <ModalHeader>Change Startup Banner</ModalHeader>
      <Divider className="w-full" />
      {
        <>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-2">
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden" // Hide the default file input
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                id="fileInput"
              />

              {file ? (
                <Button color="danger" onPress={() => {
                  setFile(undefined);
                  setFileSrc(undefined);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}>
                  Clear File
                </Button>
              ) : (
                <Button as="label" htmlFor="fileInput" color="primary">
                  Choose File
                </Button>
              )}

              <span className="text-gray-500">
                {file?.name || "No file chosen"}
              </span>
            </div>
          </div>

          {fileSrc && (
            <section className="relative h-full w-full">
              <Divider />

              <div className="m-4 flex flex-col gap-4">
                <span>Preview Banner</span>
                <div className="relative h-[20rem] w-full">
                  <Image
                    src={fileSrc}
                    alt="Image Preview"
                    fill // Ensures the image fills the container
                    className="rounded-md object-cover" // Tailwind utility for object-fit cover
                  />
                  <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white">
                    Startup Title
                  </h1>
                </div>
              </div>
            </section>
          )}

          <ModalFooter className="absolute bottom-0 right-0 m-4">
            <Button
              color="primary"
              onPress={() => {
                toast.dismiss();
                toast.loading("Saving Banner...");

                handleFileUpload();
              }}
            >
              Save
            </Button>
          </ModalFooter></>
      }
    </section>
  );
};

export default BannerEditor;
