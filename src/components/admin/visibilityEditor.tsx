import {
  Button,
  Divider,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@heroui/react";
import { ProjectContext } from "lib/context";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "tabler-icons-react";

import { api } from "~/utils/api";

type PropType = {
  projectId: string;
};

const VisibilityEditor = (props: PropType) => {
  const { projectId } = props;

  const project = useContext(ProjectContext);

  const [isVisible, setIsVisible] = useState<boolean>(project.isVisible);

  const queryClient = api.useContext();

  const updateProject = api.projectRouter.updateProject.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated the Visibility!");
      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  return (
    <section className="h-full w-fit">
      <ModalHeader>Change Project Visibility</ModalHeader>
      <Divider className="w-full" />
      <div className="flex flex-col gap-2 m-6">
        <Switch
          defaultSelected
          color="success"
          endContent={<EyeOff />}
          size="lg"
          startContent={<Eye />}
          isSelected={isVisible}
          onValueChange={setIsVisible}
        >
          Change Visibility
        </Switch>
        <p className="text-small text-default-500">Selected: {isVisible ? "Visible" : "Invisible"}</p>
      </div>

      <ModalFooter className="absolute bottom-0 right-0 m-4">
        <Button
          color="primary"
          onPress={() => {
            toast.dismiss();
            toast.loading("Saving Colors...");
            updateProject.mutate({
              projectId,
              isVisible,
            });
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </section>
  );
};

export default VisibilityEditor;
