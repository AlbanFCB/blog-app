import React from "react";
import Logo from "../public/images/Logo.png";
import Image from "next/image";
import { NavLink, navLinksData } from "../constants/index";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  return (
    <nav className="flex bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-2xl">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Image src={Logo} height={100} width={120} alt="" />

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white">
            {navLinksData.map((navLink: NavLink, index: number) => (
              <li key={index}>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                >
                  {navLink.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm: flex justify-between md:hidden">
          <button
            className="block text-3xl text-gray-400 hover:text-designColor focus:outline-none"
            onClick={handleToggle}
          >
            {toggle ? (
              <XMarkIcon className="h-10 w-10 text-gray-500" />
            ) : (
              <Bars3Icon className="h-10 w-10 text-gray-500" />
            )}
          </button>
        </div>
        <div className="flex md:order-2">
          {session ? (
            <div className="flex items-center gap-6">
              <p>{session?.user?.name}</p>
              <img
                className="w-8 h-8 rounded-full"
                src={session?.user!.image!}
                alt="UserImage"
              />
              <button
                onClick={() => signOut()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {toggle && (
        <div className="absolute left-0 top-14 w-full bg-bodyColor py-5">
          <ul className="flex flex-col items-center gap-5 bg-blue-700">
            {navLinksData.map((navLink: NavLink, index: number) => (
              <li key={index}>
                <a
                  href="/"
                  className="block p-3 text-white"
                  onClick={handleToggle}
                >
                  {navLink.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
