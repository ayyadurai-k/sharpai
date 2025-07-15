import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Backend from "../../../Api/ServersideApi"

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await Backend.AdminLogincredentials(values);
      
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login Successful!");
        setTimeout(() => navigate("/admin.dashboard"), 500);
      } else {
        toast.error(response.data.message || "Invalid email or password!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors expand />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-center mt-2">Sign in to manage your dashboard</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-6">
                {/* Email Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Password Field */}
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </div>
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-sm mt-6">
            Go to the <a href="/admin.register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;