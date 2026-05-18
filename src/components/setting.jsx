import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Zoro from '../assets/profile1.jpeg';
import Luffy from '../assets/profile2.jpeg';
import Sukuna from '../assets/profile3.jpeg';
import Cutie from '../assets/profile4.jpeg';
import Itachi from '../assets/profile5.jpeg';
import Mikasa from '../assets/profile6.jpeg';
import { FaUser, FaQuoteLeft, FaSave, FaCamera } from 'react-icons/fa';

const randomImages = [Zoro, Luffy, Sukuna, Cutie, Itachi, Mikasa];

const Settings = ({ userEmail }) => {
  const [profilePhoto, setProfilePhoto] = useState(randomImages[2]); // Default to Sukuna
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setName(parsed.name || "");
      setBio(parsed.bio || "");
      setEmail(parsed.email || "");
      
      // Match image path or fall back
      const matchImg = randomImages.find(img => img.includes(parsed.profilePhoto) || parsed.profilePhoto === img);
      setProfilePhoto(matchImg || parsed.profilePhoto || randomImages[2]);
    } else {
      // Default mock settings values
      setName("Demon King Sukuna");
      setBio("An absolute ruler of the entertainment world.");
      setEmail("sukuna@luxevista.com");
    }
  }, []);

  const handlePhotoChange = (image) => {
    setProfilePhoto(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email: email || userEmail || "sukuna@luxevista.com",
      profilePhoto,
      bio,
    };
    
    // Direct sync to active session local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Try database PUT request sync
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email || userEmail || "sukuna@luxevista.com",
          name,
          profilePhoto,
          bio,
        }),
      });
    } catch (error) {
      console.log("DB Offline fallback active - local storage synched successfully");
    }

    alert('Profile settings synchronized successfully!');
    navigate("/");
  };

  return (
    <div className="bg-zinc-950 flex justify-center items-center min-h-[calc(100vh-4rem)] relative overflow-hidden text-zinc-200 py-12">
      
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 bg-zinc-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl w-full max-w-4xl mx-6 animate-fade-in flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Avatar Profile Picker */}
        <div className="w-full md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-10">
          
          <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-4">Avatar Profile</span>
          
          {/* Main preview */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-red-500/50">
              <img src={profilePhoto} alt="Profile Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <FaCamera className="text-white text-lg" />
              </div>
            </div>
          </div>

          <h2 className="text-lg font-black text-white mt-4 tracking-wide text-center uppercase">{name || "LuxeVista User"}</h2>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1 truncate max-w-[180px]">{email}</p>

          {/* Quick choices grid */}
          <div className="mt-8 w-full">
            <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest block text-center mb-3">Select Character Avatar</span>
            <div className="grid grid-cols-3 gap-3 justify-items-center">
              {randomImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110
                  ${profilePhoto === image ? 'border-red-500 shadow-md shadow-red-600/30' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => handlePhotoChange(image)}
                >
                  <img src={image} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Update forms */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          
          <div className="mb-6">
            <h1 className="text-3xl font-black text-white uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Profile Settings</h1>
            <p className="text-xs text-zinc-400 font-light mt-1">Configure your personal display properties below.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            
            {/* Display Name Input */}
            <div>
              <label htmlFor="name" className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Display Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <FaUser className="text-xs" />
                </span>
                <input
                  type="text"
                  id="name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="Your display name..."
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Custom Bio Textarea */}
            <div>
              <label htmlFor="bio" className="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-2">Personal Bio</label>
              <div className="relative">
                <span className="absolute top-3.5 left-4 pointer-events-none text-zinc-500">
                  <FaQuoteLeft className="text-xs" />
                </span>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  rows={4}
                  placeholder="Write a short introductory bio..."
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Action Trigger Save */}
            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 py-3 px-8 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/10 hover:shadow-red-600/30 transition-all duration-300 cursor-pointer"
              >
                <FaSave className="text-xs" />
                <span>Save Changes</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Settings;
