// LanguageDropdown.js
import React from 'react';

const LanguageDropdown = ({ languages, selectedLanguage, onLanguageChange }) => {

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'ja', name: 'Japanese' },
        // Add more languages as needed
      ];      

  return (
    <select 
      value={selectedLanguage} 
      onChange={(e) => onLanguageChange(e.target.value)} 
      className="p-2 rounded-md bg-gray-700 text-white"
    >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
