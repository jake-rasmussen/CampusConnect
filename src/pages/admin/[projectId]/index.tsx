import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";

import ProjectDashboard from "~/components/dashboard/dashboardPage";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const AdminDashboardPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isErrorProject,
  } = api.projectRouter.getProjectByIdForAdmin.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: events,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
  } = api.eventRouter.getEventsByProjectId.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: contactInfos,
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
  } = api.contactInfoRouter.getContactInfosByProjectId.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = api.applicationRouter.getProjectApplicationsByProjectIdForAdmin.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: socialMedia,
    isLoading: isLoadingSocialMedia,
    isError: isErrorSocialMedia,
  } = api.socialMediaRouter.getSocialMediaByProjectId.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: members,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = api.memberRouter.getAllMembersByProjectId.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  const {
    data: colors,
    isLoading: isLoadingColors,
    isError: isErrorColors,
  } = api.colorsRouter.getColorsByProjectId.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  if (
    isLoadingProject ||
    isLoadingEvents ||
    isLoadingContacts ||
    isLoadingApplications ||
    isLoadingSocialMedia ||
    isLoadingMembers ||
    isLoadingColors
  ) {
    return <LoadingPage />;
  } else if (
    isErrorProject ||
    isErrorEvents ||
    isErrorContacts ||
    isErrorApplications ||
    isErrorSocialMedia ||
    isErrorMembers ||
    isErrorColors
  ) {
    return <Error statusCode={500} />;
  } else {
    return (
      <ProjectDashboard
        name={project.name}
        projectId={project.id}
        description={project.description}
        events={events}
        contactInfos={contactInfos}
        applications={applications}
        socialMedias={socialMedia}
        members={members}
        colors={colors}
        isAdminPage={true}
      />
    );
  }
};

AdminDashboardPage.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AdminDashboardPage;
