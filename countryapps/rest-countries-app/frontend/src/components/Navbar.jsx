import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleToggleMenu = () => setMenuOpen(prev => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu on nav
  };

  return (
    <nav className="bg-white/90 shadow-xl border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="text-2xl sm:text-3xl font-extrabold text-[#2563eb] cursor-pointer hover:text-[#14b8a6] transition duration-300"
            onClick={() => navigate('/')}
          >
            🌍 Country Explorer
          </div>

          {/* Hamburger Icon */}
          <div className="sm:hidden flex items-center">
            <button onClick={handleToggleMenu}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-10 font-semibold text-base">
            <button onClick={() => handleNavigate('/')} className="text-[#2563eb] hover:text-[#14b8a6]">
              Home
            </button>
            <button onClick={() => handleNavigate('/country-explorer')} className="text-[#2563eb] hover:text-[#14b8a6]">
              Country Explorer
            </button>
            <button onClick={() => handleNavigate('/favorites')} className="text-[#2563eb] hover:text-[#14b8a6]">
              Favorites
            </button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => handleNavigate('/world-map')}
              className="bg-[#2563eb] hover:bg-[#14b8a6] text-white py-2 px-4 rounded-lg shadow-md transition"
            >
              🌍 World Map
            </button>
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavigate('/login')}
                className="bg-[#14b8a6] hover:bg-[#2563eb] text-white py-2 px-4 rounded-lg shadow-md transition"
              >
                🔑 Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg shadow-md transition"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-3 pb-4 border-t pt-4 border-blue-100 text-base font-medium">
            <button onClick={() => handleNavigate('/')} className="block w-full text-left text-[#2563eb] hover:text-[#14b8a6]">
              Home
            </button>
            <button onClick={() => handleNavigate('/country-explorer')} className="block w-full text-left text-[#2563eb] hover:text-[#14b8a6]">
              Country Explorer
            </button>
            <button onClick={() => handleNavigate('/favorites')} className="block w-full text-left text-[#2563eb] hover:text-[#14b8a6]">
              Favorites
            </button>
            <button
              onClick={() => handleNavigate('/world-map')}
              className="w-full bg-[#2563eb] hover:bg-[#14b8a6] text-white py-2 px-4 rounded-md"
            >
              🌍 World Map
            </button>
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavigate('/login')}
                className="w-full bg-[#14b8a6] hover:bg-[#2563eb] text-white py-2 px-4 rounded-md"
              >
                🔑 Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
              >
                🚪 Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
