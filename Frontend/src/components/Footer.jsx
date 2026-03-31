import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white/70 backdrop-blur-lg border-t border-gray-200/50 shadow-[0_-4px_20px_rgb(0,0,0,0.03)] py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-600 font-medium flex items-center gap-2">
          Made with <FaHeart className="text-pink-500 animate-pulse" /> by 
          <span className="font-bold bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent">@sindhuja</span>
        </div>
        
        <div className="flex items-center space-x-6 text-2xl">
          <a
            href="https://github.com/sindhuja-80"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors transform hover:scale-110 duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sindhuja-kurapati" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
