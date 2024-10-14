import UserLayout from "~/layouts/userLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateProfileEditor from "~/components/profile/createProfileEditor";
import { api } from "~/utils/api";
import LoadingPage from "~/components/loadingPage";
import Error from "next/error";
import ProfileDashboard from "~/components/profile/profileDashboard";
import { useRouter } from "next/router";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const profileId = router.query.profileId as string;

  const {
    data: profile,
    isLoading,
    isError,
    error
  } = api.profileRouter.getProfileById.useQuery({
    id: profileId
  });

  if (isLoading) {
    return <LoadingPage />
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else if (!profile) {
    return <Error statusCode={404} />;
  } else {
    return <ProfileDashboard profile={profile} />
  }
};

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
