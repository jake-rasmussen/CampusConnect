import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

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
      <p className="bg-black p-5 text-xl">Hello {user.firstName}</p>
      <div className="h-5 w-5 bg-black p-10">test</div>
      <SignOutButton />
    </>
  );
};

export default Home;
