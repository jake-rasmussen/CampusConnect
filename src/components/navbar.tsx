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



        {/* <header className="sticky top-0 z-50 w-full bg-white p-4 text-black shadow-xl">
          <div className="mx-auto flex h-16 items-center">
            <Link
              href="/"
              className="mx-4 h-10 w-10 lg:h-16 lg:w-16 relative"
              onClick={() => setMenuIsOpen(false)}
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
              <Badge className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white">Beta</Badge>
            </Link>
            <ul className="hidden grow items-stretch space-x-3 lg:flex">
              {menu}
            </ul>
            <div className="flex grow items-center justify-center md:space-x-4 lg:flex-none">
              <Link
                href="/project/swec"
                className="hidden items-center p-2 lg:flex"
                onClick={() => setMenuIsOpen(false)}
              >
                <h1 className="tracking-none inline-block bg-gradient-to-r from-secondary to-primary bg-clip-text text-2xl font-black uppercase text-transparent transition duration-300 ease-in-out hover:text-black lg:text-lg">
                  SWEC Page
                </h1>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>

            <div className="relative z-50 lg:hidden">
              <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <AnimatePresence>
                  {menuIsOpen ? (
                    <motion.div
                      className="absolute right-0 top-0"
                      key="first"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <X className="h-7 w-7" />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="absolute right-0 top-0"
                      key="second"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Menu2 className="h-7 w-7" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="block lg:hidden">
            <AnimatePresence>
              {
                <motion.ul
                  initial="closed"
                  animate={menuIsOpen ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0.5, x: "-100vw" },
                  }}
                  className="absolute right-0 top-full z-50 w-full"
                >
                  <div
                    tabIndex={0}
                    className={`flex h-[92vh] w-screen flex-col items-center justify-center overflow-y-scroll bg-white text-xl
                transition duration-300 ease-in-out ${
                  !menuIsOpen ? "pointer-events-none" : ""
                }`}
                    id="menu"
                  >
                    {menu}
                  </div>
                </motion.ul>
              }
            </AnimatePresence>
          </div>
        </header> */}
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
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
