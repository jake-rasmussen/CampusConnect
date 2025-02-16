import { Pagination } from "@heroui/react";
import { Profile, Project, ProjectCreationForm, User } from "@prisma/client";
import Error from "next/error";
import { useState } from "react";

import LoadingSection from "~/components/loadingSection";
import PageWrapper from "~/components/pageWrapper";
import ProfileCard from "~/components/profile/profileCard";
import CreateProjectCard from "~/components/school-admin/createProjectCard";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../_app";

const CreateProject: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const limit = 9; // Profiles per page

  const {
    data: projectCreationForms,
    isLoading,
    isError,
    error,
  } = api.projectRouter.getAllProjectCreationForms.useQuery();

  if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  }

  const totalForms = projectCreationForms?.length || 0;
  const totalPages = Math.ceil(totalForms / limit);

  return (
    <PageWrapper title="Create Project">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <div className="flex max-w-7xl flex-col items-center justify-center gap-y-20">
          {totalForms > 0 ? (
            <>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-20">
                {projectCreationForms.map(
                  (form: ProjectCreationForm & { user: User }) => (
                    <CreateProjectCard
                      key={form.id}
                      projectCreationForm={form}
                    />
                  ),
                )}
              </div>

              <Pagination
                total={totalPages}
                initialPage={1}
                page={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </>
          ) : (
            <>
              <p className="px-8 text-lg">
                No project creation forms found. Please check back at a later
                date.
              </p>
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

CreateProject.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default CreateProject;
