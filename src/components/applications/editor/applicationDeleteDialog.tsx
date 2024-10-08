import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";
import { Link, Trash } from "tabler-icons-react";

import { api } from "~/utils/api";

type PropType = {
  applicationId: string;
  projectId: string;
};

const ApplicationDeleteDialog = (props: PropType) => {
  const { applicationId, projectId } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = api.useContext();

  const removeApplicationProject =
    api.applicationRouter.removeApplicationFromProject.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Removed Application!");
        queryClient.invalidate();
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  return (
    <>
      <div className="absolute right-0 top-0 -translate-x-px translate-y-px" onClick={onOpen}>
        <Trash className="h-14 w-14 text-primary transition duration-300 ease-in-out hover:rotate-12 hover:text-red-500" />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete this application?
              </ModalHeader>
              <ModalBody>
                Please note, once this applicaiton is deleted, this action cannot be
                undone. Access to any submitted submissions will be lost!
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  removeApplicationProject.mutate({ applicationId, projectId });
                  toast.dismiss();
                  toast.loading("Removing Application...");
                  onClose();
                }}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal >
    </>
  );
};

export default ApplicationDeleteDialog;
