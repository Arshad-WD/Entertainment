import React, { useState } from 'react';

function SearchBar() {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    setValue(e.target.value);
    console.log(e.target.value); // Log the value to the console on each key press
  };

  return (
    <div className=''>
      <input
        type="search"
        name='searchpanel'
        id='searchpanel'
        placeholder='Search Movie..'
        className='p-3 w-[40rem] rounded-2xl outline-none text-black'
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
