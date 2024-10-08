import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, Divider, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useContext, useState } from "react";
import { Brush, Flag2, Settings } from "tabler-icons-react";
import { HexColorPicker } from "react-colorful";
import { ProjectContext } from "lib/context";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { upperCase } from "lodash";

enum SettingsSection {
  "COLORS",
  "BANNER",
  "DELETE"
}

type PropType = {
  projectId: string;
}

const AdminSettings = (props: PropType) => {
  const { projectId } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = api.useContext();
  const project = useContext(ProjectContext);

  const [settingsSection, setSettingsSection] = useState<SettingsSection>(SettingsSection.COLORS);

  const [primaryColor, setPrimaryColor] = useState(project.colors.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(project.colors.secondaryColor);

  const updateColors = api.colorsRouter.upsertColorsByProjectId.useMutation(
    {
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Updated the Colors!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    }
  )

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
                    {settingsSection === SettingsSection.COLORS &&
                      <section className="h-full w-fit">
                        <ModalHeader>Change Project Colors</ModalHeader>
                        <Divider className="w-full" />
                        <div className="flex flex-row gap-14 items-center m-6">
                          <p>Primary Color</p>

                          <div className="flex flex-row items-center gap-4 grow justify-end">
                            <Popover placement="bottom-start">
                              <PopoverTrigger>
                                <div className="w-14 h-8 rounded-sm ring ring-black ring-offset-2" style={{ backgroundColor: primaryColor }} />
                              </PopoverTrigger>
                              <PopoverContent>
                                <HexColorPicker color={primaryColor} onChange={(e) => setPrimaryColor(e.toUpperCase())} className="my-1" />
                              </PopoverContent>
                            </Popover>

                            <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.currentTarget.value.toUpperCase())} variant="underlined" className="w-32" />
                          </div>
                        </div>
                        <Divider className="w-full" />
                        <div className="flex flex-row gap-14 items-center m-6">
                          <p>Secondary Color</p>

                          <div className="flex flex-row items-center gap-4 justify-end">
                            <Popover placement="bottom-start">
                              <PopoverTrigger>
                                <div className="w-14 h-8 rounded-sm ring ring-black ring-offset-2" style={{ backgroundColor: secondaryColor }} />
                              </PopoverTrigger>
                              <PopoverContent>
                                <HexColorPicker color={secondaryColor} onChange={(e) => setSecondaryColor(e.toUpperCase())} className="my-1" />
                              </PopoverContent>
                            </Popover>

                            <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.currentTarget.value.toUpperCase())} variant="underlined" className="w-32" />
                          </div>
                        </div>
                        <ModalFooter className="absolute right-0 bottom-0 m-4">
                          <Button color="primary" onPress={() => {
                            toast.dismiss();
                            toast.loading("Saving Colors...");
                            updateColors.mutate({
                              projectId,
                              primaryColor,
                              secondaryColor
                            });
                          }}>
                            Save
                          </Button>
                        </ModalFooter>
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