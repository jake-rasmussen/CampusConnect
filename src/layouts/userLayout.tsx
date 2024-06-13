import { type ReactElement } from "react";

import Navbar from "~/components/navbar";

type Layout = ({
  children,
  className,
}: {
  children: ReactElement;
  className?: string;
}) => ReactElement;

const UserLayout: Layout = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};

export default UserLayout;
