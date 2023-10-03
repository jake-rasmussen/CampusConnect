import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Edit, SquarePlus } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";

type PropType = {
  dialogDescription: string;
  createDescription?: string;
  editType: "update" | "create";
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const EditController = (props: PropType) => {
  const {
    dialogDescription,
    createDescription,
    editType,
    openDialog,
    setOpenDialog,
    className,
    children,
  } = props;

  return (
    <>
      <Dialog open={openDialog}>
        <DialogTrigger asChild>
          <>
            {editType === "update" && (
              <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
                <button
                  className="group flex h-full w-full items-center"
                  onClick={() => setOpenDialog(true)}
                >
                  <div
                    className={twMerge(
                      "absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10",
                      className,
                    )}
                  />
                  <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
                </button>
              </div>
            )}
            {editType === "create" && (
              <div className={className}>
                <button
                  className="group flex flex-row items-center"
                  onClick={() => setOpenDialog(true)}
                >
                  <SquarePlus className="mx-auto h-14 w-14 text-gray duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
                  <h1 className="tracking-none text-2xl font-black uppercase text-gray group-hover:cursor-pointer group-hover:text-secondary">
                    {createDescription}
                  </h1>
                </button>
              </div>
            )}
          </>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Club Editor</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogPrimitive.Close
            className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            onClick={() => setOpenDialog(false)}
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

export default EditController;
