import React, { useState, useEffect } from 'react';

const RegionFilter = ({ setRegion }) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch regions from the API
    const fetchRegions = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const uniqueRegions = [
          ...new Set(data.map((country) => country.region).filter(Boolean)),
        ];
        setRegions(['All', ...uniqueRegions]); // Add 'All' as the default option
        setLoading(false);
      } catch (error) {
        console.error('Error fetching regions:', error);
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="flex items-center">
      {loading ? (
        <span>Loading regions...</span>
      ) : (
        <select
          onChange={(e) => setRegion(e.target.value)}
          className="px-2 py-1 text-sm rounded border"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RegionFilter;
