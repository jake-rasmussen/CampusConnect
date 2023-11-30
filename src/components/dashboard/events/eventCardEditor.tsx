import React, { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

import type { EventFormType } from "./eventForm";
import { Input } from "~/components/shadcn_ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/shadcn_ui/popover";
import { Button } from "~/components/shadcn_ui/button";

type PropType = {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventInPerson: boolean;
  eventDate: Date;
  eventId: string;
  projectId: string;
};

const EventCardEditor = (props: PropType) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventDate,
    eventId,
    projectId
  } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

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
      setOpenDialog(false);
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const handleUpdate = (values: EventFormType) => {
    values.date.setHours(values.time.getHours());
    values.date.setMinutes(values.time.getMinutes());
    updateEvent.mutate({
      id: eventId,
      name: values.name,
      description: values.description,
      date: values.date,
      inPerson: values.inPerson,
      location: values.location,
      projectId
    });
  };

  const handleDelete = () => {
    deleteEvent.mutate({
      id: eventId,
      projectId
    });
  };

  return (
    <EditController
      dialogDescription={`Edit the event, ${eventName}`}
      editType={"update"}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <EventForm
        eventName={eventName}
        eventDescription={eventDescription}
        eventLocation={eventLocation}
        eventInPerson={eventInPerson}
        eventDate={eventDate}
        eventId={eventId}
        setOpenDialog={setOpenDialog}
        onSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default EventCardEditor;
