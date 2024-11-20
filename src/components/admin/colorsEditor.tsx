import {
  Button,
  Divider,
  Input,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ProjectContext } from "lib/context";
import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";

import { api } from "~/utils/api";

type PropType = {
  projectId: string;
};

const ColorsEditor = (props: PropType) => {
  const { projectId } = props;

  const project = useContext(ProjectContext);

  const queryClient = api.useContext();

  const [primaryColor, setPrimaryColor] = useState(project.colors.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(
    project.colors.secondaryColor,
  );

  const updateColors = api.colorsRouter.upsertColorsByProjectId.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated the Colors!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  return (
    <section className="h-full w-fit">
      <ModalHeader>Change Startup Colors</ModalHeader>
      <Divider className="w-full" />
      <div className="m-6 flex flex-row items-center gap-14">
        <p>Primary Color</p>

        <div className="flex grow flex-row items-center justify-end gap-4">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <div
                className="h-8 w-14 rounded-sm ring ring-black ring-offset-2"
                style={{ backgroundColor: primaryColor }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <HexColorPicker
                color={primaryColor}
                onChange={(e) => setPrimaryColor(e.toUpperCase())}
                className="my-1"
              />
            </PopoverContent>
          </Popover>

          <Input
            value={primaryColor}
            onChange={(e) =>
              setPrimaryColor(e.currentTarget.value.toUpperCase())
            }
            variant="underlined"
            className="w-32"
          />
        </div>
      </div>
      <Divider className="w-full" />
      <div className="m-6 flex flex-row items-center gap-14">
        <p>Secondary Color</p>

        <div className="flex flex-row items-center justify-end gap-4">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <div
                className="h-8 w-14 rounded-sm ring ring-black ring-offset-2"
                style={{ backgroundColor: secondaryColor }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <HexColorPicker
                color={secondaryColor}
                onChange={(e) => setSecondaryColor(e.toUpperCase())}
                className="my-1"
              />
            </PopoverContent>
          </Popover>

          <Input
            value={secondaryColor}
            onChange={(e) =>
              setSecondaryColor(e.currentTarget.value.toUpperCase())
            }
            variant="underlined"
            className="w-32"
          />
        </div>
      </div>
      <ModalFooter className="absolute bottom-0 right-0 m-4">
        <Button
          color="primary"
          onPress={() => {
            toast.dismiss();
            toast.loading("Saving Colors...");
            updateColors.mutate({
              projectId,
              primaryColor,
              secondaryColor,
            });
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </section>
  );
};

export default ColorsEditor;
