import React from "react";
import Logo from "../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex bg-white px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0 border-b border-gray-200 shadow-2xl">
      <div className="container flex flex-wrap items-center justify-between mx-auto">

        {/* Logo */}

        <Link href={"/"}>
          <Image className="w-auto h-auto" src={Logo} height={100} width={120} alt="" />
        </Link>

        {/* Category */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 text-2xl font-titleFont font-bold text-primaryColor lg:text-4xl">
          Alban's Dayly Blog
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
      </div>
    </nav>
  );
}

export default Navbar;
