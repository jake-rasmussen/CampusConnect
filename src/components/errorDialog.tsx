import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./shadcn_ui/dialog";

type PropType = {
  children?: JSX.Element | JSX.Element[];
  dialogDescription: string;
  openDialog: boolean;
  onClose?: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const ErrorDialog = (props: PropType) => {
  const { children, dialogDescription, openDialog, setOpenDialog, onClose } =
    props;

  return (
    <>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setOpenDialog(!openDialog);

          if (openDialog && onClose) {
            onClose();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription className="py-4">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogPrimitive.Close
            className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            onClick={() => {
              setOpenDialog(false);
              if (onClose) onClose();
            }}
          >
            <Cross2Icon className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ErrorDialog;
