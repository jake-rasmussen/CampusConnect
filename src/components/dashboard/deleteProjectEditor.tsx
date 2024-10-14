import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "tabler-icons-react";

import { api } from "~/utils/api";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Divider } from "@nextui-org/react";
import LoadingSection from "../loadingSection";
import Error from "next/error";

type PropType = {
  projectId: string;
};

const DeleteProjectEditor = (props: PropType) => {
  const { projectId } = props;

  const {
    data: project,
    isLoading,
    isError,
    error
  } = api.projectRouter.getProjectByIdForAdmin.useQuery({
    projectId
  })

  const [value, setValue] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>();

  useEffect(() => {
    if (project) {
      setConfirm(value === project.name);
    }
  }, [value]);

  const deleteProject = api.projectRouter.deleteProject.useMutation({
    onSuccess() {
      toast.loading("Redirecting...");
      toast.dismiss();
      router.push(`/my-projects`);
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  if (isLoading) {
    return <LoadingSection />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <>
        <ModalHeader>
          <div className="flex flex-col">
            <h1>Confirm Delete Project</h1>
            <span className="font-normal">Are you sure you want to delete your project?</span>
          </div>
        </ModalHeader>
        <Divider className="w-full" />
        <div className="flex flex-col gap-4 m-6">
          <span className="flex flex-row gap-2">
            Type the project name to confirm:{"    "}
            <h3 className="tracking-none font-black">{project.name}</h3>
          </span>
          <Input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={project.name}
          />
        </div>

        <div className="w-full grow flex justify-end">
          <Button isDisabled={!confirm} color="primary" onPress={() => {
            toast.loading("Deleting Project...");
            deleteProject.mutate({
              projectId,
            });
          }} className="mr-6">
            Confirm
          </Button>
        </div>
      </>
    );
  }
};

export default DeleteProjectEditor;