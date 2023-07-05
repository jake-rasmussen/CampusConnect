import Link from "next/link";
import { Affiliate, Menu2 } from "tabler-icons-react";

import { Input } from "./shadcn_ui/input";
import { Separator } from "./shadcn_ui/separator";

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white p-4 text-black shadow-xl">
        <div className=" mx-auto flex h-16">
          <Link href="/" className="mr-4 h-16 w-16">
            <Affiliate className="h-full w-full text-primary" />
          </Link>
          <ul className="hidden grow items-stretch space-x-3 lg:flex">
            <Link href="/" className="flex items-center p-2">
              <h1 className="tracking-none text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
                All Clubs
              </h1>
            </Link>
            <Separator orientation="vertical" className="bg-secondary" />
            <Link href="/" className="flex items-center p-2">
              <h1 className="tracking-none text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
                My Applications
              </h1>
            </Link>
            <Separator orientation="vertical" className="bg-secondary" />
            <Link href="/" className="flex items-center p-2">
              <h1 className="tracking-none text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
                My Clubs
              </h1>
            </Link>
          </ul>
          <div className="flex grow items-center justify-center md:space-x-4 lg:flex-none">
            <div className="relative">
              <Input type="email" placeholder="Search" />
            </div>
            <Link href="/" className="hidden items-center px-4 lg:flex">
              <h1 className="tracking-none text-lg font-black uppercase transition duration-300 ease-in-out hover:text-secondary">
                Log In
              </h1>
            </Link>
          </div>
          <button title="Open menu" type="button" className="p-4 lg:hidden">
            <Menu2 />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
