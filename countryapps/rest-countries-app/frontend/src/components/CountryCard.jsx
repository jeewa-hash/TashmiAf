import React from 'react';

const CountryCard = ({ country, onClick }) => {
  return (
    <div
      className="
        flex flex-col items-center
        rounded-2xl shadow-xl
        border border-[#343a40]
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-200
        p-7 cursor-pointer group
      "
      style={{
        background: 'rgba(44, 44, 44, 0.92)', // dark transparent background
        backgroundImage: "url('/countries.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'lighten',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)', // stronger custom shadow
      }}
      onClick={() => onClick(country)}
    >
      <div className="w-40 h-28 mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-[#23232a] bg-[#23232a] group-hover:scale-105 transition">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-100 text-center mb-2">
        {country.name.common}
      </h2>
      <div className="w-full text-lg text-gray-300 space-y-2 text-center">
        <div>
          <span className="font-semibold text-gray-400">Region:</span>{' '}
          <span>{country.region || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Capital:</span>{' '}
          <span>{country.capital?.[0] || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Population:</span>{' '}
          <span>{country.population.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
