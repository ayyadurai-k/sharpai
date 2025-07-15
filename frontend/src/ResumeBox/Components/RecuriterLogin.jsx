import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';
import logo from '../../assets/mainlogo.png';
import Backend from "../../Api/Recruiter_Api";

// ✅ Notification Component using Tailwind CSS
const Notification = ({ type, message, onClose }) => {
  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center justify-between space-x-4">
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="text-lg font-bold focus:outline-none">×</button>
      </div>
    </div>
  );
};

function RecuriterLogin() {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState({ type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 4000);
  };

  const initialValues = {
    organizationemail: '',
    password: '',
  };

  const validationSchema = Yup.object({
    organizationemail: Yup.string()
      .email('Invalid email address')
      .required('Organization email is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await Backend.RecuriterLogin(values);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem("userid", response.data.userId);
        showNotification("success", " Welcome back!");
        navigate('/Recuriter');
      } else {
        showNotification("error", response.data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 400) {
        showNotification("error", " Invalid credentials. Please try again.");
      } else if (status === 401) {
        showNotification("error", " Unauthorized. Please check your credentials.");
      } else if (status === 500) {
        showNotification("error", "⚠️Server error. Please try again later.");
      } else {
        showNotification("error", "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Notification Component */}
      {notification.message && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ type: '', message: '' })}
        />
      )}

      <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-12 mb-12 rounded-3xl shadow-xl overflow-hidden border border-gray-200 bg-gray-50">
        {/* Left Image Panel */}
        <div className="md:flex md:w-1/2 bg-slate-50 items-center justify-center p-4">
          <div className="flex flex-col items-start">
            <img src={logo} alt="Logo" className="cursor-pointer object-contain w-24 h-auto mb-4" />
            <img src={login} alt="Login Visual" className="w-full mx-auto" />
          </div>
        </div>

        {/* Right Login Form Panel */}
        <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-6 overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Recruiter Login</h2>

                {/* Organization Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Organization Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="organizationemail"
                    type="email"
                    autoComplete="email"
                    placeholder="recruiter@company.com"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="organizationemail"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 mt-2 bg-blue-600 text-white rounded-full font-semibold transition ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
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
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>

                {/* Links */}
                <p className="text-center text-sm mt-4">
                  <a href="/RecuriterForgotpassword" className="text-blue-600 mr-2">
                    Forgot Password?
                  </a>
                  | Don’t have an account?{' '}
                  <a href="/Recuriterregister" className="text-blue-600">
                    Register here
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default RecuriterLogin;
