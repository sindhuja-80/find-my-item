import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPlusCircle, FaSignOutAlt, FaCommentDots } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              FindMyItem
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Dashboard
            </Link>
            
            {user ? (
              <>
                <Link to="/submit-item" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  <FaPlusCircle /> Add Item
                </Link>
                <Link to="/matches" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  Matches
                </Link>
                <Link to="/chat" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  <FaCommentDots /> Messages
                </Link>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  <FaUserCircle className="text-xl" /> <span className="max-w-[100px] truncate">{user.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-[0_4px_14px_0_rgba(236,72,153,0.39)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.23)] hover:-translate-y-0.5 transition-all duration-200 font-semibold">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button could go here - keeping it simple for now */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
