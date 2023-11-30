import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { Trash, TrashX } from "tabler-icons-react";

import Button from "~/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/shadcn_ui/dialog";
import { api } from "~/utils/api";

type PropType = {
  applicationId: string;
  projectId: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationDeleteDialog = (props: PropType) => {
  const { applicationId, projectId, openDialog, setOpenDialog } = props;

  const queryClient = api.useContext();

  const removeApplicationProject =
    api.applicationRouter.removeApplicationFromProject.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Removed Application!");
        queryClient.invalidate();
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div className="absolute right-0 top-0 -translate-x-px translate-y-px">
          <Trash className="h-14 w-14 text-primary transition duration-300 ease-in-out hover:rotate-12 hover:text-red-500" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this application?
          </DialogTitle>
          <DialogDescription>
            Please note, once this applicaiton is deleted, this action cannot be
            undone. Access to any submitted submissions will be lost!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClickFn={() => {
              removeApplicationProject.mutate({ applicationId, projectId });
              setOpenDialog(false);
              toast.dismiss();
              toast.loading("Removing Application...");
            }}
          >
            Yes, I'm Sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDeleteDialog;
