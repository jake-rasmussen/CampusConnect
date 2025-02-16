import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import toast from "react-hot-toast";
import { Trash } from "tabler-icons-react";

type PropType = {
  dialogDescription: string;
  handleDelete: () => void;
};

const DeleteController = (props: PropType) => {
  const { dialogDescription, handleDelete } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button className="group w-10 h-10" onClick={onOpen}>
        <Trash className="h-full w-full transition duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110 group-hover:text-red-600" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col">
                  <h1>Confirm Delete</h1>
                  <p className="text-xs font-normal text-gray">
                    {dialogDescription}
                  </p>
                </div>
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    toast.dismiss();
                    toast.loading("Deleting Contact...");
                    handleDelete();
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteController;
