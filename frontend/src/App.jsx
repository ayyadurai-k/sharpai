import React from "react";
import "./App.css";
import { Navigate, Outlet, Router, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "./components/custom/Sonner ";
import Header from "./components/custom/Header";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
 
      <Toaster />
    </>
  );
}

export default App;
