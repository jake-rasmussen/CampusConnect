import { SignInButton, useUser } from "@clerk/nextjs";
import router from "next/router";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <p>Hello World!</p>
        <SignInButton mode="modal"> Sign In</SignInButton>
      </>
    );
  } else {
    void router.push("/club");
  }
};

export default Home;
