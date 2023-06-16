import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@mantine/core";

import { api } from "~/utils/api";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const { data, isLoading, error } = api.testRouter.protectedRoute.useQuery();

  if (!isLoaded || !isSignedIn) {
    return (
      <>
        {JSON.stringify(error)}
        <SignInButton mode="modal"> Sign In</SignInButton>
      </>
    );
  }
  return (
    <>
      {user.firstName}
      {data?.secret}
      <Button>
        <SignOutButton />
      </Button>
    </>
  );
};

export default Home;
