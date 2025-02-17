import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { UserType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { api } from "~/utils/api";
import { HoveredLink, Menu, MenuItem } from "./aceternity-ui/navbar-menu";
import { Menu2 } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

type PropType = {
  setIsLoadingNavbar: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setIsLoadingNavbar }: PropType) => {
  const { user, isSignedIn, isLoaded: clerkLoaded } = useUser();
  const {
    data: userData,
    isLoading,
    refetch,
  } = api.usersRouter.getUserType.useQuery(
    { externalId: user?.id || "" },
    { enabled: !!user },
  );

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isLoading || (clerkLoaded && !user)) {
      setIsLoadingNavbar(false);
    }
  }, [clerkLoaded, isLoading]); // Remove dependency on `isLoading` to prevent lag

  useEffect(() => {
    refetch();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Use dropdown if screen width < 768px
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [active, setActive] = useState<string | null>(null);

  let menu: JSX.Element = <></>;

  if (userData?.userType === UserType.EMPLOYEE) {
    menu = (
      <Menu setActive={setActive}>
        <Link
          href="/"
          className={twMerge("absolute left-0 h-10 w-10 translate-x-1/2 transform", isMobile && "left-1/2 -translate-x-1/2")}
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

        <div className="h-8 flex items-center justify-between gap-4">
          {
            isMobile ? (
              <div className="absolute left-0 h-10 w-10 translate-x-1/2 transform">
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly><Menu2 /></Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Mobile Menu">
                    <DropdownItem key="startups" href="/startups">
                      <span className="block w-full">All Startups</span>
                    </DropdownItem>
                    <DropdownItem key="open-applications" href="/open-applications">
                      <span className="block w-full">Open Applications</span>
                    </DropdownItem>
                    <DropdownItem key="my-applications" href="/my-applications">
                      <span className="block w-full">My Applications</span>
                    </DropdownItem>
                    <DropdownItem key="profile" href="/profile">
                      <span className="block w-full">My Profile</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link href="/startups" onMouseEnter={() => setActive("All Startups")}>
                  All Startups
                </Link>

                <MenuItem setActive={setActive} active={active} item="Applications">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/open-applications">
                      Open Applications
                    </HoveredLink>
                    <HoveredLink href="/my-applications">My Applications</HoveredLink>
                  </div>
                </MenuItem>

                <Link href="/profile" onMouseEnter={() => setActive("My Profile")}>
                  My Profile
                </Link>
              </>
            )
          }
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu >
    );
  } else if (userData?.userType === UserType.EMPLOYER) {
    menu = (
      <Menu setActive={setActive}>
        <Link
          href="/"
          className={twMerge("absolute left-0 h-10 w-10 translate-x-1/2 transform", isMobile && "left-1/2 -translate-x-1/2")}
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

        <div className="h-8 flex items-center justify-between gap-4">
          {
            isMobile ? (
              <div className="absolute left-0 h-10 w-10 translate-x-1/2 transform">
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly><Menu2 /></Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Mobile Menu">
                    <DropdownItem key="startups" href="/startups">
                      <span className="block w-full">All Startups</span>
                    </DropdownItem>
                    <DropdownItem key="my-startups" href="/my-startups">
                      <span className="block w-full">My Startups</span>
                    </DropdownItem>
                    <DropdownItem key="discover" href="/profile/discover">
                      <span className="block w-full">Discover</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link href="/startups" onMouseEnter={() => setActive("All Startups")}>
                  All Startups
                </Link>

                <Link
                  href="/my-startups"
                  onMouseEnter={() => setActive("My Startups")}
                >
                  My Startups
                </Link>
                <Link
                  href="/profile/discover"
                  onMouseEnter={() => setActive("Discover")}
                >
                  Discover
                </Link>
              </>
            )
          }
        </div>

        <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    );
  } else if (userData?.userType === UserType.SCHOOL_ADMIN) {
    menu = (
      <Menu setActive={setActive}>
        <Link
          href="/"
          className={twMerge("absolute left-0 h-10 w-10 translate-x-1/2 transform", isMobile && "left-1/2 -translate-x-1/2")}
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

        <div className="h-8 flex items-center justify-between gap-4">
          {
            isMobile ? (
              <div className="absolute left-0 h-10 w-10 translate-x-1/2 transform">
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly><Menu2 /></Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Mobile Menu">
                    <DropdownItem key="startups" href="/startups">
                      <span className="block w-full">All Startups</span>
                    </DropdownItem>
                    <DropdownItem key="project-forms" href="/school-admin/create-project">
                      <span className="block w-full">Project Forms</span>
                    </DropdownItem>
                    <DropdownItem key="data" href="/school-admin/data">
                      <span className="block w-full">View Data</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link href="/startups" onMouseEnter={() => setActive("All Startups")}>
                  All Startups
                </Link>

                <Link
                  href="/school-admin/create-project"
                >
                  Project Forms
                </Link>
                <Link
                  href="/school-admin/data"
                >
                  View Data
                </Link>
              </>
            )
          }
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
          <div className="fixed inset-x-0 top-10 top-2 z-50 max-w-2xl rounded-full shadow-xl mx-auto px-4 w-fit">
            {menu}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
