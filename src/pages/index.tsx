import { SignInButton, useUser } from "@clerk/nextjs";

import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <section>
        <div>
          Welcome to
        </div>
        <h1>
          CampusConnect
        </h1>
      </section>
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return (
    <UserLayout className="min-h-screen bg-gradient-to-r from-[#FF9442] to-[#DC5F00]">
      {page}
    </UserLayout>
  );
};

export default Home;
