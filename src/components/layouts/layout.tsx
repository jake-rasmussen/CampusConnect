import { type ReactElement } from "react";

import Navbar from "~/components/navbar";

type Layout = ({ children }: { children: ReactElement }) => ReactElement;

const MainLayout: Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
