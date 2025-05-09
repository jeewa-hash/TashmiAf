import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';

const WorldMap = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    fetch('//unpkg.com/world-atlas/countries-110m.json')
      .then(res => res.json())
      .then(worldData => {
        const features = topojson.feature(worldData, worldData.objects.countries).features;
        setCountries(features);
        globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 2000);
      });
  }, []);

  const handleCountryClick = async (country) => {
    const countryCode = country.id;
    
    // Check if country is already selected
    if (selectedCountries.includes(countryCode)) return;
    
    // Limit selection to 2 countries
    const newSelected = [...selectedCountries, countryCode].slice(-2);
    setSelectedCountries(newSelected);
    
    setLoading(true);
    
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = await res.json();
      const countryInfo = data[0];
      
      setCountryData(prev => {
        const updated = prev.filter(c => c.cca3 !== countryCode);
        return [...updated, countryInfo].slice(-2);
      });

      const [lat, lng] = countryInfo.latlng;
      globeEl.current.pointOfView({ lat, lng, altitude: 1.5 }, 1500);
    } catch (err) {
      console.error('Error fetching country data:', err);
    }
    
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries}
        polygonCapColor={({ properties }) => {
          if (selectedCountries[0] === properties?.iso_a3) return 'rgba(0, 255, 100, 0.6)';
          if (selectedCountries[1] === properties?.iso_a3) return 'rgba(100, 180, 255, 0.6)';
          return 'rgba(100,180,255,0.35)';
        }}
        polygonSideColor={() => 'rgba(30,30,30,0.15)'}
        polygonStrokeColor={() => '#111'}
        onPolygonClick={handleCountryClick}
        polygonsTransitionDuration={300}
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* Comparison Panel */}
      {countryData.length > 0 && (
        <div className="fixed bottom-10 right-10 z-50 max-w-4xl w-[95vw] backdrop-blur-2xl bg-gray-900/60 border border-white/30 rounded-3xl shadow-2xl p-6 animate-tornado">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Country Comparison</h2>
            <button
              onClick={() => {
                setSelectedCountries([]);
                setCountryData([]);
              }}
              className="bg-white/80 hover:bg-white text-gray-800 px-4 py-2 rounded-full transition"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {countryData.map((data, index) => (
              <div key={data.cca3} className="relative">
                <button
                  onClick={() => {
                    setSelectedCountries(prev => prev.filter(c => c !== data.cca3));
                    setCountryData(prev => prev.filter(c => c.cca3 !== data.cca3));
                  }}
                  className="absolute top-0 right-0 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 text-lg rounded-full shadow flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="space-y-4 text-white">
                  <div className="flex items-center gap-4">
                    <img
                      src={data.flags.svg}
                      alt={data.name.common}
                      className="w-16 h-12 rounded border shadow-md"
                    />
                    <h3 className="text-xl font-bold">{data.name.common}</h3>
                  </div>

                  <div className="space-y-2">
                    <p><span className="font-semibold">Capital:</span> {data.capital?.[0] || 'N/A'}</p>
                    <p><span className="font-semibold">Population:</span> {data.population.toLocaleString()}</p>
                    <p><span className="font-semibold">Area:</span> {data.area.toLocaleString()} km²</p>
                    <p><span className="font-semibold">Region:</span> {data.region}</p>
                    <p><span className="font-semibold">Subregion:</span> {data.subregion}</p>
                    <p><span className="font-semibold">Languages:</span> {data.languages ? Object.values(data.languages).join(', ') : 'N/A'}</p>
                    <p><span className="font-semibold">Currencies:</span> {data.currencies ? Object.values(data.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold animate-pulse z-20">
          🌐 Loading country data...
        </div>
      )}

      <style>{`
        @keyframes tornado {
          0% { transform: rotate(0deg) scale(0); opacity: 0; }
          50% { transform: rotate(720deg) scale(1.2); opacity: 1; }
          100% { transform: rotate(1080deg) scale(1); opacity: 1; }
        }
        .animate-tornado {
          animation: tornado 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
