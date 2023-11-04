import { useRouter } from "next/router";

const ViewApplicantsForApplication = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  return <div>ViewApplicants for {`${projectId}`}</div>;
};

export default ViewApplicantsForApplication;
