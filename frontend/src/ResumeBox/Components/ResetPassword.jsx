import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo1 from "../../assets/mainlogo.png";
import resetpassword from "../../assets/reset.svg";
import Backend from "../../Api/Recruiter_Api";
import { toast } from "sonner";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Notification state

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, "At least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Confirm your password"),
    });

    // Handle form submission and API call
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
    
            const payload = {
                token: token, 
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            };
    
            const response = await Backend.RecuriterResetpassword(payload);
    
            if (response.status === 200) {
                setNotification({ message: 'Password reset successful! Redirecting to login...', type: 'success' });
                setTimeout(() => {
                    navigate("/Recuriterlogin");
                }, 4000);
            } else {
                setNotification({ message: response.data.message || 'Reset failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: error.response?.data?.message || 'Something went wrong. Please try again.', type: 'error' });
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-20 border shadow-md rounded-xl overflow-hidden bg-white">
            {/* Left Panel */}
            <div className="md:flex w-1/2 items-center justify-center bg-slate-50 p-6">
                <div className="flex flex-col gap-6">
                    <img
                        src={logo1}
                        alt="Logo"
                        className="w-24 h-auto object-contain"
                    />
                    <img
                        src={resetpassword}
                        alt="Reset Password Visual"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

                    {/* Notification Area */}
                    {notification.message && (
                        <div
                            className={`p-4 mb-6 text-white rounded-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                            <span>{notification.message}</span>
                        </div>
                    )}

                    <Formik
                        initialValues={{ newPassword: "", confirmPassword: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="space-y-4">
                            {/* New Password Field */}
                            <div>
                                <label className="block mb-1 text-sm">New Password</label>
                                <Field
                                    type="password"
                                    name="newPassword"
                                    className="input-field w-full"
                                    placeholder="••••••••"
                                />
                                <ErrorMessage name="newPassword" component="div" className="error-text" />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block mb-1 text-sm">Confirm Password</label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className="input-field w-full"
                                    placeholder="••••••••"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="error-text" />
                            </div>

                            {/* Reset Password Button */}
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 text-white mr-2"
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
                                        Sending...
                                    </div>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
