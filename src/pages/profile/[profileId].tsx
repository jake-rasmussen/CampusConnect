import { Button, useDisclosure } from "@nextui-org/react";
import Error from "next/error";
import { useRouter } from "next/router";

import LoadingPage from "~/components/loadingPage";
import ProfileDashboard from "~/components/profile/profileDashboard";
import ProfileEditor from "~/components/profile/profileEditor";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const profileId = router.query.profileId as string;

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = api.profileRouter.getProfileById.useQuery({
    id: profileId,
  });

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else if (!profile) {
    return <Error statusCode={404} />;
  } else {
    return <ProfileDashboard profile={profile} />;
  }
};

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
