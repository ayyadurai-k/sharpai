import Header from '@/components/custom/Header';
import React from 'react'
import { Link } from 'react-router-dom'

function DreamLanding() {

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Header/>
            <section className="relative h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
                {/* Background Arrows */}
                <h1 className="shiny-text mb-6 text-4xl font-medium tracking-tight leading-normal text-black md:text-7xl lg:text-8xl">
                    Innovate, Elevate, and <br />
                    <span className="bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text pt-3 mt-3 font-bold">
                        Succeed with AI
                    </span>
                </h1>

                <p className="text-[#0D1216B3] shiny-text mb-8 text-lg font-medium text-black lg:text-xl sm:px-10 xl:px-40 dark:text-gray-300">
                    Step into the future with AI-powered strategies
                </p>

                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link
                        to="/dreambox-form"
                        className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-gray-800 bg-gray-50 
                   border-2 border-gray-50 rounded-full shadow-xl backdrop-blur-md 
                   hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:text-white transition-all duration-700 
                   overflow-hidden isolation-auto group"
                        aria-label="Get Started with AI Resume Builder"
                    >
                        Start Your Dream
                        <svg className="w-8 h-8 ml-2 transform rotate-45 border border-gray-700 p-2 rounded-full 
                        transition-all duration-300 ease-linear group-hover:rotate-90 group-hover:bg-gray-50 
                        group-hover:border-none"
                            viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-gray-800 group-hover:fill-gray-800" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default DreamLanding;
