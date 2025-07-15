import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo1 from '../../assets/mainlogo.png'

function Signup() {
  return (


      <div className="flex flex-col items-center my-2 w-full">
      <div className="w-full flex justify-start">
        <Link to="/" className="self-start">
          <img
            src={logo1}
            alt="Logo"
            className="cursor-pointer object-contain  mb-1 w-40 sm:w-full md:w-44 lg:w-52 p-2 xl:w-60 h-auto"
          />
        </Link> 
      </div>
      <SignUp/>
    </div>
  );
}

export default Signup;
