import { User } from "@prisma/client";

import Button from "~/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/shadcn_ui/dialog";

type PropType = {
  user?: User;
  onConfirm: () => void;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const MemberConfirmDialog = (props: PropType) => {
  const { user, onConfirm, openDialog, setOpenDialog } = props;

  if (!user) {
    return <></>;
  } else {
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to add {user.firstName} {user.lastName}?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-black opacity-50"
              onClickFn={() => {
                setOpenDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClickFn={() => {
                onConfirm();
                setOpenDialog(false);
              }}
            >
              Yes, I'm Sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default MemberConfirmDialog;
