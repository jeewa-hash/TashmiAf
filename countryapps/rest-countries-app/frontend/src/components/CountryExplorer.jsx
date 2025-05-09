import React, { useState, useEffect, useCallback } from 'react';
import ReactGlobe from 'react-globe.gl';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import LanguageFilter from './LanguageFilter';
import CountryCard from './CountryCard';
import CountryDetails from './CountryDetails';
import ClockCalendar from './ClockCalendar';

const CountryExplorer = () => {
  const [userName, setUserName] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const countriesPerPage = 12;

  // Fetch all countries from the API
  const fetchCountries = useCallback(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  // Fetch countries from the API based on the search term
  const fetchCountriesBySearch = useCallback(() => {
    if (searchTerm) {
      fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredCountries(data);
        })
        .catch((err) => console.error('Error fetching countries by search:', err));
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  // Fetch full details by country code
  const fetchCountryByCode = async (code) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();
      return data[0];
    } catch (err) {
      console.error('Error fetching country by code:', err);
      return null;
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.name) setUserName(userData.name);

    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  useEffect(() => {
    fetchCountries();
    const intervalId = setInterval(() => {
      fetchCountries();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [fetchCountries]);

  useEffect(() => {
    fetchCountriesBySearch();
  }, [searchTerm, fetchCountriesBySearch]);

  useEffect(() => {
    let filtered = countries;
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (region) {
      filtered = filtered.filter(
        (country) =>
          country.region &&
          country.region.toLowerCase() === region.toLowerCase()
      );
    }
    if (language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).some((lang) =>
            lang.toLowerCase().includes(language.toLowerCase())
          )
      );
    }
    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [countries, searchTerm, region, language]);

  const regionCount = region
    ? countries.filter(
        (country) =>
          country.region &&
          country.region.toLowerCase() === region.toLowerCase()
      ).length
    : countries.length;

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToFavorites = (country) => {
    const exists = favorites.some((fav) => fav.cca3 === country.cca3);
    if (!exists) {
      const updated = [...favorites, country];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
      alert(`${country.name.common} added to favorites!`);
    } else {
      alert(`${country.name.common} is already in favorites.`);
    }
  };

  // Handle card click: fetch full details first
  const handleCountryCardClick = async (country) => {
    setLoadingDetails(true);
    const fullDetails = await fetchCountryByCode(country.cca3);
    setLoadingDetails(false);
    if (fullDetails) setSelectedCountry(fullDetails);
    else setSelectedCountry(country); // fallback
  };

  return (
    <div
      className="min-h-screen px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/new.png')",
        backgroundColor: "#18181b"
      }}
    >
      <div className="max-w-screen-xl mx-auto space-y-8">
        {/* Heading */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide leading-tight text-center mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          Welcome to Country Explorer! 🌍
        </h2>

        {/* Search and Filters */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20 mb-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <SearchBar setSearchTerm={setSearchTerm} />
            <RegionFilter
              setRegion={setRegion}
              region={region}
              regionCount={regionCount}
              countries={countries}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <LanguageFilter setLanguage={setLanguage} />
            <span className="inline-block bg-yellow-200 text-yellow-800 text-lg font-bold px-5 py-2 rounded-full shadow border-2 border-yellow-400 tracking-wide transition-all duration-300">
              {filteredCountries.length} {filteredCountries.length === 1 ? 'Country' : 'Countries'}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <ClockCalendar />
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCountries.length === 0 ? (
            <p className="text-center text-lg text-gray-200 col-span-full">No countries found</p>
          ) : (
            currentCountries.map((country) => (
              <div
                key={country.cca3}
                className="flex flex-col h-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 transition hover:scale-105"
              >
                <CountryCard
                  country={country}
                  onClick={() => handleCountryCardClick(country)}
                />
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white/20 border border-white/30 text-white rounded hover:bg-white/30 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`px-3 py-1 rounded border ${
                  currentPage === num
                    ? 'bg-[#FFD700]/80 text-[#18181b] font-bold border-[#FFD700]/60'
                    : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white/20 border border-white/30 text-white rounded hover:bg-white/30 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Country Details Modal */}
        {(selectedCountry || loadingDetails) && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
            <div className="
              bg-white/20
              backdrop-blur-lg
              p-6
              rounded-xl
              shadow-2xl
              shadow-black/70
              max-w-xl w-full
              relative
              animate-fadeIn
              border border-white/20
              flex flex-col items-center
            ">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <span className="text-white text-lg">Loading country details...</span>
                </div>
              ) : (
                <>
                  <CountryDetails
                    country={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                  <button
                    onClick={() => addToFavorites(selectedCountry)}
                    className="mt-4 bg-[#FFD700]/90 hover:bg-[#FFC300] text-[#18181b] px-4 py-2 rounded-lg transition font-semibold shadow"
                  >
                    ⭐ Add to Favorites
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Globe Map Modal */}
        {showMap && (
          <div className="relative w-full h-96 mt-6 rounded-lg overflow-hidden shadow-md">
            <ReactGlobe
              width="100%"
              height="100%"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              arcsData={filteredCountries}
              arcColor="color"
              arcDashLength={0.5}
            />
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryExplorer;