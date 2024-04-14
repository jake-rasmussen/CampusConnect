import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { api } from "~/utils/api";
import LoadingSection from "./loadingSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./shadcn_ui/dialog";

type PropType = {
  projectId: string;
  applicationId: string;
  userId?: string;
  filename: string;
};

const FilePreview = (props: PropType) => {
  const { projectId, applicationId, userId, filename } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>();

  const getPresignedUrlGet =
    api.supabaseRouter.createSignedUrlDownload.useMutation();

  useEffect(() => {
    console.log(projectId, applicationId, filename)
    if (applicationId && filename) {
      const fetchFile = async () => {
        const url = await getPresignedUrlGet.mutateAsync({
          applicationId,
          userId,
          filename,
        });
        setUrl(url);
      };

      fetchFile();
    }
  }, [projectId, applicationId, filename]);

  return (
    <>
      <Dialog>
        <DialogTrigger className="block w-full cursor-pointer items-center rounded-lg rounded-xl border bg-white p-3 text-left">
          <span className="mr-2 rounded-full border-none bg-secondary px-4 py-2 font-black uppercase text-white shadow-xl">
            View File
          </span>
          {filename ? filename : "No file chosen..."}
        </DialogTrigger>
        <DialogContent className="max-h-[75vh] max-w-4xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Preview {filename}</DialogTitle>
          </DialogHeader>
          {isLoading ? <LoadingSection /> : <></>}

          <section
            className={twMerge(
              "flex overflow-y-scroll rounded-xl border border-dashed p-2",
              isLoading ? "hidden" : "",
            )}
          >
            {filename.slice(-4).toLowerCase() === ".pdf" ? (
              <iframe
                src={url || ""}
                onLoad={() => setIsLoading(false)}
                className="min-h-[75vh] w-full"
              />
            ) : (
              <img
                src={url || ""}
                onLoad={() => setIsLoading(false)}
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full"
                alt={filename}
              />
            )}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilePreview;
