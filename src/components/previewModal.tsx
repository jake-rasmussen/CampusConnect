import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import React from "react";
import { twMerge } from "tailwind-merge";

type PropType = {
  triggerButton: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const PreviewModal = (props: PropType) => {
  const { children, dialogTitle, dialogDescription, triggerButton, className } =
    props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const triggerWithOnClick = React.cloneElement(triggerButton, {
    onClick: onOpen,
  });

  return (
    <>
      {triggerWithOnClick}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent
          className={twMerge(
            "max-h-[75vh] max-w-5xl overflow-y-scroll",
            className,
          )}
        >
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex flex-col">
                  <h1>{dialogTitle}</h1>
                  <p className="text-sm font-normal text-gray">
                    {dialogDescription}
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="overflow-y-scroll">{children}</ModalBody>
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
