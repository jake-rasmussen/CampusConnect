import { UserButton, useUser } from "@clerk/nextjs";
import { UserType } from "@prisma/client";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { api } from "~/utils/api";
import { HoveredLink, Menu, MenuItem } from "./aceternity-ui/navbar-menu";

type PropType = {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
};

const Navbar = (props: PropType) => {
  const { setIsLoading } = props;

  const router = useRouter();
  const { user } = useUser();

  const { data: userData, isLoading } = api.usersRouter.getUserType.useQuery(
    { externalId: user?.id || "" },
    { enabled: !!user },
  );

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
      if (
        userData?.userType === UserType.INCOMPLETE &&
        router.pathname !== "/get-started" &&
        router.pathname !== "/"
      ) {
        router.push("/get-started");
      }
    }
  }, [userData, router, isLoading]);

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);

  let menu: JSX.Element = <></>;

  if (userData?.userType === UserType.EMPLOYEE) {
    menu = (
      <Menu setActive={setActive}>
        <Link
          href="/"
          className="absolute left-0 h-10 w-10 translate-x-1/2 transform"
        >
          <Image
            priority
            src={"/assets/SWEC Logo.svg"}
            alt={"SWEC Logo"}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>

        <div className="relative flex items-center justify-between gap-4">
          <Link href="/project">
            All Projects
          </Link>

          <MenuItem setActive={setActive} active={active} item="Applications">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/open-applications">
                Open Applications
              </HoveredLink>
              <HoveredLink href="/my-applications">My Applications</HoveredLink>
            </div>
          </MenuItem>

          <Link href="/profile">
            My Profile
          </Link>
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    );
  } else if (userData?.userType === UserType.EMPLOYER) {
    menu = (
      <Menu setActive={setActive}>
        <Link
          href="/"
          className="absolute left-0 h-10 w-10 translate-x-1/2 transform"
        >
          <Image
            priority
            src={"/assets/SWEC Logo.svg"}
            alt={"SWEC Logo"}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>

        <div className="relative flex items-center justify-between gap-4">
          <Link href="/my-projects">
            My Projects
          </Link>
          <Link href="/profile/connect">
            Connect
            <span className="font-bold text-secondary my-0">+</span>
          </Link>
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    );
  }

  return (
    <>
      <div className="relative flex w-full items-center justify-center">
        <div
          className="fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl rounded-full shadow-xl top-2"
        >
          {menu}
        </div>
      </div>
    </>
  );
};

export default Navbar;
