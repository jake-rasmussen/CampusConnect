import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ClubDashboardPage from "~/components/dashboardPage";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const AdminClubDashboard = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  //TODO: all the data fields should be fetched seperately as opposed to in one big query to allow for better caching/invalidate
  const {
    data: club,
    isLoading,
    isError,
    error,
  } = api.projectRouter.getProjectByIdForUsers.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <ClubDashboardPage
        name={club.name}
        projectId={club.id}
        description={club.description}
        events={club.events}
        contactInfos={club.contactInfo}
        applications={club.applications}
        socialMedias={club.socialMedia}
        members={club.members}
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
