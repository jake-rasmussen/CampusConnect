import React, { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

import type { EventFormType } from "./eventForm";

type PropType = {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventInPerson: boolean;
  eventStart: Date;
  eventEnd: Date;
  eventId: string;
  projectId: string;
};

const EventCardEditor = (props: PropType) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventStart,
    eventEnd,
    eventId,
    projectId,
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
    toast.dismiss();
    toast.loading("Saving Event...");

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
  };

  const handleDelete = () => {
    deleteEvent.mutate({
      id: eventId,
      projectId,
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
        eventStart={eventStart}
        eventEnd={eventEnd}
        eventId={eventId}
        setOpenDialog={setOpenDialog}
        onSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default EventCardEditor;
