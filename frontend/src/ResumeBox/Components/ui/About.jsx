import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import axios from 'axios';
import Backend from '@/Api/Recruiter_Api';

function About() {
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userId = localStorage.getItem('userid');
  const authToken = localStorage.getItem('authToken');

  const handleSave = () => {
    setError(null);
    setSuccess(null);

    if (!userId || !authToken) {
      setError('User ID or Auth Token missing');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);

    const payload = {
      userId,
      authToken,
      aboutMe: aboutText
    };

    Backend.Recuriteraboutmedetails(payload)
      .then(response => {
        setSuccess('About details saved successfully!');
        setAboutText('');
        setTimeout(() => setSuccess(null), 3000);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to save');
        setTimeout(() => setError(null), 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='bg-white p-2 rounded-xl'>
      {/* Header */}
      <div className="p-2">
        <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FaInfoCircle className="text-blue-600" />
          About Details
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
      {/* About Form */}
      <div className="w-full bg-slate-50 p-3 rounded">
        <label className="block text-sm font-semibold mb-2">
          About Me <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Maximum 1000 characters can be added.
        </p>
        <textarea
          className="w-full border rounded px-3 py-2 h-60 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about yourself..."
          maxLength="1000"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        ></textarea>


        <div className="text-start mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2 rounded-full font-medium transition"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
