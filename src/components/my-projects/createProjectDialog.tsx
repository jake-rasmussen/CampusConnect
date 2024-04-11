import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";
import CreateProjectForm from "./createProjectForm";

const CreateProjectDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button
            className="tracking-none max-w-xs rounded-xl bg-secondary px-4 py-4 font-black uppercase text-white transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer disabled:opacity-50"
            onClick={() => setOpenDialog(true)}
          >
            Create your own project!
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <>
            <DialogHeader className="pb-6">
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>Create your own project!</DialogDescription>
            </DialogHeader>

            <div>
              <CreateProjectForm setOpenDialog={setOpenDialog} />
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProjectDialog;
