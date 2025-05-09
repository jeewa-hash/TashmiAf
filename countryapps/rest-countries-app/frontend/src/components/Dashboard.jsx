import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGlobe from 'react-globe.gl';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.name) setUserName(userData.name);

    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);

    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-teal-100 px-4 py-10">
      <div className="max-w-screen-xl mx-auto space-y-10">

        {/* Header */}
        <h2 className="text-5xl sm:text-6xl font-extrabold text-indigo-900 text-center mb-4">
          🌍 Hello {userName || 'Explorer'}!
        </h2>
        <p className="text-xl text-center text-gray-600">
          Welcome to your Country Explorer Dashboard
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-indigo-700">{countries.length}</h3>
            <p className="text-gray-500 mt-2">Countries Loaded</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-amber-500">{favorites.length}</h3>
            <p className="text-gray-500 mt-2">Favorites</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-3xl font-bold text-teal-600">
              {new Set(countries.map((c) => c.region)).size}
            </h3>
            <p className="text-gray-500 mt-2">Regions Covered</p>
          </div>
        </div>

        {/* Globe */}
        <div className="rounded-lg shadow-md overflow-hidden h-96 mt-10 bg-white">
          <ReactGlobe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            width={undefined}
            height={undefined}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            🏠 Home
          </button>
          <button
            onClick={() => navigate('/country-explorer')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            🌍 Country Explorer
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-md"
          >
            ⭐ Favorites
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md"
          >
            🔐 Login
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/home');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
