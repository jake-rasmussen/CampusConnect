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
  editType: "update" | "create";
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const EditController = (props: PropType) => {
  const { dialogDescription, editType, className, children } = props;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {editType === "update" ? (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <button className="group flex h-full w-full items-center">
                <div
                  className={twMerge(
                    "absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10",
                    className,
                  )}
                />
                <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-secondary group-hover:opacity-100" />
              </button>
            </div>
          ) : (
            <div className="group absolute bottom-0 flex translate-y-24 flex-row items-center">
              <SquarePlus className="mx-auto h-14 w-14 text-gray duration-300 group-hover:rotate-90 group-hover:cursor-pointer group-hover:text-secondary" />
              <h1 className="tracking-none text-2xl font-black uppercase text-gray group-hover:cursor-pointer group-hover:text-secondary">
                Add New Item
              </h1>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Club Editor</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditController;
