import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FiMenu, FiX } from "react-icons/fi";
import logo1 from "../../assets/mainlogo.png";
import Dropdownmenu from "./Dropdownmenu";
import AiToolsDropdown from "./AiToolsDropdown";

function Header() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="py-2 px-4 flex justify-between items-center shadow-md bg-white sticky top-0 z-40  ">
      {/* Logo */}
      <Link to="/" className="flex items-center ">
        <img
          src={logo1}
          alt="Logo"
          className="cursor-pointer object-contain w-16 sm:w-96 md:w-20 lg:w-44 xl:w-18 h-auto"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center ">
        <a
          href="https://forms.gle/KDaSUd6xkfFLMBmW9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-2 bg-transparent border border-transparent outline-none 
    transition-all duration-300 ease-in-out 
    hover:bg-white hover:text-gray-800 hover:border-gray-300"
        >
          Feedback
        </a>
        <Link to="/ResumeBox" className=" px-2 py-2 bg-transparent border border-transparent outline-none transition 
        hover:bg-white hover:text-gray-800 hover:border-gray-300"  >
          Resume Box
        </Link>
        <AiToolsDropdown />
        {isSignedIn ? (
          <div className="flex gap-5 items-center">
            <Dropdownmenu />
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/auth/sign-in" className="hidden md:block">
              <Button variant="outline" className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 text-sm md:text-base font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 text-sm md:text-base font-semibold rounded-lg transition-all shadow-md bg-[#0d6efd] text-white border border-[#0d6efd] hover:bg-[#1A56DB] hover:border-[#0d6efd]">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ?
          "" : <FiMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden fixed inset-0 bg-white transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} z-50 shadow-lg w-2/3 sm:w-1/2 h-full px-4 py-5`}>
        <button className="text-3xl absolute top-5 right-5 text-gray-700" onClick={() => setMenuOpen(false)}>
          <FiX />
        </button>
        <Link to="/" className="flex items-center">
          <img src={logo1} alt="Logo" className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto" />
        </Link>
        <div className="mt-10 flex flex-col gap-6">

          <a href="https://forms.gle/KDaSUd6xkfFLMBmW9" target="_blank" rel="noopener noreferrer" className="px-2 py-2 bg-transparent border border-transparent outline-none transition 
        hover:bg-white hover:text-gray-800 hover:border-gray-300 " onClick={() => setMenuOpen(false)}>
            Feedback
          </a>
          <Link to="/ResumeBox" className=" px-2 py-2 bg-transparent border border-transparent outline-none transition 
        hover:bg-white hover:text-gray-800 hover:border-gray-300" >
            Resume Box
          </Link>
          <AiToolsDropdown />
          {isSignedIn ? (
            <>
              <Dropdownmenu onClick={() => setMenuOpen(false)} />
              <UserButton />
            </>
          ) : (
            <>
              <Link to="/auth/sign-in" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/auth/sign-up" onClick={() => setMenuOpen(false)}>
                <Button className="bg-blue-600 text-white w-full">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
