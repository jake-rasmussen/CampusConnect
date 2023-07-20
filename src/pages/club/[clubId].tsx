import "@prisma/client";

import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ClubDashboardPage from "~/components/dashboardPage";
import ClubDashBoardSkeleton from "~/components/skeletons/clubDashboardSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const ClubDashboard: NextPageWithLayout = () => {
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

  if (isLoading) {
    return <ClubDashBoardSkeleton />;
  } else if (isError || !club.clubProfile) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <ClubDashboardPage
        name={club.name}
        clubId={club.id}
        clubProfile={club.clubProfile}
        events={club.events}
        contactInfos={club.clubProfile.clubContactInfo}
        applications={club.clubApplications}
        socialMedias={club.clubSocialMedia}
      />
    );
  }
};

ClubDashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ClubDashboard;
