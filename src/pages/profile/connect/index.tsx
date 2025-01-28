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
    <div className="mb-20 flex h-full w-full flex-col items-center justify-center">
      <section className="mb-14 mt-40">
        <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
          Connect
        </h1>
      </section>

      {isLoading ? (
        <LoadingSection />
      ) : (
        <div className="flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-20">
          {profileData.totalProfiles > 0 ? (
            <>
              {profileData.profiles.map((profile: Profile & { user: User }) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}

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
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ProfilePage;
