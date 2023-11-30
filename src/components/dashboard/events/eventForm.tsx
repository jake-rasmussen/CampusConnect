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
} from "../../shadcn_ui/popoverDialog";
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
      onSubmit={(values) => {
        onSubmit(values);
        setOpenDialog(false);
        toast.dismiss();
        toast.success("Success submitting the form!");
      }}
    >
      {({ submit }) => (
        <main className="grid grid-cols-8 gap-4 py-4">
          <Field
            name="name"
            initialValue={eventName}
            onBlurValidate={z.string().min(1, "Enter a name")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-6">
                <span className="font-semibold">Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter the Event Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="inPerson"
            initialValue={eventInPerson}
            onChangeValidate={z.boolean({
              required_error: "Choose in person",
              invalid_type_error: "Choose in person",
            })}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-2">
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
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="description"
            initialValue={eventDescription}
            onBlurValidate={z.string().min(1, "Enter a description")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-8">
                <span className="font-semibold">Description</span>
                <Textarea
                  className="rounded-xl bg-white"
                  placeholder="Enter Event Description"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  rows={8}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="date"
            initialValue={eventDate}
            onBlurValidate={z.date({
              required_error: "Enter a date",
              invalid_type_error: "Enter a date",
            })}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-5 flex flex-col">
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
                  <PopoverContent className="w-full bg-white p-0">
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
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="time"
            initialValue={eventDate}
            onSubmitValidate={z.date({
              required_error: "Enter a time",
              invalid_type_error: "Enter a time",
            })}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-3 flex flex-col">
                <span className="font-semibold">Time</span>
                <TimePicker value={value} setValue={setValue} onBlur={onBlur} />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="location"
            initialValue={eventLocation}
            onBlurValidate={z.string().min(1, "Enter a location")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-8">
                <span className="font-semibold">Location / Link</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Event Location or Link"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <div className="col-span-8 flex flex-row justify-end">
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
                onClickFn={() => {
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
