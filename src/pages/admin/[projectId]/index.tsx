import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import DashboardPage from "~/components/dashboardPage";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const AdminDashboard = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  //TODO: all the data fields should be fetched seperately as opposed to in one big query to allow for better caching/invalidate
  const {
    data: project,
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
      <DashboardPage
        name={project.name}
        projectId={project.id}
        description={project.description}
        events={project.events}
        contactInfos={project.contactInfo}
        applications={project.applications}
        socialMedias={project.socialMedia}
        members={project.members}
        isAdminPage={true}
      />
    );
  }
};

AdminDashboard.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  //TODO: add admin layout
  return <UserLayout>{page}</UserLayout>;
};

export default AdminDashboard;
