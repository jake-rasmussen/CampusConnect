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
import ProfileEditor from "~/components/profile/profileEditor";
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
        <>
          <h1 className="text-center text-2xl font-bold leading-none">
            You do not have a profile created!
          </h1>
          <p className="max-w-lg text-center text-lg">
            Increase your discoverability by creating a profile. Once you have
            created a profile, startups will be able to see it and connect
            directly with you
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <ProfileEditor editType="create" />
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
                      <ProfileEditor editType="create" />
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </>
      </PageWrapper>
    );
  }
};

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Profile;
