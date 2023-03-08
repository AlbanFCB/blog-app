import React from "react";
import Logo from "../public/images/Logo.png";
import Image from "next/image";
import { NavLink, navLinksData } from "../constants/index";
import Link from "next/link";
import {useState} from "react";
import { MenuIcon } from '@heroicons/react/24/solid'

function Navbar() {

    const [toggle, setToggle] = useState(false) ;

    const handleToggle = () => setToggle(!toggle);

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Image src={Logo} height={100} width={120} alt="" />

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
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
        <div className="flex md:order-2">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">Login</button>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
