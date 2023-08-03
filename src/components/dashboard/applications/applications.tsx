import { type ClubApplication } from "@prisma/client";

import ApplicationCard from "./applicationCard";
import ApplicationsOutline from "./applicationsOutline";

type PropType = {
  applications: ClubApplication[];
  clubId: string;
  editable: boolean;
};

const Applications = (props: PropType) => {
  const { applications, clubId, editable: edit } = props;

  return (
    <>
      <ApplicationsOutline>
        {applications.map((clubApplication: ClubApplication, index: number) => (
          <ApplicationCard
            clubApplication={clubApplication}
            clubId={clubId}
            edit={edit}
            key={`clubApplication${index}`}
          />
        ))}
      </ApplicationsOutline>
    </>
  );
};

export default Applications;
