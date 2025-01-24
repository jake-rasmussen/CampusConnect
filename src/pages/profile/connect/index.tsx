import { Pagination } from "@nextui-org/react"; // Import NextUI Pagination component
import { Profile, User } from "@prisma/client";
import Error from "next/error";
import React, { useState } from "react";

import LoadingPage from "~/components/loadingPage";
import LoadingSection from "~/components/loadingSection";
import ProfileCard from "~/components/profile/profileCard";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";
import PageWrapper from "~/components/pageWrapper";
import { UserOff } from "tabler-icons-react";

const ProfilePage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const limit = 6; // Profiles per page

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = api.profileRouter.getProfiles.useQuery({ page, limit });

  if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  }

  const totalProfiles = profileData?.totalProfiles || 0;
  const totalPages = Math.ceil(totalProfiles / limit);

  return (
    <PageWrapper title="Connect">
      <div className="flex w-full flex-col items-center gap-8">
        {isLoading ? (
          <LoadingSection />
        ) : (
          <div className="mt-20">
            {profileData.totalProfiles > 0 ? (
              <div className="flex flex-col gap-8  items-center">
                <div className="flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-24">
                  {profileData.profiles.map((profile: Profile & { user: User }) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>

                <Pagination
                  total={totalPages}
                  initialPage={1}
                  page={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            ) : (
              <div className="flex max-w-2xl flex-col items-center justify-center gap-y-2 text-center">
                <UserOff className="h-40 w-40 text-secondary" />
                <h1 className="text-2xl font-bold leading-none">
                  No profiles found.
                </h1>
                <p className="max-w-xl text-gray">
                  Please check back at a later date!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

ProfilePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ProfilePage;
