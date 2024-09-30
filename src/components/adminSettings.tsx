import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Brush, Flag2, Settings, Trash } from "tabler-icons-react";

enum SettingsSection {
  "COLORS",
  "BANNER",
  "DELETE"
}

const AdminSettings = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [settingsSection, setSettingsSection] = useState<SettingsSection>();

  return (
    <>
      <button
        className="absolute top-0 right-0 m-4 transition duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
        onClick={onOpen}
      >
        <Settings className="h-16 w-16 rounded-full p-1" />
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="grid grid-cols-5 mb-8">
                <div className="col-span-1 flex flex-col gap-y-2">
                  <ModalHeader>Project Settings</ModalHeader>
                  <Button
                    variant="light"
                    onPress={() => setSettingsSection(SettingsSection.COLORS)}
                    endContent={<Brush />}
                  >
                    Change Colors
                  </Button>
                  <Button
                    variant="light"
                    onPress={() => setSettingsSection(SettingsSection.BANNER)}
                    endContent={<Flag2 />}
                  >
                    Change Banner
                  </Button>

                  <div className="w-full grow items-end flex">
                    <Button variant="light" color="danger" className="w-full">Delete Project</Button>
                  </div>
                </div>
                <div className="h-[50vh] col-span-4 flex flex-row">
                  <Divider orientation="vertical" className="mr-4" />
                  <div className="w-full">
                    {settingsSection === SettingsSection.COLORS && <section className="h-full w-full">
                      <ModalHeader>Change Project Colors</ModalHeader>
                      <Divider className="w-full" />
                      <div className="flex flex-row m-6">
                        Primary Color
                        
                      </div>
                    </section>}

                    {settingsSection === SettingsSection.BANNER && <>Banner</>}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminSettings;