import { type ClubApplication } from "@prisma/client";

import ApplicationCard from "./applicationCard";
import ApplicationCreator from "./applicationCreator";
import ApplicationsOutline from "./applicationsOutline";

type PropType = {
  applications: ClubApplication[];
  clubId: string;
  editable: boolean;
};

const Applications = (props: PropType) => {
  const { applications, clubId, editable } = props;

  return (
    <section className="flex flex-col items-center gap-y-8">
      <ApplicationsOutline>
        <>
          {applications.map(
            (clubApplication: ClubApplication, index: number) => (
              <ApplicationCard
                clubApplication={clubApplication}
                clubId={clubId}
                editable={editable}
                key={`clubApplication${index}`}
              />
            ),
          )}
        </>
      </ApplicationsOutline>
      {editable && <ApplicationCreator clubId={clubId} />}
    </section>
  );
};

export default Applications;
