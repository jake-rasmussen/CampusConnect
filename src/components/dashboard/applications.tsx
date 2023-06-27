import { type ClubApplication } from "@prisma/client";

import ApplicationCard from "./applicationCard";

type PropType = {
  applications: ClubApplication[];
  edit: boolean;
};

const Applications = (props: PropType) => {
  const { applications, edit } = props;

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h1 className="text-2xl font-semibold underline">Open Applications</h1>
        <div className="flex flex-wrap justify-center">
          {applications.map(
            (clubApplication: ClubApplication, index: number) => (
              <ApplicationCard
                clubApplication={clubApplication}
                key={`clubApplication${index}`}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Applications;
