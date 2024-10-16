import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { api } from "~/utils/api";
import LoadingSection from "./loadingSection";

type PropType = {
  projectId: string;
  applicationId: string;
  userId?: string;
  filename: string;
};

const FilePreview = (props: PropType) => {
  const { projectId, applicationId, userId, filename } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>();

  const getPresignedUrlGet =
    api.supabaseRouter.createSignedUrlDownload.useMutation();

  useEffect(() => {
    if (applicationId && filename) {
      const fetchFile = async () => {
        const url = await getPresignedUrlGet.mutateAsync({
          applicationId,
          userId,
          filename,
        });

        if (typeof url === typeof "str") setUrl(url as string);
      };

      fetchFile();
    }
  }, [projectId, applicationId, filename]);

  return (
    <>
      <div className="block flex w-full cursor-pointer flex-row items-center rounded-lg rounded-xl border bg-white p-3 text-left">
        <div
          className="mr-2 rounded-full border-none bg-secondary px-4 py-2 font-black uppercase text-white shadow-xl"
          onClick={onOpen}
        >
          View File
        </div>
        {filename ? filename : "No file chosen..."}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Preview {filename}</ModalHeader>
              <ModalBody className="max-h-[75vh] max-w-4xl overflow-y-scroll">
                <section
                  className={twMerge(
                    "flex overflow-y-scroll rounded-xl border border-dashed p-2",
                    isLoading ? "hidden" : "",
                  )}
                >
                  {isLoading ? <LoadingSection /> : <></>}

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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Dialog>
        <DialogTrigger className="block w-full cursor-pointer items-center rounded-lg rounded-xl border bg-white p-3 text-left">

        </DialogTrigger>
        <DialogContent className="max-h-[75vh] max-w-4xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle></DialogTitle>
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
      </Dialog> */}
    </>
  );
};

export default FilePreview;
