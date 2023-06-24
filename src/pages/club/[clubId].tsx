import "@prisma/client";

import { useRouter } from "next/router";
import React from "react";

import ApplicationCard from "~/components/applicationCard";
import ContactCard from "~/components/contactCard";
import EventCard from "~/components/eventCard";
import Tab from "~/components/tab/tab";
import TabContent from "~/components/tab/tabContent";
import TabHeader from "~/components/tab/tabHeader";
import TabList from "~/components/tab/tabList";
import { api } from "~/utils/api";

import type {
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
} from "@prisma/client";
import ClubDashboardPage from "~/components/clubDashboardPage";

const ClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  const {
    data: club,
    isLoading: isLoadingClub,
    isError: isErrorClub,
  } = api.clubRouter.getClubByIdForUsers.useQuery(
    {
      clubId,
    },
    { enabled: !!clubId },
  );

  if (isLoadingClub || isErrorClub) {
    return <>Loading...</>;
  }

  return (
    <>
      <ClubDashboardPage club={club} />
    </>
  );
};

export default ClubDashboard;