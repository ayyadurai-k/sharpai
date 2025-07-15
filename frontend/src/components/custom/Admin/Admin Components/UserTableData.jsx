import React, { useState, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import Backend from "../../../../Api/ServersideApi";

function UserTableData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; 

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) throw new Error("No token found. Please log in.");

            const response = await Backend.AdminUserDatalist({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data || []); 
            console.log(users)
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };
    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <section className="pt-4 pb-4">
            <div className="container mx-auto px-2 sm:px-4 max-w-screen-xl">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-start">User List</h2>
                <div className="bg-white shadow-lg rounded-lg">
                    <table className="w-full overflow-x-auto text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-center">
                                <th className="p-2 sm:p-3">No</th>
                                <th className="p-2 sm:p-3">Username</th>
                                <th className="p-2 sm:p-3">Job Title</th>
                                <th className="p-2 sm:p-3">Email</th>
                                <th className="p-2 sm:p-3">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id || index} className="border-b p-2 hover:bg-gray-100 text-center">
                                    <td className="p-2 sm:p-3">{indexOfFirstUser + index + 1}</td>
                                    <td className="p-2 sm:p-3">{user.userName}</td>
                                    <td className="p-2 sm:p-3">{user.jobTitle}</td>
                                    <td className="p-2 sm:p-3">{user.userEmail}</td>
                                    <td className="p-2 sm:p-3">
                                        {user.status === "Active" ? (
                                            <span className="flex justify-center items-center text-green-600 font-medium">
                                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full mr-2"></span> Active
                                            </span>
                                        ) : (
                                            <span className="flex justify-center items-center text-red-600 font-medium">
                                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full mr-2"></span> Inactive
                                            </span>
                                        )}
                                    </td>
                                    {/* <td className="p-2 sm:p-3 relative">
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
                                                            onClick={handledownload}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            Download Resume
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 sm:p-3 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <span className="text-gray-700 text-sm sm:text-base">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 sm:p-3 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default UserTableData;
