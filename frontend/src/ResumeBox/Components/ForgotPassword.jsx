import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import logo1 from "../../assets/mainlogo.png";
import forgotpassword from "../../assets/forgot.png";
import Backend from "../../Api/Recruiter_Api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const initialValues = { organizationemail: "" };
    const [notification, setNotification] = useState({ message: "", type: "" }); // State to manage notifications
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        organizationemail: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await Backend.RecuriterForgotpassword(values);
            if (response.status === 200 || response.status === 201) {
                setNotification({ message: response.data.message, type: "success" });
                toast.success(response.data.message);
                resetForm();
                setTimeout(() => {
                    navigate("/Recuriterlogin");
                }, 4000);
            } else {
                setNotification({ message: response.data.message || "Unexpected response from server", type: "error" });
                toast.error(response.data.message || "Unexpected response from server");
            }
        } catch (err) {
            setNotification({ message: err.response?.data?.message || "Something went wrong", type: "error" });
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-12 md:mt-20 border shadow-md rounded-2xl overflow-hidden bg-white">

            {/* Left Panel */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-50 pt-3 pb-3">
                <img src={logo1} alt="Logo" className="w-20 h-auto object-contain mb-4 md:mb-6" />
                <img src={forgotpassword} alt="Forgot Password Visual" className="w-full max-w-sm h-auto object-contain" />
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 sm:p-8 flex justify-center items-center">
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

                    {/* Notification Area */}
                    {notification.message && (
                        <div
                            className={`p-4 mb-6 text-white rounded-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                            <span>{notification.message}</span>
                        </div>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-sm text-gray-700">Email</label>
                                    <Field
                                        name="organizationemail"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="example@domain.com"
                                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="organizationemail"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2 bg-blue-600 text-white rounded-md transition ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex justify-center items-center gap-2">
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
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
