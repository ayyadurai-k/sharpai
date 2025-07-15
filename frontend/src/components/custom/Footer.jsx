import React, { useState } from "react";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";


function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="border-t border-gray-300 py-8 pb-20">
       <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          .blinking-dot {
            animation: blink 2s infinite;
          }
        `}
      </style>
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Language Dropdown */}

        <div className="relative inline-block text-left mb-2">
          <button
            type="button"
            className="inline-flex w-full sm:w-auto justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm  dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            Select Language
            <svg
              className={`-mr-1 size-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute bottom-12  mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100">
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  English
                </button>

              </div>
            </div>
          )}
        </div>

        {/* Copyright Text */}
        <div className="w-full sm:w-auto text-center text-gray-600 mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 blinking-dot"></span>
            <p>Beta Version</p>
          </div>
          © 2025 Sharpened Mind Tech & Solutions Private Limited.
          <hr className="border-none" />
          All rights reserved.
        </div>

        {/* Social Media Links */}
        <div className="w-full sm:w-auto flex justify-center items-center sm:justify-end space-x-4 mb-4">
          <a
            href="https://www.facebook.com/sharpenedmind/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="w-6 h-6 hover:opacity-80"
            />
          </a>
          <a
            href="https://www.instagram.com/sharpened_mind_tech_solutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-6 h-6 hover:opacity-80"
            />
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
