import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { LicenseOff, Trash, TrashX } from "tabler-icons-react";

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
  projectId: string;
  applicationId: string;
  applicationSubmissionId: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationWithdrawDialog = (props: PropType) => {
  const { projectId, applicationId, applicationSubmissionId, openDialog, setOpenDialog } =
    props;

  const queryClient = api.useContext();

  const clearSupabaseFolder = api.supabaseRouter.clearSupabaseFolder.useMutation({});

  const withdrawApplicationSubmission =
    api.applicationSubmissionRouter.withdrawApplicationSubmission.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Withdrew Application!");
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
          <LicenseOff className="h-14 w-14 text-primary transition duration-300 ease-in-out hover:rotate-12 hover:text-red-500" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to withdraw this application?
          </DialogTitle>
          <DialogDescription>
            Please note, once this applicaiton is withdrawn, this action cannot
            be undone. Access to the submission will be lost!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClickFn={async () => {
              await clearSupabaseFolder.mutateAsync({
                projectId,
                applicationId
              });

              withdrawApplicationSubmission.mutate({
                applicationSubmissionId,
                applicationId,
              });
              setOpenDialog(false);
              toast.dismiss();
              toast.loading("Withdrawing Application...");
            }}
          >
            Yes, I'm Sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationWithdrawDialog;
