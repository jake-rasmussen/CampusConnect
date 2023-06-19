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
      <p className="text-xl p-5 bg-black">Hello {user.firstName}</p>
      <div className="h-5 bg-black p-10 w-5">test</div>
      <SignOutButton />
    </>
  );
};

export default Home;
