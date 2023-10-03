import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

import type { EventFormType } from "./eventForm";

type PropType = {
  clubId: string;
};

const EventsEditor = (props: PropType) => {
  const { clubId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const createEvent = api.clubEventsRouter.createClubEvent.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Created the Club Event!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const onSubmit = (values: EventFormType) => {
    values.date.setHours(values.time.getHours());
    values.date.setMinutes(values.time.getMinutes());

    createEvent.mutate({
      clubId: clubId,
      name: values.name,
      date: values.date,
      description: values.description,
      inPerson: values.inPerson,
      location: values.location,
    });
  };

  return (
    <EditController
      dialogDescription="Create an event"
      createDescription="Create new event"
      editType="create"
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <EventForm onSubmit={onSubmit} setOpenDialog={setOpenDialog} />
    </EditController>
  );
};

export default EventsEditor;
