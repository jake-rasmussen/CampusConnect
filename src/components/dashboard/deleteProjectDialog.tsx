import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Button from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";
import { Input } from "../shadcn_ui/input";
import { Trash } from "tabler-icons-react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import router from "next/router";

type PropType = {
  projectId: string;
  projectName: string;
}

const DeleteProjectDialog = (props: PropType) => {
  const { projectId, projectName } = props;

  const [value, setValue] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>();

  useEffect(() => {
    setConfirm(value === projectName);
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


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-0 right-0 m-10 transition duration-300 ease-in-out hover:scale-125 hover:cursor-pointer"
          >
            <div className="flex flex-row items-center rounded-full bg-gradient-to-r from-secondary to-primary">
              <span className="ml-8 mr-4 text-lg font-black uppercase text-white">
                Delete Project?
              </span>
              <Trash className="h-14 w-14 rounded-full bg-white/10 p-1 text-primary backdrop-invert" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <>
            <DialogHeader className="pb-6">
              <DialogTitle>Confirm Delete Project</DialogTitle>
              <DialogDescription>Are you sure you want to delete your project?</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col">
              <span className="flex flex-row gap-2">
                Type the project name to confirm:{"    "}
                <h3 className="tracking-none font-black">
                  {projectName}
                </h3>
              </span>

              <span> </span>
              <Input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                placeholder={projectName}
                className="my-4 py-4"
              />
            </div>

            <div className="w-full flex justify-end items-end">
              <Button
                disabled={!confirm}
                onClickFn={() => {
                  toast.loading("Deleting Project...");
                  deleteProject.mutate({
                    projectId,
                  });
                }}>
                Confirm Delete
              </Button>
            </div>
          </>
        </DialogContent>
      </Dialog >
    </>
  );
};

export default DeleteProjectDialog;
