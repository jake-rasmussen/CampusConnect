import {
  CalendarDate,
  parseDate,
  Time,
  toCalendarDate,
} from "@internationalized/date";
import {
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
} from "@nextui-org/react";
import { Field, Form } from "houseform";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { api } from "~/utils/api";
import EditController from "../editController";

type EventFormType = {
  name: string;
  date: Date;
  start: Date;
  end: Date;
  description: string;
  inPerson: boolean;
  location: string;
};

type PropType = {
  eventName?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventInPerson?: boolean;
  eventStart?: Date;
  eventEnd?: Date;
  eventId?: string;
  projectId: string;
};

const EventEditor = (props: PropType) => {
  const {
    projectId,
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventStart,
    eventEnd,
    eventId,
  } = props;

  const queryClient = api.useContext();

  const createEvent = api.eventRouter.createEvent.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Created the Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const updateEvent = api.eventRouter.updateEventById.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated the Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const deleteEvent = api.eventRouter.deleteEventById.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Deleted the Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const handleSubmit = (values: EventFormType) => {
    if (eventId) {
      let startDate = values.date;
      let endDate = values.date;

      startDate.setHours(values.start.getHours());
      startDate.setMinutes(values.start.getMinutes());

      endDate.setHours(values.end.getHours());
      endDate.setMinutes(values.end.getMinutes());

      updateEvent.mutate({
        id: eventId,
        name: values.name,
        description: values.description,
        start: startDate,
        end: endDate,
        inPerson: values.inPerson,
        location: values.location,
        projectId,
      });
    } else {
      values.start.setDate(values.date.getDate());
      values.end.setDate(values.date.getDate());

      createEvent.mutate({
        projectId,
        name: values.name,
        start: values.start,
        end: values.end,
        description: values.description,
        inPerson: values.inPerson,
        location: values.location,
      });
    }
  };

  const handleDelete = () => {
    if (eventId) {
      deleteEvent.mutate({
        id: eventId,
        projectId,
      });
    }
  };

  const getInPersonKey = (value: boolean | string) => {
    if (value === "") {
      return "";
    } else {
      if (value) {
        return ["YES"];
      } else {
        return ["NO"];
      }
    }
  };

  const dateToDateValue = (date: Date) => {
    if (date) {
      return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
      );
    }
    return null;
  };

  const dateToTimeValue = (date: Date) => {
    if (date) {
      return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    return null;
  };

  return (
    <Form<EventFormType>
      onSubmit={(values) => {
        console.log("TEST", values);
        handleSubmit(values);
      }}
    >
      {({ submit }) => (
        <EditController
          dialogDescription={`Edit the event, ${eventName}`}
          createDescription="Create New Event"
          editType={eventId ? "update" : "create"}
          handleSubmit={async () => {
            return await submit()
              .then((isValid) => {
                if (isValid) {
                  toast.dismiss();
                  toast.loading("Saving Event...");
                }
                return isValid;
              })
              .catch((e) => {
                console.log(e);
                return false;
              });
          }}
          handleDelete={eventId ? handleDelete : undefined}
        >
          <main className="grid grid-cols-8 gap-4">
            <Field
              name="name"
              initialValue={eventName}
              onBlurValidate={z
                .string()
                .min(1, "Enter a name")
                .max(50, "Enter a shorter name")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  label="Name"
                  className="col-span-5"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
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
                <Select
                  className="col-span-3"
                  label="In Person?"
                  defaultSelectedKeys={
                    value ? "YES" : eventInPerson !== undefined ? "NO" : ""
                  }
                  selectedKeys={getInPersonKey(value)}
                  onChange={(e) => {
                    e.target.value === "YES" ? setValue(true) : setValue(false);
                  }}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                >
                  <SelectItem key="YES">Yes</SelectItem>
                  <SelectItem key="NO">No</SelectItem>
                </Select>
              )}
            </Field>

            <Field
              name="description"
              initialValue={eventDescription}
              onBlurValidate={z
                .string()
                .min(1, "Enter a description")
                .max(500, "Description must be less than 500 characters")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Textarea
                  label="Description"
                  className="col-span-8"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  minRows={8}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="date"
              initialValue={eventStart}
              onBlurValidate={z.date({
                required_error: "Enter a date",
                invalid_type_error: "Enter a valid date",
              })}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <DatePicker
                  label="Date"
                  className="col-span-8"
                  value={dateToDateValue(value)}
                  onChange={(e) => {
                    console.log(e);
                    if (e) {
                      setValue(new Date(e.year, e.month - 1, e.day));
                    }
                  }}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="start"
              initialValue={eventStart}
              onBlurValidate={z.date({
                required_error: "Enter a time",
                invalid_type_error: "Enter a time",
              })}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <TimeInput
                  label="Start Time"
                  className="col-span-4"
                  value={dateToTimeValue(value)}
                  onChange={(e) => {
                    if (e) {
                      const newDate = new Date();
                      newDate.setHours(e.hour, e.minute, e.second);
                      setValue(newDate);
                    }
                  }}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="end"
              initialValue={eventEnd}
              onBlurValidate={z.date({
                required_error: "Enter a time",
                invalid_type_error: "Enter a time",
              })}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <TimeInput
                  label="End Time"
                  className="col-span-4"
                  value={dateToTimeValue(value)}
                  onChange={(e) => {
                    if (e) {
                      const newDate = new Date();
                      newDate.setHours(e.hour, e.minute, e.second);
                      setValue(newDate);
                    }
                  }}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="location"
              initialValue={eventLocation}
              onBlurValidate={z.string().min(1, "Enter a location")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  label="Location or Link"
                  className="col-span-8"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>
          </main>
        </EditController>
      )}
    </Form>
  );
};

export default EventEditor;
