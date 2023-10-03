import { useRouter } from "next/router";

const ViewApplicantsForApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;

  return <div>ViewApplicants for {`${applicationId}`}</div>;
};

export default ViewApplicantsForApplication;
