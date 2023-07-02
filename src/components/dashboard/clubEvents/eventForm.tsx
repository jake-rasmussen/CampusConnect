import { format } from "date-fns";
import { Field, Form } from "houseform";
import { cn } from "lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "~/components/button";
import { Textarea } from "~/components/shadcn_ui/textarea";
import TimePicker from "~/components/timePicker";
import { Button as ShadCNButton } from "../../shadcn_ui/button";
import { Calendar } from "../../shadcn_ui/calendar";
import { Input } from "../../shadcn_ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shadcn_ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn_ui/select";
import DeleteController from "../deleteController";

type PropType = {
  eventName: string | undefined;
  eventDescription: string | undefined;
  eventLocation: string | undefined;
  eventInPerson: boolean | undefined;
  eventDate: Date | undefined;
  eventId: string | undefined;
  handleUpdate: (values: Record<string, any>) => void;
  handleDelete?: () => void;
};

const EventForm = (props: PropType) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventDate,
    handleUpdate,
    handleDelete,
  } = props;

  return (
    <Form
      onSubmit={(values, errors) => {
        if (errors.errors.length > 0) {
          toast.dismiss();
          errors.errors.map((error) => {
            toast.error(error);
          });
        } else {
          handleUpdate(values);
        }
      }}
      submitWhenInvalid
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="name"
            initialValue={eventName}
            onChangeValidate={z.string().min(1, "Please enter an event name")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-3">
                <span className="font-semibold">Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter the Event Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field name="inPerson" initialValue={eventInPerson}>
            {({ value, setValue }) => (
              <div className="col-span-1">
                <span className="whitespace-nowrap font-semibold">
                  In Person?
                </span>
                <Select
                  defaultValue={
                    eventInPerson
                      ? "yes"
                      : eventInPerson !== undefined
                      ? "no"
                      : ""
                  }
                  onValueChange={(input) => {
                    input === "yes" ? setValue(true) : setValue(false);
                  }}
                >
                  <SelectTrigger className="col-span-3 h-[3rem] rounded-xl bg-white">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </Field>

          <Field
            name="description"
            initialValue={eventDescription}
            onChangeValidate={z.string().min(1, "Please provide a description")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-4">
                <span className="font-semibold">Description</span>
                <Textarea
                  className="h-[3rem] rounded-xl bg-white"
                  placeholder="Enter Event Description"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  rows={4}
                />
              </div>
            )}
          </Field>

          {/** TODO: Add date */}

          <Field name="date" initialValue={eventDate}>
            {({ value, setValue, onBlur }) => (
              <div className="col-span-2 flex flex-col">
                <span className="font-semibold">Date</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <ShadCNButton
                      variant={"outline"}
                      className={cn(
                        "h-[3rem] rounded-xl bg-white text-left font-normal",
                        !value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value ? (
                        format(value, "PPP")
                      ) : (
                        <span className="text-gray">Pick a date</span>
                      )}
                    </ShadCNButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-white p-0">
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={(date) => {
                        if (date !== undefined) {
                          setValue(date);
                        }
                      }}
                      onDayBlur={onBlur}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </Field>

          <Field name="time" initialValue={eventDate}>
            {({ setValue, onBlur }) => (
              <div className="col-span-2 flex flex-col">
                <span className="font-semibold">Time</span>
                <TimePicker
                  date={eventDate}
                  setValue={setValue}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field
            name="location"
            initialValue={eventLocation}
            onChangeValidate={z.string().min(1, "Please provide a location")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-4">
                <span className="font-semibold">Location / Link</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Event Location or Link"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <div className="col-span-1">
            <Button onClick={submit} className="my-4">
              Submit
            </Button>
          </div>

          {handleDelete !== undefined ? (
            <div className="col-span-3 flex justify-end">
              <DeleteController
                dialogDescription="Are you sure you want to delete the Contact Info?"
                handleDelete={handleDelete}
              />
            </div>
          ) : (
            <></>
          )}
        </main>
      )}
    </Form>
  );
};

export default EventForm;
