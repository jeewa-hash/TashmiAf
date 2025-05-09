import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="🔍 Search by country name"
      className="
        w-full md:w-[28rem]  /* About 448px on desktop, fits 27+ chars */
        px-6 py-4
        rounded-xl
        bg-[#23232a]/90
        text-gray-100
        text-lg
        placeholder-gray-400
        border border-[#343a40]
        focus:outline-none
        focus:ring-4
        focus:ring-yellow-400
        focus:border-yellow-400
        transition
        shadow
      "
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'lighten',
        boxShadow: '0 0 0 2px rgba(220, 216, 211, 0.87)',
      }}
      aria-label="Search by country name"
    />
  );
};

export default SearchBar;
