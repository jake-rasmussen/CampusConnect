import { useRouter } from "next/router";

const ViewApplicantsForApplication = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  return <div>ViewApplicants for {`${clubId}`}</div>;
};

export default ViewApplicantsForApplication;
