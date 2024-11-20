import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Error from "next/error";

import LoadingPage from "~/components/loadingPage";
import CreateProjectEditor from "~/components/my-projects/createProjectEditor";
import CreateProfileEditor from "~/components/profile/createProfileEditor";
import ProfileDashboard from "~/components/profile/profileDashboard";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const Profile: NextPageWithLayout = () => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = api.profileRouter.getUserProfile.useQuery();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else if (profile) {
    return <ProfileDashboard profile={profile} />;
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Profile
          </h1>
        </section>

        <div className="mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none">
            You don't have a profile created!
          </h1>
          <p className="mb-12 mt-8 px-8 text-lg">
            Increase your discoverability by creating a profile. Once you have
            created a profile, startups will be able to see it and connect
            directly with you
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <CreateProfileEditor />
            <Button onPress={onOpen}>Learn more</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Create a profile
                    </ModalHeader>
                    <ModalBody>
                      Once you've created a profile, startups will be able to
                      search you, and be able to contact you directly. You can
                      still apply without having a profile, but having a profile
                      boosts discoverability from startups!
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <CreateProfileEditor />
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
