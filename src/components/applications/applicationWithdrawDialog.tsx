import toast from "react-hot-toast";
import { LicenseOff } from "tabler-icons-react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "@nextui-org/modal";

import { api } from "~/utils/api";
import { Button, useDisclosure } from "@nextui-org/react";

type PropType = {
  projectId: string;
  applicationId: string;
  applicationSubmissionId: string;
};

const ApplicationWithdrawDialog = (props: PropType) => {
  const {
    projectId,
    applicationId,
    applicationSubmissionId,
  } = props;

  const queryClient = api.useContext();

  const clearSupabaseFolder =
    api.supabaseRouter.clearSupabaseFolder.useMutation({});

  const withdrawApplicationSubmission =
    api.applicationSubmissionRouter.withdrawApplicationSubmission.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Withdrew Application!");
        queryClient.invalidate();
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className="absolute right-0 top-0 -translate-x-px translate-y-px"
        onClick={onOpen}
      >
        <LicenseOff className="h-14 w-14 text-primary transition duration-300 ease-in-out hover:rotate-12 hover:text-red-500" />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-sans">
                Are you sure you want to withdraw this application?
              </ModalHeader>
              <ModalBody>
                Please note, once this applicaiton is withdrawn, this action cannot
                be undone. Access to the submission will be lost!
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={async () => {
                  onClose();

                  toast.dismiss();
                  toast.loading("Withdrawing Application...");

                  await clearSupabaseFolder.mutateAsync({
                    applicationId,
                  });

                  withdrawApplicationSubmission.mutate({
                    applicationSubmissionId,
                    applicationId,
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

export default ApplicationWithdrawDialog;