import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/mainlogo.png"

function Error() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img
                src={logo1}
                alt="Logo"
                className="cursor-pointer object-contain mb-5 w-16 sm:w-96 md:w-20 lg:w-44 xl:w-18 h-auto"
            />
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>

            <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Back to Home
            </button>
        </div>
    );
}

export default Error;
