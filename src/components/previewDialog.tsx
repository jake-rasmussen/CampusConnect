import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn_ui/dialog";

type PropType = {
  triggerButton: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  children?: JSX.Element | JSX.Element[];
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const PreviewDialog = (props: PropType) => {
  const {
    children,
    dialogTitle,
    dialogDescription,
    openDialog,
    setOpenDialog,
    triggerButton,
    className,
  } = props;

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div onClick={() => setOpenDialog(true)}>{triggerButton}</div>
        </DialogTrigger>
        <DialogContent
          className={twMerge(
            "max-h-[75vh] max-w-5xl overflow-y-scroll",
            className,
          )}
        >
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="py-4">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <Cross2Icon className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <section className="overflow-y-scroll rounded-2xl">
            {children}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewDialog;
