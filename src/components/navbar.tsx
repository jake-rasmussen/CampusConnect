import { UserButton, useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Menu2, X } from "tabler-icons-react";

type PropType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const Navbar = (props: PropType) => {
  const { isLoading, setIsLoading } = props;

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [adminProjects, setAdminProjects] = useState<string[]>([]);
  const [evaluatorProjects, setEvaluatorProjects] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const metadata = user.publicMetadata;

      const adminProjectIds: string[] = JSON.parse(metadata.adminProjectIds as string) || [];
      const evaluatorProjectIds: string[] = JSON.parse(metadata.evaluatorProjectIds as string) || [];

      setAdminProjects(adminProjectIds);
      setEvaluatorProjects(evaluatorProjectIds);

      setIsLoading(false);
    }
  }, [user]);

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
      {
        (adminProjects.length > 0 || evaluatorProjects.length > 0) &&
        <Link
          href="/my-projects"
          className="flex items-center p-2"
          onClick={() => setMenuIsOpen(false)}
        >
          <h1 className="tracking-none text-2xl font-black uppercase transition duration-300 ease-in-out hover:text-secondary lg:text-lg">
            My Projects
          </h1>
        </Link>
      }

    </>
  );

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <header className="sticky top-0 z-50 w-full bg-white p-4 text-black shadow-xl">
          <div className="mx-auto flex h-16 items-center">
            <Link
              href="/"
              className="mx-4 h-10 w-10 lg:h-16 lg:w-16"
              onClick={() => setMenuIsOpen(false)}
            >
              <Image
                src={"/assets/SWEC Logo.png"}
                alt={"SWEC Logo"}
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full"
              />
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
                transition duration-300 ease-in-out ${!menuIsOpen ? "pointer-events-none" : ""
                      }`}
                    id="menu"
                  >
                    {menu}
                  </div>
                </motion.ul>
              }
            </AnimatePresence>
          </div>
        </header>
      </>
    );
  }
};

export default Navbar;
