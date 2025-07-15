import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import Error from "./components/custom/Error";
import AdminUserResumeDownload from "./components/custom/Admin/Admin Components/AdminUserResumeDownload";
import ResumeDownloadData from "./components/custom/Admin/Admin Components/ResumeDownloadData";
import DreamDashboard from "./Dreambox Module/DreamDashboard";
import DreamBoxFormLayout from "./Dreambox Module/DreamBoxFromLayout";
import ResumeBoxHome from "./ResumeBox/Pages/ResumeBoxHome";
import RecuriterRegister from "./ResumeBox/Components/RecuriterRegister";
import RecuriterLogin from "./ResumeBox/Components/RecuriterLogin";
import VerifyCode from "./ResumeBox/Components/Verifycode";
import ResetPassword from "./ResumeBox/Components/ResetPassword";
import ForgotPassword from "./ResumeBox/Components/ForgotPassword";
import RecuriterLayout from "./ResumeBox/Pages/RecuriterLayout";
import RecuriterCandiateResume from "./ResumeBox/Pages/RecuriterCandiateResume";
import RecuriterSetting from "./ResumeBox/Pages/RecuriterSetting";
import RecuriterDashboard from "./ResumeBox/Pages/RecuriterDashboard";







// Lazy load components
const Home = lazy(() => import("./components/home/LandingPage"));
const App = lazy(() => import("./App.jsx"));
const Dashboard = lazy(() => import("./components/custom/Dashboard"));
const Signin = lazy(() => import("./components/auth/SignIn"));
const Signup = lazy(() => import("./components/auth/Signup"));
const CreateResume = lazy(() => import("./components/custom/CreateResume"));
const ResumeView = lazy(() => import("./components/Download-view/ResumeView"));
const AtsCheckerMain = lazy(() => import("./components/custom/AtsChecker/AtsCheckerMain"));
const AdminLogin = lazy(() => import("./components/custom/Admin/Adminlogin"));
const AdminRegister = lazy(() => import("./components/custom/Admin/AdminRegister"));
const AdminDashboard = lazy(() => import("./components/custom/Admin/AdminDashboard"));
const AdminDashboardUser = lazy(() => import("./components/custom/Admin/AdminDashboardUser"));

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

if (!PUBLISHABLE_KEY || !clerkFrontendApi) {
  console.error("Clerk environment variables are missing!");
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/admin.login",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AdminLogin />
        </Suspense>
      ),
    },
    {
      path: "/admin.register",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AdminRegister />
        </Suspense>
      ),
    },
    {
      path: "/admin.dashboard",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AdminDashboard />
        </Suspense>
      ),
    },
    {
      path: "/admin.dashboard/user",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AdminDashboardUser />
        </Suspense>
      ),
    },
    {
      path: "/admin.dashboard/user-download",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AdminUserResumeDownload />
        </Suspense>
      ),
    },
    {
      path: "/admin.dashboard/user-download/:resumeId",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ResumeDownloadData />
        </Suspense>
      ),
    },
    {
      path: "auth/sign-in",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Signin />
        </Suspense>
      ),
    },
    {
      path: "auth/sign-up",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Signup />
        </Suspense>
      ),
    },
    // dream BOX module
    {
      path: "dreambox",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ResumeBoxHome />
        </Suspense>
      ),
    },
    {
      path: "dreambox-form",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <DreamBoxFormLayout />
        </Suspense>
      ),
    }, {
      path: "dreambox-dashboard/:id",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <DreamDashboard />
        </Suspense>
      ),
    },
    // resume Box Module
    {
      path: "ResumeBox",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ResumeBoxHome />
        </Suspense>
      )
    }, {
      path: "Recuriterregister",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterRegister />
        </Suspense>
      )
    }, {
      path: "Recuriterlogin",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterLogin />
        </Suspense>
      )
    },
    {
      path: "/Recuriter-Resetpassword/:token",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ResetPassword />
        </Suspense>
      )
    }, {
      path: "RecuriterForgotpassword",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ForgotPassword />
        </Suspense>
      )
    }, {
      path: "VerifyCode",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <VerifyCode />
        </Suspense>
      )
    }, {
      path: "Recuriter",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterLayout />
        </Suspense>
      )
    }, {
      path: "Dashboard",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterDashboard />
        </Suspense>
      )
    }, {
      path: "Candiateresume",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterCandiateResume />
        </Suspense>
      )
    },
    {
      path: "Setting",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RecuriterSetting />
        </Suspense>
      )
    },
    {
      path: "my-resume/:resumeId/view",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <ResumeView />
        </Suspense>
      ),
    },

    {
      path: "*",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Error />
        </Suspense>
      ),
    },
    {
      path: "/atschecker",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <AtsCheckerMain />
        </Suspense>
      ),
    },

    {
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: "newresume",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "newresume/resume/:resumeId/edit",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <CreateResume />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} frontendApi={clerkFrontendApi}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ClerkProvider>
  </React.StrictMode>
);
