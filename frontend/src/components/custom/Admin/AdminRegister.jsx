import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Backend from "../../../Api/ServersideApi"

const AdminRegister = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match")
            .required("Confirm Password is required"),
    });

    // Handle form submission with Axios
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await Backend.AdminRegisterCredentials( values, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201 || response.status === 200) {
                toast.success("Registration Successful!");
                resetForm();
                setTimeout(() => navigate("/admin.login"), 500);
            } else {
                toast.error("Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            toast.error(error.response?.data?.message || "An error occurred. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="bottom-right" richColors expand />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Admin Register</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form className="mt-6">
                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                                    <Field
                                        autoComplete="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                                    />
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                                    <Field
                                        autoComplete="new-password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                                    />
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                                    <Field
                                        autoComplete="new-password"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                                    />
                                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Registering..." : "Register"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{" "}
                        <a href="/admin.login" className="text-blue-600 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AdminRegister;
