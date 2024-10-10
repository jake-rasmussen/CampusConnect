import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./aceternity-ui/navbar-menu";
import { cn } from "lib/utils";

type PropType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const Navbar = (props: PropType) => {
  const { isLoading, setIsLoading } = props;

  useEffect(() => setIsLoading(false));

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const menu = (
    <>
      <Link
        href="/project"
        className="flex items-center p-2"
        onClick={() => setMenuIsOpen(false)}
      >
        <h1 className="tracking-none text-2xl font-black uppercase transition duration-300 ease-in-out hover:text-secondary lg:text-lg">
          All Projects
        </h1>
      </Link>
      <Link
        href="/open-applications"
        className="flex items-center p-2"
        onClick={() => setMenuIsOpen(false)}
      >
        <h1 className="tracking-none text-2xl font-black uppercase transition duration-300 ease-in-out hover:text-secondary lg:text-lg">
          Open Applications
        </h1>
      </Link>
      <Link
        href="/my-applications"
        className="flex items-center p-2"
        onClick={() => setMenuIsOpen(false)}
      >
        <h1 className="tracking-none text-2xl font-black uppercase transition duration-300 ease-in-out hover:text-secondary lg:text-lg">
          My Applications
        </h1>
      </Link>
      <Link
        href="/my-projects"
        className="flex items-center p-2"
        onClick={() => setMenuIsOpen(false)}
      >
        <h1 className="tracking-none text-2xl font-black uppercase transition duration-300 ease-in-out hover:text-secondary lg:text-lg">
          My Projects
        </h1>
      </Link>
    </>
  );

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <div className="relative w-full flex items-center justify-center">
          <AceternityNavbar className="top-2" />
        </div>
      </>
    );
  }
};

function AceternityNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 shadow-xl rounded-full", className)}
    >
      <Menu setActive={setActive}>
        <Link
          href="/"
          className="absolute left-0 transform translate-x-1/2 h-10 w-10"
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
          <MenuItem setActive={setActive} active={active} item="Projects">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/project">All Projects</HoveredLink>
              <HoveredLink href="/my-projects">My Projects</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Applications">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/open-applications">Open Applications</HoveredLink>
              <HoveredLink href="/my-applications">My Applications</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/profile">My Profile</HoveredLink>
              <HoveredLink href="/my-applications">
                Connect<span className="font-bold text-secondary text-lg">+</span>
              </HoveredLink>
            </div>
          </MenuItem>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
