import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Edit } from "tabler-icons-react";

import Button from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type PropType = {
  dialogDescription: string;
  saveAction: () => void;
  closeAction: () => void;
  children: JSX.Element | JSX.Element[];
};

const EditController = (props: PropType) => {
  const { dialogDescription, saveAction, closeAction, children } = props;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
            <button className="group flex h-full w-full items-center">
              <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
              <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-secondary group-hover:opacity-100" />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Club</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogPrimitive.Close
            onClick={closeAction}
            className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <DialogFooter className="flex flex-row items-center justify-end gap-2">
            <Button onClick={saveAction}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditController;
