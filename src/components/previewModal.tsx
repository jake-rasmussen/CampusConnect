import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type PropType = {
  triggerButton: JSX.Element;
  dialogTitle: string;
  dialogDescription?: string;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

const PreviewModal = (props: PropType) => {
  const {
    children,
    dialogTitle,
    dialogDescription = "",
    triggerButton,
    className,
    isOpen: isOpenDefault,
    onClose
  } = props;

  const [isOpen, setIsOpen] = useState(isOpenDefault ?? false);

  // Sync internal state when `isOpenDefault` changes
  useEffect(() => {
    setIsOpen(isOpenDefault ?? false);
  }, [isOpenDefault]);

  const triggerWithOnClick = React.cloneElement(triggerButton, {
    onClick: () => setIsOpen(true),
  });

  return (
    <>
      {triggerWithOnClick}

      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} size="4xl">
        <ModalContent
          className={twMerge("max-h-[75vh] max-w-5xl overflow-y-scroll", className)}
        >
          {() => (
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
                <Button color="danger" variant="light" onPress={() => {
                  setIsOpen(false);
                  if (onClose) onClose();
                }}>
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
