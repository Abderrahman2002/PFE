import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Key, Lock, ArrowLeft } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Request code, 2: Reset password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestCode = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:9000/api/forgot-password', {
        email,
      });
  
      setMessage(response.data.message);
      setStep(2); // Move to the next step
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code.');
      setMessage('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/api/reset-password", {
        email,
        code,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful reset
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl flex overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Office"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-6">Reset Password</h2>
            <p className="text-xl text-center">
              Enter your email and reset code to set a new password.
            </p>
          </div>
        </div>

        {/* Right side - Reset Password Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {step === 1 ? "Request Reset Code" : "Reset Password"}
            </h1>
            <p className="text-gray-500 text-lg">
              {step === 1
                ? "Enter your email to receive a reset code."
                : "Enter the code and your new password."}
            </p>
          </div>

          {step === 1 ? (
            // Step 1: Request Reset Code
            <form onSubmit={handleRequestCode} className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Email address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Send Reset Code
              </button>
            </form>
          ) : (
            // Step 2: Reset Password
            <form onSubmit={handleResetPassword} className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-6 w-6 text-blue-600" />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Reset code"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="New password"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Confirm password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Reset Password
              </button>
            </form>
          )}

          {message && (
            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-base">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-base">
              {error}
            </div>
          )}

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full flex items-center justify-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;