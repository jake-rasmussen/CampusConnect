import React from "react";
import { Edit, SquarePlus } from "tabler-icons-react";

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
  children: JSX.Element | JSX.Element[];
};

const EditController = (props: PropType) => {
  const { dialogDescription, editType: editorType, children } = props;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {editorType === "update" ? (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <button className="group flex h-full w-full items-center">
                <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-secondary group-hover:opacity-100" />
              </button>
            </div>
          ) : (
            <div className="absolute bottom-0 translate-y-24">
              <SquarePlus className="mx-auto h-20 w-20 text-gray duration-300 hover:rotate-90 hover:cursor-pointer hover:text-secondary" />
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
