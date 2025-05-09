// src/components/LanguageFilter.js
import React from 'react';

const LanguageFilter = ({ languages }) => {
    // Ensure languages is an array, or default to an empty array if undefined
    const safeLanguages = languages || [];
  
    // Now use flatMap safely
    const filteredLanguages = safeLanguages.flatMap((lang) => {
      // Your logic for filtering here
      return lang; // Example, adjust based on your actual logic
    });
  
    return (
      <div>
        {filteredLanguages.map((language, index) => (
          <div key={index}>{language}</div>
        ))}
      </div>
    );
  };
  
  export default LanguageFilter;
  
