import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ClubDashboardPage from "~/components/dashboardPage";
import ClubDashBoardSkeleton from "~/components/skeletons/clubDashboardSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const AdminClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  const {
    data: club,
    isLoading: isLoadingClub,
    isError: isErrorClub,
  } = api.clubRouter.getClubByIdForAdmin.useQuery(
    {
      clubId,
    },
    { enabled: !!clubId },
  );

  const {
    data: clubEvents,
    isLoading: isLoadingEvents,
    isError: isErrorEvents
  } = api.clubEventsRouter.getClubEventsByClubId.useQuery({
    clubId
  });

  const {
    data: clubContactInfos,
    isLoading: isLoadingContacts,
    isError: isErrorContacts
  } = api.clubContactInfoRouter.getClubContactInfosByClubId.useQuery({
    clubId
  });

  const {
    data: clubApplications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications
  } = api.clubApplicationRouter.getClubApplicationsByClubId.useQuery({
    clubId
  });

  const {
    data: clubSocialMedia,
    isLoading: isLoadingSocialMedia,
    isError: isErrorSocialMedia
  } = api.clubSocialMediaRouter.getClubSocialMediaByClubId.useQuery({
    clubId
  });

  if (isLoadingClub || isLoadingEvents || isLoadingContacts || isLoadingApplications || isLoadingSocialMedia) {
    return <ClubDashBoardSkeleton isAdminPage={true} />;
  } else if (isErrorClub || isErrorEvents || isErrorContacts || isErrorApplications || isErrorSocialMedia) {
    return <Error statusCode={500} />;
  } else {
    return (
      <ClubDashboardPage
        name={club.name}
        clubId={club.id}
        description={club.description}
        events={clubEvents}
        contactInfos={clubContactInfos}
        applications={clubApplications}
        socialMedias={clubSocialMedia} 
        members={[]}
        isAdminPage={true}       
      />
    );
  }
};

AdminClubDashboard.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  //TODO: add admin layout
  return <UserLayout>{page}</UserLayout>;
};

export default AdminClubDashboard;
