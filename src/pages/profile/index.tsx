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
import PageWrapper from "~/components/pageWrapper";
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
      <PageWrapper title="My Profile">
        <div className="flex w-full flex-col items-center gap-8">
          <h1 className="text-2xl font-bold leading-none">
            You don't have a profile created!
          </h1>
          <p className="max-w-lg text-center text-lg">
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
                    <ModalHeader>Create a profile</ModalHeader>
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
      </PageWrapper>
    );
  }
};

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
