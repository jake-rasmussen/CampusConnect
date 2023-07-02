import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import EventForm from "./eventForm";

type PropType = {
  clubId: string;
};

const EventAddEditor = (props: PropType) => {
  const { clubId } = props;

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

  const handleSubmit = (values: Record<string, any>) => {
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
    <EditController dialogDescription="Create an event" editType="create">
      <EventForm
        eventName={undefined}
        eventDescription={undefined}
        eventLocation={undefined}
        eventInPerson={undefined}
        eventDate={undefined}
        eventId={undefined}
        handleUpdate={handleSubmit}
      />
    </EditController>
  );
};

export default EventAddEditor;
