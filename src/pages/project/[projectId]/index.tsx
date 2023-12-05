import "@prisma/client";

import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ProjectDashboard from "~/components/dashboardPage";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const ProjectDashboardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const {
    data: project,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    error: errorProjects,
  } = api.projectRouter.getProjectByIdForUsers.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
    error: errorApplications,
  } = api.applicationRouter.getProjectApplicationsByProjectIdForUsers.useQuery(
    {
      projectId
    },
    { enabled: !!projectId },
  );

  if (isLoadingProjects || isLoadingApplications) {
    return <LoadingPage />;
  } else if (isErrorProjects || isErrorApplications) {
    return <Error statusCode={errorProjects?.data?.httpStatus || errorApplications?.data?.httpStatus || 500} />;
  } else {
    return (
      <ProjectDashboard
        name={project.name}
        projectId={project.id}
        description={project.description}
        events={project.events}
        contactInfos={project.contactInfo}
        applications={applications}
        socialMedias={project.socialMedia}
        members={project.members}
        isAdminPage={false}
      />
    );
  }
};

ProjectDashboardPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ProjectDashboardPage;
