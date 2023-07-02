import React from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

type PropType = {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventInPerson: boolean;
  eventDate: Date;
  eventId: string;
};

const EventUpdateEditor = (props: PropType) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventInPerson,
    eventDate,
    eventId,
  } = props;

  const queryClient = api.useContext();

  const updateEvent = api.clubEventsRouter.updateClubEventById.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated the Club Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const deleteEvent = api.clubEventsRouter.deleteClubEventById.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Deleted the Club Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  })

  const handleUpdate = (values: Record<string, any>) => {
    values.date.setHours(values.time.getHours());
    values.date.setMinutes(values.time.getMinutes());
    updateEvent.mutate({
      id: eventId,
      name: values.name,
      description: values.description,
      date: values.date,
      inPerson: values.inPerson,
      location: values.location,
    });
  };

  const handleDelete = () => {
    deleteEvent.mutate({
      id: eventId
    })
  };

  return (
    <EditController
      dialogDescription={`Edit the event, ${eventName}`}
      editType={"update"}
    >
      <EventForm
        eventName={eventName}
        eventDescription={eventDescription}
        eventLocation={eventLocation}
        eventInPerson={eventInPerson}
        eventDate={eventDate}
        eventId={eventId}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default EventUpdateEditor;
