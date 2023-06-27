import React from "react";
import { Edit } from "tabler-icons-react";

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
} from "../ui/dialog";

type PropType = {
  description: string;
  fields: [string, React.JSX.Element][];
  action: () => void;
};

const EditButton = (props: PropType) => {
  const { description, fields, action } = props;

  return (
    <>
      <div className="absolute right-0 top-0 h-12 w-12">
        <Dialog>
          <DialogTrigger asChild>
            <button className="h-12 w-12 text-gray transition duration-300 ease-in-out hover:text-primary">
              <Edit className="h-full w-full" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Club</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="gap-4 py-4">
              <div className="grid items-center gap-4">
                {fields.map((value, index: number) => {
                  return (
                    <div key={`field${index}`} className="grid grid-cols-4">
                      <span className="font-bold capitalize">{value[0]}</span>
                      {value[1]}
                    </div>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              {/* <DialogClose> */}
              <button type="submit" onClick={action}>
                Submit
              </button>
              {/* </DialogClose> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EditButton;
