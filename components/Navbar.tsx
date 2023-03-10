import React from "react";
import Logo from "../public/images/Logo.png";
import Image from "next/image";
import { NavLink, navLinksData } from "../constants/index";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "./../typings.d";

interface Props {
  posts: [Post];
}

function Navbar({ posts }: Props) {
  console.log("post --->", posts);
  const { data: session } = useSession();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  const categories = Array.from(
    new Set(
      posts
        ?.map((post) => post.categories)
        .flat()
        ?.map((category) => category.title)
    )
  );
  return (
    <nav className="flex bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-2xl">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* Logo */}
        <Link href={"/"}>
          <Image src={Logo} height={100} width={120} alt="" />
        </Link>

        {/* Category */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white font-bodyFont bg-primaryColor rounded md:bg-transparent md:text-primaryColor font-semibold md:p-0 hover:font-bold"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Log In / Out */}
        <div className="flex md:order-2">
          {/* Connected users */}
          {session ? (
            <div className="flex items-center gap-4">
              <p className="hidden md:flex font-semibold font-bodyFont">
                {session?.user?.name}
              </p>
              <img
                className="hidden md:flex w-8 h-8 rounded-full"
                src={session?.user!.image!}
                alt="UserImage"
              />
              <button
                onClick={() => signOut()}
                type="button"
                className="font-bodyFont border border-primaryColor hover:bg-primaryColor hover:text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
              {/* Disconnected users */}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="font-bodyFont border border-primaryColor hover:bg-primaryColor hover:text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          )}
        </div>
        {/* display mobile view */}
        <div className="sm: flex justify-between md:hidden">
          <button
            className="block text-3xl text-primaryColor hover:text-designColor focus:outline-none"
            onClick={handleToggle}
          >
            {toggle ? (
              <XMarkIcon className="h-10 w-10 text-primaryColor" />
            ) : (
              <Bars3Icon className="h-10 w-10 text-primaryColor" />
            )}
          </button>
        </div>
      </div>

      {/* Display all the link when true */}
      {toggle && (
        <div className="absolute left-0 top-14 w-full bg-bodyColor py-5">
          <ul className="flex flex-col items-center gap-5 bg-primaryColor">
            {navLinksData.map((navLink: NavLink, index: number) => (
              <li key={index}>
                <a
                  href="/"
                  className="block p-3 text-white font-semibold hover:font-bold"
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
