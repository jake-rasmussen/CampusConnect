import { useRouter } from "next/router";

import ApplicationEditor from "~/components/dashboard/applications/editor/applicationEditor";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import Error from "next/error";

import type { JSXElementConstructor, ReactElement } from "react";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;

  const {
    data: application,
    isLoading,
    isError,
    error
  } = api.clubApplicationRouter.getClubApplicationById.useQuery(
    {
      applicationId,
    },
    { enabled: !!applicationId },
  );

  if (isLoading) {
    return <EditApplicationSkeleton />; // TODO: change this to skeleton
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <>
        <HeaderOutline>
          <h2 className="font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
            Application Editor
          </h2>
        </HeaderOutline>

        <main className="py-10">
          <div className="mx-20">
            <ApplicationEditor
              name={application.name}
              description={application.description}
              questions={application.questions}
              applicationId={applicationId}
              onSubmit={() => console.log("Submit!")}
            />
          </div>
        </main>
      </>
    );
  }
};

EditApplication.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>,
) => {
  //TODO: Replace with admin layout
  return <UserLayout>{page}</UserLayout>;
};

export default EditApplication;
