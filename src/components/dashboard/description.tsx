import { useState } from "react";

import { api } from "~/utils/api";
import DescriptionSkeleton from "../skeletons/descriptionSkeleton";
import { Textarea } from "../ui/textarea";
import EditButton from "./editButton";

type PropType = {
  id: string | undefined;
  description: string | undefined;
  edit: boolean;
};

const Description = (props: PropType) => {
  const { id, description, edit } = props;

  const [clubDescription, setClubDescription] = useState(
    description ? description : "",
  );

  const updateDescription =
    api.clubProfileRouter.updateClubProfileDescription.useMutation({});

  const handleUpdateDescription = () => {
    if (id !== undefined && description !== undefined) {
      updateDescription.mutate({
        id: id,
        description: clubDescription,
      });
    }
  };

  const descriptionTextarea = (
    <Textarea
      className="col-span-3"
      placeholder="Type your message here."
      onChange={(e) => setClubDescription(e.currentTarget.value)}
    />
  );

  return (
    <>
      <div className="relative max-w-6xl py-6 text-center md:px-6 md:py-0">
        <p className="flex flex-col justify-center space-y-2 p-4 px-8 text-center">
          {description}
        </p>
        {edit ? (
          <EditButton
            action={handleUpdateDescription}
            description={"Description"}
            fields={[["Description", descriptionTextarea]]}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Description;
