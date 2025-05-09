import React from 'react';

const Header = () => {
  return (
    <header className="relative bg-[#23263A]/90 border-b border-[#8e75e4]/30 backdrop-blur-md shadow-md">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-[#8e75e4]">
          <span role="img" aria-label="globe">🌍</span> Country Explorer
        </div>
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          <li className="text-[#228cdc] hover:text-[#b52b79] transition cursor-pointer">Home</li>
          <li className="text-[#228cdc] hover:text-[#b52b79] transition cursor-pointer">Explore</li>
          <li className="text-[#228cdc] hover:text-[#b52b79] transition cursor-pointer">Favorites</li>
          <li className="text-[#228cdc] hover:text-[#b52b79] transition cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-[#3763c5]">
          Discover the World with Confidence
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-light text-[#ded9ee] max-w-2xl mx-auto">
          Explore countries, save your favorites, and uncover the beauty of global cultures.
        </p>
        <button className="mt-8 bg-[#228cdc] hover:bg-[#8e75e4] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg focus:ring-2 focus:ring-[#8e75e4]">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
