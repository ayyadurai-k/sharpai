import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../assets/mainlogo.png";
import verifycode from "../../assets/code.svg";
import Backend from "../../Api/Recruiter_Api";

function VerifyCode() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Notification state
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // Allow only single digit numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length !== 6) {
            setNotification({ message: 'Please enter the full 6-digit code.', type: 'error' });
            return;
        }
        setLoading(true);
        try {
            const response = await Backend.RecuriterVerifycode({ otp: code });
            if (response.status === 200 || response.status === 201) {
                setNotification({ message: 'Verification successful! You can now log in.', type: 'success' });
                navigate('/Recuriterlogin');
            } else {
                setNotification({ message: response.data.message || 'Invalid code. Please try again.', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Verification failed: ' + (error.response?.data?.message || 'Server error'), type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-24 shadow-xl border rounded-2xl overflow-hidden bg-white">
            {/* Left Side (Logo and Image) */}
            <div className="md:flex w-1/2 justify-center bg-slate-50 p-6">
                <div className="flex flex-col gap-6 items-center">
                    <img src={logo1} alt="Logo" className="w-24 h-auto object-contain" />
                    <img src={verifycode} alt="Verification Visual" className="w-full max-w-xs h-auto object-contain" />
                </div>
            </div>

            {/* Right Side (Form) */}
            <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
                <div className="text-center w-full">
                    <h2 className="text-2xl font-semibold mb-2">Email Verification</h2>
                    <p className="text-sm text-gray-600 mb-6">Enter the 6-digit OTP sent to your email.</p>

                    {/* Notification Area */}
                    {notification.message && (
                        <div
                            className={`p-4 mb-6 text-white rounded-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                            <span>{notification.message}</span>
                        </div>
                    )}

                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-3 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-3 rounded-xl font-semibold transition ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"
                                    />
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            "Verify"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyCode;
