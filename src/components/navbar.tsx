import { UserButton, useUser } from "@clerk/nextjs";
import { UserType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

import { api } from "~/utils/api";
import { HoveredLink, Menu, MenuItem } from "./aceternity-ui/navbar-menu";

type PropType = {
  setIsLoadingNavbar: Dispatch<SetStateAction<boolean>>;
}

const Navbar = (props: PropType) => {
  const {
    setIsLoadingNavbar
  } = props;
    
  const { user, isSignedIn } = useUser();

  const { data: userData, isLoading: userLoading } = api.usersRouter.getUserType.useQuery(
    { externalId: user?.id || "" },
    { enabled: !!user }
  );

  useEffect(() => {
    if (!userLoading) {
      setIsLoadingNavbar(false);
    }
  }, [userLoading]);

  const [active, setActive] = useState<string | null>(null);

  let menu: JSX.Element = <></>;

  if (userData?.userType === UserType.EMPLOYEE) {
    menu = (
      <Menu setActive={setActive}>
        <Link href="/" className="absolute left-0 h-10 w-10 translate-x-1/2 transform">
          <Image priority src={"/assets/SWEC Logo.svg"} alt={"SWEC Logo"} width="0" height="0" sizes="100vw" className="h-auto w-full" />
        </Link>

        <div className="relative flex items-center justify-between gap-4">
          <Link href="/project" onMouseEnter={() => setActive("All Startups")}>All Startups</Link>

          <MenuItem setActive={setActive} active={active} item="Applications">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/open-applications">Open Applications</HoveredLink>
              <HoveredLink href="/my-applications">My Applications</HoveredLink>
            </div>
          </MenuItem>

          <Link href="/profile" onMouseEnter={() => setActive("My Profile")}>My Profile</Link>
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    );
  } else if (userData?.userType === UserType.EMPLOYER) {
    menu = (
      <Menu setActive={setActive}>
        <Link href="/" className="absolute left-0 h-10 w-10 translate-x-1/2 transform">
          <Image priority src={"/assets/SWEC Logo.svg"} alt={"SWEC Logo"} width="0" height="0" sizes="100vw" className="h-auto w-full" />
        </Link>

        <div className="relative flex items-center justify-between gap-4">
          <Link href="/my-startups" onMouseEnter={() => setActive("My Startups")}>My Startups</Link>
          <Link href="/profile/discover" onMouseEnter={() => setActive("Discover")}>Discover</Link>
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    );
  }

  return (
    <>
      {isSignedIn && (
        <div className="relative flex w-full items-center justify-center">
          <div className="fixed inset-x-0 top-10 top-2 z-50 mx-auto max-w-2xl rounded-full shadow-xl">
            {menu}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
