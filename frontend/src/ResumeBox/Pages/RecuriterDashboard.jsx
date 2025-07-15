import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Backend from '@/Api/Recruiter_Api';

function RecuriterDashboard() {
    const [stats, setStats] = useState({
        totalPreviews: 0,
        uniqueResumes: 0,
        data: [],
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await Backend.RecuriterDashboard()
                if (response.data.success) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch resume preview stats:', error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Resume',
            value: stats.totalPreviews,
            bg: 'bg-blue-100',
            text: 'text-blue-700',
        },
        {
            title: 'Resumes Viewed',
            value: stats.uniqueResumes,
            bg: 'bg-green-100',
            text: 'text-green-700',
        },
        {
            title: 'Recent Viewed Resumes',
            value: stats.data.length,
            bg: 'bg-purple-100',
            text: 'text-purple-700',
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Recruiter Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-5 sm:p-6 rounded-lg shadow-md ${card.bg} ${card.text} text-center`}
                    >
                        <h2 className="text-base sm:text-lg font-semibold">{card.title}</h2>
                        <p className="text-2xl sm:text-3xl font-bold mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Resumes */}
            <div className="bg-white p-2 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Recent Resume Previews</h2>
                <div className="max-h-[220px] overflow-y-auto custom-scroll">
                    <table className="min-w-full text-sm text-left">
                        <thead className="sticky top-0 bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Position</th>
                                <th className="px-4 py-2">Viewed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.data.map((resume, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="px-4 py-3 font-medium text-gray-800">{resume.username}</td>
                                    <td className="px-4 py-3 text-gray-600">{resume.role}</td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(resume.viewedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecuriterDashboard;
