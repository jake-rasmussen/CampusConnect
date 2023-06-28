import { type ClubApplication } from "@prisma/client";

import ApplicationCard from "./applicationCard";
import ApplicationEditor from "./applicationEditor";
import ApplicationsOutline from "./applicationsOutline";

type PropType = {
  applications: ClubApplication[];
  clubId: string;
  edit: boolean;
};

const Applications = (props: PropType) => {
  const { applications, clubId, edit } = props;

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
