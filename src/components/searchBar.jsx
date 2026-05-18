import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ value, setValue, placeholder = "Search Cinema..." }) {
  const handleSearch = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div className="relative w-full max-w-xl animate-fade-in">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaSearch className="text-zinc-500 text-sm group-focus-within:text-red-500 transition-colors" />
      </div>
      <input
        type="search"
        name="searchpanel"
        id="searchpanel"
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-zinc-900/60 backdrop-blur-md rounded-full border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all duration-300 text-sm"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
