import { twMerge } from "tailwind-merge";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";

type PropType = {
  triggerButton: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const PreviewModal = (props: PropType) => {
  const {
    children,
    dialogTitle,
    dialogDescription,
    triggerButton,
    className,
  } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const triggerWithOnClick = React.cloneElement(triggerButton, {
    onClick: onOpen,
  });

  return (
    <>
      {triggerWithOnClick}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          className={twMerge(
            "max-w-5xl",
            className,
          )}
        >
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col">
                  <h1>{dialogTitle}</h1>
                  <span className="font-normal">{dialogDescription}</span>
                </div>
              </ModalHeader>
              <ModalBody className="overflow-y-scroll overflow-y-scroll">
                {children}
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
    </>
  );
};

export default PreviewModal;
