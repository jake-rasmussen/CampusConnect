import { Pagination } from "@heroui/react"; // Import NextUI Pagination component
import { Profile, User } from "@prisma/client";
import Error from "next/error";
import React, { useState } from "react";

import LoadingSection from "~/components/loadingSection";
import PageWrapper from "~/components/pageWrapper";
import ProfileCard from "~/components/profile/profileCard";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const ProfilePage: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const limit = 9; // Profiles per page

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
    <PageWrapper title="Discover">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <div className="mt-20 mx-20 flex max-w-7xl flex-col items-center justify-center gap-y-20">
          {profileData.totalProfiles > 0 ? (
            <>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-24">
                {profileData.profiles.map(
                  (profile: Profile & { user: User }) => (
                    <ProfileCard key={profile.id} profile={profile} />
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
                No profiles found. Please check back at a later date.
              </p>
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

ProfilePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ProfilePage;
