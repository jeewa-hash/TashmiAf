import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center col-span-full py-16">
    <img
      src="/images/new.png"
      alt="No favorites"
      className="w-24 h-24 mb-4 rounded-full border-4 border-white shadow-lg animate-bounce"
    />
    <p className="text-2xl font-semibold text-teal-200 mb-2">No favorites found</p>
    <p className="text-gray-400">Start adding some countries to your favorites!</p>
  </div>
);

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with fetch from backend in production!
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  // Extract unique regions for filter dropdown
  const regions = Array.from(new Set(favorites.map(f => f.region).filter(Boolean)));

  // Extract unique languages for filter dropdown
  const languageSet = new Set();
  favorites.forEach((country) => {
    if (country.languages) {
      Object.values(country.languages).forEach(lang => languageSet.add(lang));
    }
  });
  const languages = Array.from(languageSet);

  // Filtering logic
  const filteredFavorites = favorites.filter((country) => {
    const matchesName = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    const matchesLanguage = languageFilter
      ? country.languages && Object.values(country.languages).includes(languageFilter)
      : true;
    return matchesName && matchesRegion && matchesLanguage;
  });

  const removeFromFavorites = (country) => {
    const updatedFavorites = favorites.filter((fav) => fav.cca3 !== country.cca3);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className="min-h-screen px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/new.png')",
        backgroundColor: "#18181b"
      }}
    >
      <div className="max-w-screen-xl mx-auto space-y-10">
        {/* User info and navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/country-explorer')}
            className="text-teal-200 hover:text-teal-400 text-lg font-semibold flex items-center transition"
          >
            <span className="mr-2 text-2xl">←</span> Back to Explorer
          </button>
          <div className="text-white text-lg flex items-center space-x-2">
  <span className="font-bold text-gray-600">Email:</span>
  <span className="font-bold text-2xl text-gray-900 hover:text-gray-800 transition-all duration-300">
    {user?.email || 'User'}
  </span>
</div>




        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-md tracking-tight">
          ⭐ Your Favorite Countries
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center items-center mt-2">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search your favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 p-3 pl-10 border border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-[#23232a]/90 text-gray-100 placeholder-gray-400"
          />
          <span className="relative left-[-2.5rem] text-yellow-400 text-xl pointer-events-none">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="p-3 rounded-xl border border-gray-700 bg-[#23232a]/90 text-gray-100"
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {/* Language filter */}
          <select
            value={languageFilter}
            onChange={e => setLanguageFilter(e.target.value)}
            className="p-3 rounded-xl border border-gray-700 bg-[#23232a]/90 text-gray-100"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredFavorites.length === 0 ? (
            <EmptyState />
          ) : (
            filteredFavorites.map((country, idx) => (
              <div
                key={country.cca3}
                className="relative bg-[#23232a]/90 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group animate-fade-in border border-gray-700"
                style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'backwards' }}
              >
                {/* Flag */}
                <img
                  src={country.flags?.svg || country.flags?.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-32 object-cover rounded-lg shadow mb-4 border border-gray-800"
                />

                {/* Remove Button */}
                <button
                  onClick={() => removeFromFavorites(country)}
                  className="absolute top-3 right-3 bg-[#18181b] hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-full p-1.5 text-lg font-bold shadow transition"
                  title="Remove from favorites"
                  aria-label="Remove from favorites"
                >
                  ×
                </button>

                {/* Country Info */}
                <h3 className="text-xl font-bold text-center text-gray-100 mb-2">{country.name.common}</h3>
                <p className="text-center text-sm text-teal-300 mb-4">
                  {country.subregion || 'Unknown'}, {country.region || 'Unknown'}
                </p>

                <div className="text-sm space-y-1 text-gray-200">
                  <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                  <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
                  <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                  <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map((cur) => `${cur.name} (${cur.symbol || ''})`).join(', ') : 'N/A'}</p>
                  <div className="flex flex-wrap items-center gap-1">
                    <strong>Timezones:</strong>
                    {country.timezones ? country.timezones.map((tz) => (
                      <span
                        key={tz}
                        className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {tz}
                      </span>
                    )) : ' N/A'}
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <strong>Borders:</strong>
                    {country.borders && country.borders.length > 0 ? country.borders.map((b) => (
                      <span
                        key={b}
                        className="bg-green-900 text-green-200 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {b}
                      </span>
                    )) : ' N/A'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default FavoritesPage;
