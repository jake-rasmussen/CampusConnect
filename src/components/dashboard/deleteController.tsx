import { Trash } from "tabler-icons-react";

import Button from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";

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
            <Trash className="h-full w-full transition duration-300 ease-in-out hover:rotate-12 hover:scale-110 hover:text-red-800" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="pb-6">
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button className="mx-2" onClick={handleDelete}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteController;
