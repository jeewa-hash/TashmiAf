import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#23263A]/95 border-t border-[#8e75e4]/30 text-[#ded9ee] py-8 mt-16 backdrop-blur-md shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-center md:text-left w-full md:w-auto">
          <span className="text-lg font-semibold tracking-wide text-[#8e75e4]">🌍 Country Explorer</span>
          <p className="text-xs mt-1 text-[#ded9ee]/80">
            &copy; {new Date().getFullYear()} Country Explorer. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6 justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
          <a href="#" className="text-[#228cdc] hover:text-[#b52b79] transition font-medium">Privacy Policy</a>
          <a href="#" className="text-[#228cdc] hover:text-[#b52b79] transition font-medium">Terms of Service</a>
          <a href="#" className="text-[#228cdc] hover:text-[#b52b79] transition font-medium">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
