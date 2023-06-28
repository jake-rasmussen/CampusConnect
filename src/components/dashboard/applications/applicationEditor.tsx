import { format } from "date-fns";
import { cn } from "lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";

import { Button } from "../../shadcn_ui/button";
import { Calendar } from "../../shadcn_ui/calendar";
import { Input } from "../../shadcn_ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn_ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn_ui/select";
import EditController from "../editController";

type PropType = {
  applicationName: string;
  clubId: string;
};

const ApplicationEditor = (props: PropType) => {
  const { applicationName, clubId } = props;

  const [date, setDate] = React.useState<Date>();

  return (
    <EditController
      saveAction={() => {}}
      closeAction={() => {}}
      dialogDescription={`Edit the application for ${applicationName}`}
    >
      <main className="grid grid-cols-4 gap-2 py-4">
        <span className="col-span-1 font-semibold underline">Name</span>
        <Input
          className="col-span-3 h-[3rem]"
          placeholder="Enter the Application Name"
        />

        <span className="col-span-1 font-semibold underline">Description</span>
        <Input
          className="col-span-3 h-[3rem]"
          placeholder="Enter Application Description"
        />

        <span className="col-span-1 font-semibold underline">Status</span>
        <Select>
          <SelectTrigger className="col-span-3 h-[3rem] rounded-xl bg-white">
            <SelectValue placeholder="Select Applicaiton Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <span className="col-span-1 font-semibold underline">Deadline</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "col-span-3 h-[3rem] justify-start rounded-xl bg-white text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </main>
    </EditController>
  );
};

export default ApplicationEditor;
