import "@prisma/client";

import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ClubDashboardPage from "~/components/clubDashboardPage";
import { api } from "~/utils/api";

import type {
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
} from "@prisma/client";

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
      <ClubDashboardPage isLoading={isLoading} club={club} />
    </>
  );
};

export default ClubDashboard;
