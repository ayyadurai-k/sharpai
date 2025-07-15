import React, { useEffect, useRef, useState } from 'react';
import { FiHome, FiLogOut, FiMenu, FiUsers, FiX } from 'react-icons/fi';
import { FileDown } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../../assets/mainlogo.png';
import ResumeDownloadData from './ResumeDownloadData';
import Backend from "../../../../Api/ServersideApi"

function AdminUserResumeDownload() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const printRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const resumesPerPage = 12;
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await Backend.AdminUserResuemDownload({
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            const data = Array.isArray(response.data) ? response.data : response.data.resumes;
            const filtered = data.filter(
                (item) =>
                    item.userName &&
                    item.userEmail &&
                    item.personalDetails &&
                    item.personalDetails.jobTitle
            );

            setResumes(filtered);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin.login');
    };

    const handlePreview = (resume) => {
        setSelectedResume(resume);
        navigate(`/admin.dashboard/user-download/${resume.resumeId}`, {
            state: { resume },
        });
    };

    const indexOfLastResume = currentPage * resumesPerPage;
    const indexOfFirstResume = indexOfLastResume - resumesPerPage;
    const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);
    const totalPages = Math.ceil(resumes.length / resumesPerPage);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex gap-2 mt-6 justify-center items-center">
                <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {pages}
                <button
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white text-black fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between items-center p-4 md:hidden">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-28 p-2" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="text-black p-2">
                        <FiX size={24} />
                    </button>
                </div>
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="hidden md:block w-44 p-2" />
                </Link>

                <nav className="mt-2 space-y-2">
                    <NavLink to="/admin.dashboard" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FiHome size={24} /> <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FiUsers size={24} /> <span>Users</span>
                    </NavLink>
                    <NavLink to="/admin.dashboard/user-download" className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-blue-700 transition">
                        <FileDown size={24} /> <span>Users Resume</span>
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center space-x-3 p-4 rounded-lg hover:text-white hover:bg-red-700 w-full mt-10">
                        <FiLogOut size={24} /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <button className="text-blue-900 md:hidden" onClick={() => setSidebarOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                    <h2 className="text-xl font-semibold">User Resume Download</h2>
                </header>

                <main className="p-4 md:p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500 text-lg animate-pulse">Loading resumes...</div>
                        </div>
                    ) : (
                        <>
                            {resumes.length === 0 ? (
                                <div className="text-center text-gray-600">No resumes found.</div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {currentResumes.map((resume, index) => (
                                            <div key={index} className="bg-white p-4 rounded shadow flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{resume.userName}</h3>
                                                    <p className="text-sm text-gray-600">{resume.personalDetails.jobTitle}</p>
                                                </div>
                                                <button
                                                    onClick={() => handlePreview(resume)}
                                                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800"
                                                    >
                                                    Preview
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {renderPagination()}
                                </>
                            )}
                        </>
                    )}
                </main>

                {/* Hidden Resume for Printing */}
                {selectedResume && (
                    <ResumeDownloadData Resumedata={selectedResume} />
                )}
            </div>
        </div>
    );
}

export default AdminUserResumeDownload;
