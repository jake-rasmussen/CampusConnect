import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "tabler-icons-react";

import { api } from "~/utils/api";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

type PropType = {
  projectId: string;
  projectName: string;
};

const DeleteProjectEditor = (props: PropType) => {
  const { projectId, projectName } = props;

  const [value, setValue] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>();

  useEffect(() => {
    setConfirm(value === projectName);
  }, [value]);

  const deleteProject = api.projectRouter.deleteProject.useMutation({
    onSuccess() {
      toast.loading("Redirecting...");
      toast.dismiss();
      router.push(`/my-projects`);
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="fixed bottom-0 right-0 m-10 transition duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
        onClick={onOpen}
      >
        <div className="flex flex-row items-center rounded-full bg-gradient-to-r from-secondary to-primary">
          <span className="ml-8 mr-4 text-lg font-black uppercase text-white">
            Delete Project?
          </span>
          <Trash className="h-14 w-14 rounded-full bg-white/10 p-1 text-primary backdrop-invert" />
        </div>
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col">
                  <h1>Confirm Delete Project</h1>
                  <span className="font-normal">Are you sure you want to delete your project?</span>
                </div>
              </ModalHeader>
              <ModalBody className="overflow-y-scroll max-h-[70vh] overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <span className="flex flex-row gap-2">
                    Type the project name to confirm:{"    "}
                    <h3 className="tracking-none font-black">{projectName}</h3>
                  </span>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    placeholder={projectName}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button isDisabled={!confirm} color="primary" onPress={() => {
                  toast.loading("Deleting Project...");
                  deleteProject.mutate({
                    projectId,
                  });
                }}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProjectEditor;