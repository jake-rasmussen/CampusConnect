import { useRouter } from "next/router";

import UserLayout from "~/layouts/userLayout";

import type { JSXElementConstructor, ReactElement } from "react";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;

  return <div>{`Application ID: ${applicationId}`}</div>;
};

EditApplication.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>,
) => {
  //TODO: Replace with admin layout
  return <UserLayout>{page}</UserLayout>;
};

export default EditApplication;
