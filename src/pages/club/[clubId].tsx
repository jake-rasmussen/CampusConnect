import "@prisma/client";

import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ClubDashboardPage from "~/components/dashboardPage";
import ClubDashBoardSkeleton from "~/components/skeletons/clubDashboardSkeleton";
import { api } from "~/utils/api";

const ClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  const {
    data: club,
    isLoading,
    isError,
    error,
  } = api.clubRouter.getClubByIdForUsers.useQuery(
    {
      clubId,
    },
    { enabled: !!clubId },
  );

  if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <>
      {!isLoading && club !== undefined && club.clubProfile !== null ? (
        <ClubDashboardPage
          name={club.name}
          clubProfile={club.clubProfile}
          events={club.events}
          contactInfo={club.clubProfile?.clubContactInfo}
          applications={club.clubApplications}
        />
      ) : (
        <ClubDashBoardSkeleton />
      )}
    </>
  );
};

export default ClubDashboard;
