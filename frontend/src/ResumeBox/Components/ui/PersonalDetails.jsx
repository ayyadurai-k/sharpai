import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAddressCard } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import Backend from '@/Api/Recruiter_Api';

function PersonalDetails() {
    const [form, setForm] = useState({
        dateOfBirth: '',
        address: '',
        pincode: '',
        location: '',
        hobbies: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userid');
    const authToken = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
          Backend.Recuriterperonaldetails(payload)
            .then((res) => {
                setSuccess('Personal details saved successfully!');
                setForm({
                    dateOfBirth: '',
                    address: '',
                    pincode: '',
                    location: '',
                    hobbies: '',
                });
                console.log(res);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Save failed');
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
        <div className="relative bg-white p-4 rounded-xl">
            <div className="p-2">
                <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaAddressCard className="text-blue-600" />
                    Personal Details
                </h1>
            </div>

            {/* Toast Messages */}
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
                {/* Date of Birth */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Current Address */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Current Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Current Address"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="City, State"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Hobbies */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Hobbies</label>
                    <input
                        type="text"
                        name="hobbies"
                        value={form.hobbies}
                        onChange={handleChange}
                        placeholder="E.g., Reading, Painting"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

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

export default PersonalDetails;
