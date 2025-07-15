import React, { useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

function SearchQueryData({ QueryData }) {
    console.log(QueryData)
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; 
    const totalPages = Math.ceil(QueryData.length / usersPerPage);

    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    const indexOfLastUser = indexOfFirstUser + usersPerPage;
    const currentUsers = QueryData.slice(indexOfFirstUser, indexOfLastUser);

    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    return (
        <section className="pt-4 pb-4">
            <div className="container mx-auto px-2 sm:px-4 max-w-screen-xl">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-start">Search Results</h2>
                <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-center">
                                <th className="p-2 sm:p-3">No</th>
                                <th className="p-2 sm:p-3">Username</th>
                                <th className="p-2 sm:p-3">Email</th>
                                <th className="p-2 sm:p-3">Job Title</th>
                               
                                <th className="p-2 sm:p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user.resumeId || index} className="border-b hover:bg-gray-100 text-center">
                                        <td className="p-2 sm:p-3">{indexOfFirstUser + index + 1}</td>
                                        <td className="p-2 sm:p-3">{user.userName}</td>
                                        <td className="p-2 sm:p-3">{user.userEmail}</td>
                                        <td className="p-2 sm:p-3">{user.personalDetails?.jobTitle || "N/A"}</td>
                                        <td className="p-2 sm:p-3 relative">
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="p-1 sm:p-2 rounded-full hover:bg-gray-200"
                                            >
                                                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>

                                            {dropdownOpen === index && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    <ul className="py-2 text-sm text-gray-700 list-none">

                                                        <li>
                                                            <button
                                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                Download Resume
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-gray-500">
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 sm:p-3 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <span className="text-gray-700 text-sm sm:text-base">
                            {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 sm:p-3 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SearchQueryData;
