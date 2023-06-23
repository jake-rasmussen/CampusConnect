import Link from "next/link";
import { Affiliate, Menu2 } from "tabler-icons-react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white p-4 shadow-xl text-black">
        <div className=" mx-auto flex h-16">
          <Link
            rel="noopener noreferrer"
            href="/"
            className="w-16 h-16 mr-4"
          >
            <Affiliate className="w-full h-full text-primary" />
          </Link>
          <ul className="hidden items-stretch space-x-3 lg:flex grow">
            <Link
              rel="noopener noreferrer"
              href="/"
              className="flex items-center p-2"
            >
              <h1 className="uppercase font-black tracking-none text-lg hover:text-secondary transition duration-300 ease-in-out">All Clubs</h1>
            </Link>
            <Separator orientation="vertical" className="bg-secondary" />
            <Link
              rel="noopener noreferrer"
              href="/"
              className="flex items-center p-2"
            >
              <h1 className="uppercase font-black tracking-none text-lg hover:text-secondary transition duration-300 ease-in-out">My Applications</h1>
            </Link>
            <Separator orientation="vertical" className="bg-secondary" />
            <Link
              rel="noopener noreferrer"
              href="/"
              className="flex items-center p-2"
            >
              <h1 className="uppercase font-black tracking-none text-lg hover:text-secondary transition duration-300 ease-in-out">My Clubs</h1>
            </Link>
          </ul>
          <div className="flex lg:flex-none grow items-center md:space-x-4 justify-center">
            <div className="relative rounded">
              <Input type="email" placeholder="Search" />
            </div>
            <Link
              rel="noopener noreferrer"
              href="/"
              className="hidden lg:flex items-center px-4"
            >
              <h1 className="uppercase font-black tracking-none text-lg hover:text-secondary transition duration-300 ease-in-out">Log In</h1>
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