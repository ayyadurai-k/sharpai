import React from "react";
import { SignIn } from "@clerk/clerk-react";
import logo1 from "../../assets/mainlogo.png"
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="flex flex-col items-center my-6 w-full">
    <div className="w-full flex justify-start">
      <Link to="/" className="self-start">
        <img
          src={logo1}
          alt="Logo"
          className="cursor-pointer object-contain  mb-5 w-40 sm:w-full md:w-44 lg:w-52 p-2 xl:w-60 h-auto"
        />
      </Link> 
    </div>
    <SignIn />
  </div>
  
  
  );
}

export default Signin;
