import { useRouter } from "next/router";

import { api } from "~/utils/api";

const ClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  const {
    data: club,
    isLoading,
    isError,
  } = api.clubRouter.getClubById.useQuery({
    clubId,
  });

  if (isLoading || isError) {
    return <>Loading...</>;
  }

  return <></>;
};

export default ClubDashboard;
