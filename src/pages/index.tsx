import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@mantine/core";

import { api } from "~/utils/api";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();


  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <p>Hello World!</p>
        <SignInButton mode="modal"> Sign In</SignInButton>
      </>
    );
  }
  return (
    <>
      <p>Hello {user.firstName}</p>
    
      <Button>
        <SignOutButton />
      </Button>
    </>
  );
};

export default Home;
