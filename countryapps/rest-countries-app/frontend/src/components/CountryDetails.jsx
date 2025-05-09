import React, { useState } from 'react';

const CountryDetails = ({ country, setSelectedCountry }) => {
  // Helper functions for display
  const languageList = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencyList = country.currencies
    ? Object.values(country.currencies)
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(', ')
    : 'N/A';
  const borderList = country.borders || [];
  const timezoneList = country.timezones || [];

  return (
    <div className="bg-white rounded-3xl shadow-2xl max-w-lg mx-auto p-8 relative border border-blue-100">
      {/* Close Button */}
      <button
        onClick={() => setSelectedCountry(null)}
        className="absolute top-4 right-4 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-full px-3 py-1 font-bold shadow transition"
        aria-label="Close"
      >
        ×
      </button>

      {/* Flag */}
      <div className="flex justify-center mb-6">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={country.name.common}
          className="w-40 h-28 object-cover rounded-xl border-2 border-sky-200 shadow"
        />
      </div>

      {/* Country Name and Subregion */}
      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-1">{country.name.common}</h2>
      <div className="flex justify-center mb-6">
        <span className="inline-block bg-sky-100 text-sky-800 text-sm font-semibold px-4 py-1 rounded-full shadow">
          {country.subregion || 'N/A'}, {country.region}
        </span>
      </div>

      {/* Details List */}
      <div className="space-y-5 text-lg">
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Capital:</span>
          <span className="text-gray-900 ml-2">{country.capital?.[0] || 'N/A'}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Population:</span>
          <span className="text-gray-900 ml-2">{country.population.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Languages:</span>
          <span className="text-gray-900 ml-2">{languageList}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Timezones:</span>
          <span className="flex flex-wrap gap-2 ml-2">
            {timezoneList.length > 0
              ? timezoneList.map((tz) => (
                  <span
                    key={tz}
                    className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {tz}
                  </span>
                ))
              : <span className="text-gray-900">N/A</span>
            }
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Currencies:</span>
          <span className="text-gray-900 ml-2">{currencyList}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-gray-500">Borders:</span>
          <span className="flex flex-wrap gap-2 ml-2">
            {borderList.length > 0
              ? borderList.map((code) => (
                  <span
                    key={code}
                    className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-sm font-medium border border-green-200"
                  >
                    {code}
                  </span>
                ))
              : <span className="text-gray-900">N/A</span>
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
