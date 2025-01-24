import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Edit, SquarePlus } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import DeleteController from "./deleteController";

type PropType = {
  dialogDescription: string;
  createDescription?: string;
  editType: "update" | "create";
  className?: string;
  children: JSX.Element | JSX.Element[];
  handleSubmit: () => Promise<boolean>;
  handleDelete?: () => void;
};

const EditController = (props: PropType) => {
  const {
    dialogDescription,
    createDescription,
    editType,
    className,
    children,
    handleSubmit,
    handleDelete,
  } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {editType === "update" && (
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
          <button
            className="group flex h-full w-full items-center"
            onClick={onOpen}
          >
            <div
              className={twMerge(
                "absolute h-full w-full rounded-xl bg-black opacity-0 duration-300 group-hover:opacity-10",
                className,
              )}
            />
            <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
          </button>
        </div>
      )}
      {editType === "create" && (
        <div className={className}>
          <button className="group flex flex-row items-center" onClick={onOpen}>
            <SquarePlus className="mx-auto h-14 w-14 text-gray duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
            <h1 className="tracking-none text-2xl font-black uppercase text-gray group-hover:cursor-pointer group-hover:text-secondary">
              {createDescription}
            </h1>
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{dialogDescription}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter className="flex">
                <div className="grow">
                  {handleDelete && (
                    <div className="flex w-auto grow items-center justify-start">
                      <DeleteController
                        dialogDescription="Are you sure you want to delete the Contact Info?"
                        handleDelete={handleDelete}
                      />
                    </div>
                  )}
                </div>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    const isValid = await handleSubmit();
                    if (isValid) onClose();
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

export default EditController;
