import React, { useEffect } from "react";
import "./LandingPage.css";
import Footer from "../custom/Footer";
import ResumeContent from "../custom/ResumeContent";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../custom/Header";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div>
      <Header/>
      {/* <Navbar /> */}
      <section className="font-custom relative  py-36 px-6 mx-auto max-w-screen-xl text-center lg:py-18 lg:px-12 container">
        <h1
          className="shiny-text mb-6 text-5xl font-medium tracking-tight leading-normal text-black md:text-7xl lg:text-8xl"
          data-aos="fade-down"
        >
          Create a Job-Winning{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text mt-3 font-bold">
            Resume with AI
          </span>
        </h1>

        <p
          className="text-[#0D1216B3] mb-8 text-lg  font-medium text-black lg:text-xl sm:px-10 xl:px-40 dark:text-gray-300"
          data-aos="fade-down"
        >
          Smart AI-Powered Resume Optimization to Land Your Dream Job.
        </p>

        <div
          className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
          data-aos="zoom-in-up"
        >
          <a
            href="/auth/sign-in"
            className="inline-flex items-center justify-center px-6 py-3 text-white font-medium 
             bg-gradient-to-r from-blue-500 to-blue-700 rounded-md shadow-lg 
             hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 
             transition-all duration-200 focus:ring-4 focus:outline-none w-full sm:w-auto"
            aria-label="Get Started with AI Resume Builder"
          >
            Start Designing
          </a>

        </div>
        {/* resume content proceess */}
        <ResumeContent />
      </section>
      {/* companies list */}

      <Footer />
    </div>
  );
}

export default Home;
