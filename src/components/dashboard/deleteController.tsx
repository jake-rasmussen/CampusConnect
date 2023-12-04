import { Trash } from "tabler-icons-react";

import Button from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

type PropType = {
  dialogDescription: string;
  handleDelete: () => void;
};

const DeleteController = (props: PropType) => {
  const { dialogDescription, handleDelete } = props;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="my-4">
            <Trash className="h-full w-full transition duration-300 ease-in-out hover:rotate-12 hover:scale-110 hover:text-red-600" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="pb-6">
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogClose className="flex justify-center w-full">
            <div
              className="mx-2 max-w-xs rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110 disabled:opacity-50"
              onClick={() => {
                toast.dismiss();
                toast.loading("Deleting...");
                handleDelete();
              }}
            >
              <span className="tracking-none font-black uppercase text-white">
                Confirm
              </span>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteController;
