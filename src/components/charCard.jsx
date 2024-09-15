import React from 'react';

const CharCard = ({ name, imageUrl, role }) => {
  return (
    <div className="bg-gray-800 p-4 m-2 rounded-lg shadow-lg" style={{ width: '180px', height: '270px' }}>
      <div className="relative w-full" style={{ height: '60%' }}>
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          style={{ borderRadius: '8px' }}
        />
      </div>

      <div className="mt-4 flex flex-col justify-between" style={{ height: '30%' }}>
        <h3 className="text-white text-md font-semibold truncate" style={{ height: '40px', overflow: 'hidden' }}>
          {name}
        </h3>
        <p className="text-gray-400 mt-1" style={{ height: '80px', overflow: 'hidden' }}>
          {role}
        </p>
      </div>
    </div>
  );
};

export default CharCard;
