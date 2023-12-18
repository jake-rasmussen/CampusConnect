import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

import type { EventFormType } from "./eventForm";

type PropType = {
  projectId: string;
};

const EventsEditor = (props: PropType) => {
  const { projectId } = props;

  const [openDialog, setOpenDialog] = useState(false);

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

  const onSubmit = (values: EventFormType) => {
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
