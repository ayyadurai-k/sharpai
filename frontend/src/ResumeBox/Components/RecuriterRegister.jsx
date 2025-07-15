import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import signup from "../../assets/signup.png";
import logo1 from "../../assets/mainlogo.png";
import { useNavigate } from 'react-router-dom';
import Backend from "../../Api/Recruiter_Api";

function RecruiterRegister() {
    const verifynavigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' }); // For storing notifications

    const initialValues = {
        firstname: '',
        lastname: '',
        organizationemail: '',
        phone: '',
        password: '',
        confirmPassword: '',
        policy: false,
    };

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        organizationemail: Yup.string().email('Invalid email format').required('Organization Email is required'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Phone is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm your password'),
        policy: Yup.boolean().oneOf([true], 'You must accept the policy'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);

            const userData = {
                firstname: values.firstname,
                lastname: values.lastname,
                organizationemail: values.organizationemail,
                phone: values.phone,
                password: values.password,
                confirmPassword: values.confirmPassword,
                policy: values.policy,
            };

            const response = await Backend.RecruiterRegister(userData);
            console.log("API Response:", response);
            if ([200, 201, 204].includes(response.status)) {
                resetForm();
                setNotification({ message: 'Registration successful! OTP sent to your email.', type: 'success' });
                setTimeout(() => {
                    verifynavigate("/VerifyCode");
                }, 4000);
            }
        } catch (error) {
            const status = error.response?.status;
            if (status === 400) {
                setNotification({ message: ' Email already registered. Please use a different email.', type: 'error' });
            } else if (status === 404) {
                setNotification({ message: ' Server not found. Please try again later.', type: 'error' });
            } else if (status === 500) {
                setNotification({ message: 'Server error. Please try again after some time.', type: 'error' });
            } else {
                setNotification({ message: 'Something went wrong. Please try again.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-16 mb-16 rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            {/* Left Image Panel */}
            <div className="md:flex md:w-1/2 bg-slate-50 items-center justify-center p-4">
                <div className="flex flex-col items-start">
                    <img src={logo1} alt="Logo" className="cursor-pointer object-contain w-24 h-auto mb-4" />
                    <img src={signup} alt="Brand visual" className="w-full mx-auto" />
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-6">
                {/* Notification Panel */}
                {notification.message && (
                    <div
                        className={`p-4 mb-4 text-white rounded-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        <span>{notification.message}</span>
                    </div>
                )}

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="space-y-5">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
                                <Field name="firstname" className="input-field" placeholder="John" autoComplete="off" />
                                <ErrorMessage name="firstname" component="div" className="error-text" />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
                                <Field name="lastname" className="input-field" placeholder="Doe" autoComplete="off" />
                                <ErrorMessage name="lastname" component="div" className="error-text" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Organisation Email <span className="text-red-500">*</span></label>
                            <Field name="organizationemail" className="input-field" placeholder="company@domain.com" autoComplete="off" />
                            <ErrorMessage name="organizationemail" component="div" className="error-text" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
                            <Field name="phone" className="input-field" placeholder="+91 9876543210" autoComplete="off" />
                            <ErrorMessage name="phone" component="div" className="error-text" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
                                <Field type="password" name="password" className="input-field" placeholder="••••••••" autoComplete="new-password" />
                                <ErrorMessage name="password" component="div" className="error-text" />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
                                <Field type="password" name="confirmPassword" className="input-field" placeholder="••••••••" autoComplete="new-password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error-text" />
                            </div>
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                            <Field type="checkbox" name="policy" className="mt-1" />
                            <label>
                                I agree to the <a href="https://sharpenedmindtechnologies.com/privacy-policy" className="text-blue-600 underline">terms and privacy policy</a>
                            </label>
                        </div>
                        <ErrorMessage name="policy" component="div" className="error-text" />

                        <button
                            type="submit"
                            className="w-full py-3 mt-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z" />
                                    </svg>
                                    Loading...
                                </span>
                            ) : "Register"}
                        </button>

                        <p className="text-center text-sm mt-4">
                            Already have an account? <a href="/Recuriterlogin" className="text-blue-600 underline">Login</a>
                        </p>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default RecruiterRegister;
