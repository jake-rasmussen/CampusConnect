import UserLayout from "~/layouts/userLayout";
import type { NextPageWithLayout } from "~/pages/_app";
import { Button } from "@nextui-org/react";
import CreateProfileEditor from "~/components/profile/createProfileEditor";
import { api } from "~/utils/api";
import LoadingPage from "~/components/loadingPage";
import Error from "next/error";
import ProfileDashboard from "~/components/profile/profileDashboard";

const Profile: NextPageWithLayout = () => {
  const {
    data: profile,
    isLoading,
    isError,
    error
  } = api.profileRouter.getUserProfile.useQuery();

  if (isLoading) {
    return <LoadingPage />
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else if (profile) {
    return <ProfileDashboard profile={profile}/>
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Profile
          </h1>
        </section>

        <div className="mx-auto flex flex-col justify-center items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none">
            You don't have a profile created!
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            Increase your discoverability by creating a profile. Once you have created a profile, projects will be able to see it and connect directly with you
          </p>
          <div className="flex flex-wrap gap-8 justify-center">
            <CreateProfileEditor />
            <Button>Learn more</Button>
          </div>
        </div>
      </div>
    );
  }

};

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
