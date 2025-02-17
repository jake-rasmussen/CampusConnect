import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import Error from "next/error";
import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "tabler-icons-react";

import { api } from "~/utils/api";
import LoadingSection from "../loadingSection";

type PropType = {
  projectId: string;
};

const DeleteProjectEditor = (props: PropType) => {
  const { projectId } = props;

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = api.projectRouter.getProjectByIdForAdmin.useQuery({
    projectId,
  });

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
      router.push(`/my-startups`);
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
            <h1>Confirm Delete Startup</h1>
            <span className="font-normal">
              Are you sure you want to delete your startup?
            </span>
          </div>
        </ModalHeader>
        <Divider className="w-full" />
        <div className="m-6 flex flex-col gap-4">
          <span className="flex flex-row gap-2">
            Type the startup's name to confirm:{"    "}
            <h3 className="tracking-none font-black">{project.name}</h3>
          </span>
          <Input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={project.name}
          />
        </div>

        <div className="flex w-full grow justify-end">
          <Button
            isDisabled={!confirm}
            color="primary"
            onPress={() => {
              toast.loading("Deleting Project...");
              deleteProject.mutate({
                projectId,
              });
            }}
            className="mr-6"
          >
            Confirm
          </Button>
        </div>
      </>
    );
  }
};

export default DeleteProjectEditor;
