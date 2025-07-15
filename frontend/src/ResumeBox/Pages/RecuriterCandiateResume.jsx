import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ResumePreview from '../Components/ui/ResumePreview';
import { Mail, Phone, Briefcase, Eye } from "lucide-react";
import Backend from '@/Api/Recruiter_Api';

function RecuriterCandiateResume() {
    const [searchTerm, setSearchTerm] = useState('');
    const [resumes, setResumes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;
    const [previewIndex, setPreviewIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalResume, setModalResume] = useState(null);

    const togglePreview = async (index, resume) => {
        if (previewIndex === index) {
            setPreviewIndex(null);
            setShowModal(false);
        } else {
            setPreviewIndex(index);
            setModalResume(resume);
            setShowModal(true);

            // Extract name and role safely
            const firstName = resume.personalDetails?.firstName || '';
            const lastName = resume.personalDetails?.lastName || '';
            const username = `${firstName} ${lastName}`.trim();
            const role = resume.personalDetails?.jobTitle || '';
            const resumeId = resume._id;

            const payload = {
                recruiterId: localStorage.getItem("userid") || null,
                resumeId,
                username,
                role
            };
            console.log(payload)
            // Call backend to log preview
            try {
                const response = await Backend.Recuriterresumepreview(payload)
                console.log('Preview logged successfully:', response.data);
            } catch (error) {
                console.error('Error logging resume preview:', error);
            }
        }
    };




    useEffect(() => {
        fetchResumes(currentPage);
    }, [currentPage]);

    const fetchResumes = async (page) => {
        try {
            const response = await axios.get(`https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/resumes?page=${page}&limit=${itemsPerPage}`);
            const { resumes, totalPages } = response.data;
            setResumes(resumes);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        }
    };

    const filteredResumes = resumes.filter(r =>
        r.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r?.personalDetails?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const goPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Candidate Resume</h1>

            <div className="p-1">
                {/* Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center w-full md:w-1/2 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search candidate by name"
                            className="w-full outline-none"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Resume Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResumes.map((resume, idx) => (
                        <div
                            key={resume._id}
                            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                        >
                            {/* Avatar + Name + Email */}
                            <div className="flex flex-col md:items-center md:text-center gap-2 mb-2">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(resume.userName || 'User')}&background=4f46e5&color=fff&rounded=true`}
                                    alt="User Avatar"
                                    className="w-14 h-14 rounded-full object-cover shadow-md"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {resume.userName || 'N/A'}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate max-w-[150px] md:max-w-full">
                                        {resume?.personalDetails?.email || 'No Email'}
                                    </p>
                                </div>
                            </div>

                            {/* Resume Details */}
                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-indigo-600" />
                                    {resume?.personalDetails?.jobTitle || 'No Title'}
                                </p>

                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-indigo-600" />
                                    {resume?.personalDetails?.phone || 'No Phone'}
                                </p>
                            </div>

                            {/* Preview Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => togglePreview(idx, resume)}
                                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        {/* Prev Button with Icon */}
                        <button
                            onClick={goPrev}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Page Info */}
                        <span className="text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        {/* Next Button with Icon */}
                        <button
                            onClick={goNext}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

            </div>

            {/* Modal for Resume Preview */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50">
                    <div className="bg-white rounded-l-lg w-full md:w-[700px] h-full p-6 overflow-hidden transform transition-transform duration-500 translate-x-full animate-slide-in-right">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{modalResume.userName}</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className=" hover:text-red-700 hover:bg-red-200 text-gray-800 p-[5px] rounded-full"
                            >
                                &times; Close
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[80vh] pr-2">
                            <ResumePreview resume={modalResume} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecuriterCandiateResume;
