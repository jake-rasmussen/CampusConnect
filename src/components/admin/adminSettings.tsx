import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { Brush, Eye, Settings } from "tabler-icons-react";

import DeleteProjectEditor from "../dashboard/deleteProjectEditor";
import BannerEditor from "./bannerEditor";
import ColorsEditor from "./colorsEditor";
import VisibilityEditor from "./visibilityEditor";

enum SettingsSection {
  "COLORS",
  "BANNER",
  "DELETE",
  "VISIBILITY",
}

type PropType = {
  projectId: string;
};

const AdminSettings = ({ projectId }: PropType) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [settingsSection, setSettingsSection] = useState<SettingsSection>(
    SettingsSection.COLORS,
  );

  // Automatically close modal when window width reaches "md" (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        onClose(); // Close modal at md: breakpoint
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      <button
        className="absolute right-0 top-0 m-4 transition duration-500 ease-in-out hover:rotate-180 hover:scale-125 hover:cursor-pointer"
        onClick={onOpen}
      >
        <Settings className="h-20 w-20 rounded-full p-1" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mb-8 grid grid-cols-5">
                <div className="col-span-1 flex flex-col gap-y-2">
                  <ModalHeader>Startup Settings</ModalHeader>
                  <Button
                    variant="light"
                    onPress={() => setSettingsSection(SettingsSection.COLORS)}
                    endContent={<Brush className="hidden lg:block" />}
                  >
                    Change Colors
                  </Button>
                  <Button
                    variant="light"
                    onPress={() =>
                      setSettingsSection(SettingsSection.VISIBILITY)
                    }
                    endContent={<Eye className="hidden lg:block" />}
                  >
                    Change Visibility
                  </Button>

                  <div className="flex w-full grow items-end">
                    <Button
                      variant="light"
                      color="danger"
                      className="w-full"
                      onPress={() => setSettingsSection(SettingsSection.DELETE)}
                    >
                      Delete Startup
                    </Button>
                  </div>
                </div>
                <div className="col-span-4 flex h-[50vh] flex-row">
                  <Divider orientation="vertical" className="mr-4" />
                  <div className="w-full">
                    {settingsSection === SettingsSection.COLORS && (
                      <ColorsEditor projectId={projectId} />
                    )}

                    {settingsSection === SettingsSection.BANNER && (
                      <BannerEditor projectId={projectId} />
                    )}

                    {settingsSection === SettingsSection.VISIBILITY && (
                      <VisibilityEditor projectId={projectId} />
                    )}

                    {settingsSection === SettingsSection.DELETE && (
                      <DeleteProjectEditor projectId={projectId} />
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminSettings;
