import React, { useState } from "react";
import UserLayout from "~/layouts/userLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import LoadingPage from "~/components/loadingPage";
import Error from "next/error";
import ProfileCard from "~/components/profile/profileCard";
import { Profile, User } from "@prisma/client";
import { Pagination } from "@nextui-org/react"; // Import NextUI Pagination component
import LoadingSection from "~/components/loadingSection";

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
    <div className="flex h-full w-full flex-col items-center justify-center mb-20">
      <section className="mb-14 mt-28">
        <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
          Connect
        </h1>
      </section>

      {
        isLoading ? <LoadingSection /> : <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-20 max-w-7xl my-20">
          {profileData.profiles.map((profile: Profile & { user: User }) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}

          <Pagination
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      }


    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ProfilePage;