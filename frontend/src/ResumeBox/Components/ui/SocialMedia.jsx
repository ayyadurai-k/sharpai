import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import Backend from '@/Api/Recruiter_Api';

function SocialMedia() {
    const [form, setForm] = useState({
        linkedin: '',
        facebook: '',
        github: '',
        twitter: '',
        codepen: '',
        figma: '',
        portfolioUrl: '',
        medium: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userid');
    const authToken = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        setSuccess(null);
        setError(null);

        if (!authToken || !userId) {
            setError('Authentication token or user ID missing');
            setLoading(false);
            return;
        }

        const payload = { ...form, userId, authToken };

        Backend.Recuritersociallinks(payload)
            .then(() => {
                setSuccess('Social media links saved successfully!');
                setForm({
                    linkedin: '',
                    facebook: '',
                    github: '',
                    twitter: '',
                    codepen: '',
                    figma: '',
                    portfolioUrl: '',
                    medium: '',
                })
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Failed to save links');
            })
            .finally(() => setLoading(false));
    };

    // Auto-hide success and error messages after 5 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <div className='relative bg-white p-2 rounded-xl'>
            <div className="p-2">
                <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaLink className="text-blue-600" />
                    Social Media Links
                </h1>
            </div>

            {/* Toaster messages */}
            {success && (
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
                    {success}
                </div>
            )}
            {error && (
                <div className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-3 rounded">
                {[
                    ['linkedin', 'Linkedin'],
                    ['facebook', 'Facebook'],
                    ['github', 'GitHub'],
                    ['twitter', 'Twitter'],
                    ['codepen', 'CodePen'],
                    ['figma', 'Figma'],
                    ['portfolioUrl', 'Portfolio URL'],
                    ['medium', 'Medium'],
                ].map(([key, label]) => (
                    <div key={key} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                            {label} <span className="text-xs text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                            type="url"
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            placeholder={`${label} Profile URL`}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <div className="text-start md:col-span-2 mt-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2 rounded-full font-medium transition"
                    >
                        {loading && <Loader className="animate-spin w-4 h-4" />}
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
