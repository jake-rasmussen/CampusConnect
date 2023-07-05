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
import ErrorMessage from "../errorMessage";

export type EventFormType = {
  name: string;
  date: Date;
  time: Date;
  description: string;
  inPerson: boolean;
  location: string;
};

type PropType = {
  eventName?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventInPerson?: boolean;
  eventDate?: Date;
  eventId?: string;
  setOpenDialog: React.Dispatch<boolean>;
  onSubmit: (values: EventFormType) => void;
  handleDelete?: () => void;
};

const EventForm = (props: PropType) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventDate,
    setOpenDialog,
    onSubmit,
    handleDelete,
  } = props;

  return (
    <Form<EventFormType>
      onSubmit={(values, errors) => {
        if (errors.errors.length === 0) {
          onSubmit(values);
          setOpenDialog(false);
          toast.dismiss();
          toast.success("Success submitting the form!");
        } else {
          toast.dismiss();
          toast.error("There are errors with the form");
        }
      }}
      submitWhenInvalid
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="name"
            initialValue={eventName}
            onChangeValidate={z.string().min(1)}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-3">
                <span className="font-semibold">Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter the Event Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="inPerson"
            initialValue={eventInPerson}
            onChangeValidate={z.boolean()}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-1">
                <span className="whitespace-nowrap font-semibold">
                  In Person?
                </span>
                <Select
                  defaultValue={
                    value ? "yes" : eventInPerson !== undefined ? "no" : ""
                  }
                  onValueChange={(input) => {
                    input === "yes" ? setValue(true) : setValue(false);
                  }}
                >
                  <SelectTrigger className="col-span-3 h-[3rem] rounded-xl bg-white">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white" onBlur={onBlur}>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="description"
            initialValue={eventDescription}
            onChangeValidate={z.string().min(1)}
          >
            {({ value, setValue, onBlur, errors }) => (
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
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="date"
            initialValue={eventDate}
            onChangeValidate={z.date()}
          >
            {({ value, setValue, onBlur, errors }) => (
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
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="time"
            initialValue={eventDate}
            onChangeValidate={z.date()}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-2 flex flex-col">
                <span className="font-semibold">Time</span>
                <TimePicker value={value} setValue={setValue} onBlur={onBlur} />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="location"
            initialValue={eventLocation}
            onChangeValidate={z.string().min(1)}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-4">
                <span className="font-semibold">Location / Link</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Event Location or Link"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <div className="col-span-4 flex flex-row justify-end">
            {handleDelete && (
              <div className="mx-8 flex w-auto grow justify-end">
                <DeleteController
                  dialogDescription="Are you sure you want to delete the Contact Info?"
                  handleDelete={handleDelete}
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  submit().catch((e) => console.log(e));
                }}
                className="my-4"
              >
                Submit
              </Button>
            </div>
          </div>
        </main>
      )}
    </Form>
  );
};

export default EventForm;
