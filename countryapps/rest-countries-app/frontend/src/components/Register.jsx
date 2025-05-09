import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/country-explorer');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAuthError("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/new.png')",
        backgroundColor: "#23263A"
      }}
    >
      <div className="w-full max-w-xl relative z-10">
        <div
          className="
            relative
            bg-[#23263A]/90
            backdrop-blur-lg
            border border-[#8e75e4]
            rounded-2xl
            px-12 py-14
            flex flex-col items-center
            shadow-2xl shadow-blue-600/40
            animate-fadeIn
            transition-shadow duration-500 hover:shadow-blue-400/60
          "
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#228cdc] rounded-full shadow-lg p-5 border-4 border-[#23263A] animate-bounce">
            <span className="text-5xl text-white">🚀</span>
          </div>
          <h2 className="mt-12 text-4xl font-extrabold text-[#8e75e4] mb-3 text-center">
            Create Account
          </h2>
          <p className="text-[#ded9ee] mb-8 text-center text-lg">
            Join our community to start exploring countries!
          </p>

          {(authError || successMessage) && (
            <div className={`w-full flex items-center text-base mb-5 px-5 py-3 rounded-lg ${
              authError ? 
              'text-red-700 bg-red-100/80 border border-red-200' : 
              'text-green-700 bg-green-100/80 border border-green-200'
            }`}>
              <FiAlertCircle className="mr-2 text-xl" />
              {authError || successMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="w-full space-y-7">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ded9ee] text-lg">
                <FiUser />
              </span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#23232a] text-[#ded9ee] placeholder-[#ded9ee]/70 border border-[#7464bc] focus:outline-none focus:ring-2 focus:ring-[#228cdc] focus:border-[#228cdc] transition text-lg"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ded9ee] text-lg">
                <FiMail />
              </span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#23232a] text-[#ded9ee] placeholder-[#ded9ee]/70 border border-[#7464bc] focus:outline-none focus:ring-2 focus:ring-[#228cdc] focus:border-[#228cdc] transition text-lg"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ded9ee] text-lg">
                <FiLock />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#23232a] text-[#ded9ee] placeholder-[#ded9ee]/70 border border-[#7464bc] focus:outline-none focus:ring-2 focus:ring-[#228cdc] focus:border-[#228cdc] transition text-lg"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ded9ee] text-lg">
                <FiLock />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#23232a] text-[#ded9ee] placeholder-[#ded9ee]/70 border border-[#7464bc] focus:outline-none focus:ring-2 focus:ring-[#228cdc] focus:border-[#228cdc] transition text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#228cdc] hover:bg-[#8e75e4] text-white font-bold rounded-lg shadow-md focus:ring-2 focus:ring-[#8e75e4] transition text-lg animate-pulse"
            >
              Register
            </button>
          </form>

          <p className="text-base text-center text-[#ded9ee] mt-8">
            Already have an account?{' '}
            <span
              className="text-[#b52b79] font-semibold hover:underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
