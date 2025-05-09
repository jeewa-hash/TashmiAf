import React, { useState, useEffect } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/country-explorer');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      return;
    }
    try {
      const response = await axios.post('/users/login', { email, password });
      if (response.data.token) {
        login({ email }, response.data.token);
      } else {
        setAuthError('Login failed. No token received.');
      }
    } catch (err) {
      setAuthError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/new.png')",
        
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
            <span className="text-5xl text-white">🌍</span>
          </div>
          <h2 className="mt-12 text-4xl font-extrabold text-[#8e75e4] mb-3 text-center">
            Log In
          </h2>
          <p className="text-[#ded9ee] mb-8 text-center text-lg">
            Welcome back! Please log in to continue.
          </p>

          {authError && (
            <div className="w-full flex items-center text-red-700 text-base mb-5 bg-red-100/80 border border-red-200 px-5 py-3 rounded-lg">
              <svg className="mr-2 text-xl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
              </svg>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full space-y-7">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ded9ee] text-lg">
                <FiMail />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#23232a] text-[#ded9ee] placeholder-[#ded9ee]/70 border border-[#7464bc] focus:outline-none focus:ring-2 focus:ring-[#228cdc] focus:border-[#228cdc] transition text-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#228cdc] hover:bg-[#8e75e4] text-white font-bold rounded-lg shadow-md focus:ring-2 focus:ring-[#8e75e4] transition text-lg animate-pulse"
            >
              Log In
            </button>
          </form>

          <p className="text-base text-center text-[#ded9ee] mt-8">
            Don&apos;t have an account?{' '}
            <span
              className="text-[#b52b79] font-semibold hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
