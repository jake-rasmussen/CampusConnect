import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu2, X } from "tabler-icons-react";

const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const menu = (
    <>
      <Link href="/project" className="flex items-center p-2" onClick={() => setMenuIsOpen(false)}>
        <h1 className="tracking-none text-2xl lg:text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
          All Projects
        </h1>
      </Link>
      <Link href="/open-applications" className="flex items-center p-2" onClick={() => setMenuIsOpen(false)}>
        <h1 className="tracking-none text-2xl lg:text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
          Open Applications
        </h1>
      </Link>
      <Link href="/my-applications" className="flex items-center p-2" onClick={() => setMenuIsOpen(false)}>
        <h1 className="tracking-none text-2xl lg:text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
          My Applications
        </h1>
      </Link>
      <Link href="/my-projects" className="flex items-center p-2" onClick={() => setMenuIsOpen(false)}>
        <h1 className="tracking-none text-2xl lg:text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
          My Projects
        </h1>
      </Link>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white p-4 text-black shadow-xl">
        <div className="mx-auto flex items-center h-16">
          <Link href="/" className="mx-4 w-10 h-10 lg:h-16 lg:w-16" onClick={() => setMenuIsOpen(false)}>
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
            <Link href="/project/swec" className="lg:flex items-center p-2 hidden" onClick={() => setMenuIsOpen(false)}>
              <h1 className="tracking-none text-2xl lg:text-lg font-black uppercase transition duration-300 ease-in-out hover:text-black bg-gradient-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
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
                    <X className="w-7 h-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    className="absolute right-0 top-0"
                    key="second"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Menu2 className="w-7 h-7" />
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
};

export default Navbar;
