import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import Backend from '@/Api/Recruiter_Api';

export default function BasicDetails() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: 'male',
        designation: '',
        experience: '',
        organization: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem('userid');
    const authToken = localStorage.getItem('authToken');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!authToken || !userId) {
            setError('Authentication token or user ID missing');
            setLoading(false);
            setTimeout(() => setError(null), 3000);
            return;
        }

        const payload = { ...form, userId, authToken };
        Backend.RecuriterBasicsdetails(payload)
            .then(response => {
                setSuccess('Profile saved successfully!');
             
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    gender: 'male',
                    designation: '',
                    experience: '',
                    organization: ''
                }); 
                setTimeout(() => setSuccess(null), 3000);
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Save failed');
                setTimeout(() => setError(null), 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="bg-white p-4 rounded-xl">
            <div className="p-2">
                <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaUser className="text-blue-600" />
                    Basic Details
                </h1>
            </div>

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

            <div className="pt-3 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3 rounded">
                    {[['firstName', 'First Name', 'text'],
                    ['lastName', 'Last Name', 'text'],
                    ['email', 'Email', 'email'],
                    ['mobile', 'Mobile', 'tel'],
                    ['designation', 'Designation', 'text'],
                    ['experience', 'Work Experience (in years)', 'number'],
                    ['organization', 'Organization / College', 'text'],
                    ].map(([name, label, type]) => (
                        <div key={name} className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">{label}</label>
                            <input
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                type={type}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={label}
                            />
                        </div>
                    ))}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Gender</label>
                        <select
                            name="gender" 
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="text-start md:col-span-2">
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
        </div>
    );
}
