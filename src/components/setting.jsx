import React, { useState, useEffect } from 'react';
import './Settings.css';
import Zoro from '../assets/profile1.jpeg';
import Luffy from '../assets/profile2.jpeg';
import Sukuna from '../assets/profile3.jpeg';
import Cutie from '../assets/profile4.jpeg';
import Itachi from '../assets/profile5.jpeg';
import Mikasa from '../assets/profile6.jpeg';

const randomImages = [Zoro, Luffy, Sukuna, Cutie, Itachi, Mikasa];

const Settings = ({ userEmail }) => {
  const [profilePhoto, setProfilePhoto] = useState(randomImages[0]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }), // Send email in body
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          const { Name, profilePhoto, bio } = data; // Extracting data from response
          setName(Name); // Setting the fetched name into state
          setProfilePhoto(profilePhoto); // Setting the fetched profile photo
          setBio(bio); // Setting the fetched bio
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Only fetch user data if userEmail is available
    if (userEmail) {
      fetchUserData();
    } else {
      console.error("User email not found.");
    }
  }, [userEmail]);

  const handlePhotoChange = (image) => {
    setProfilePhoto(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name,
          profilePhoto,
          bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Profile Settings</h1>
      <div className="profile-preview">
        <img src={profilePhoto} alt="Profile Preview" className="profile-photo" />
      </div>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name} // The input field displays the fetched name
            onChange={(e) => setName(e.target.value)} // Update name state on input change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div className="image-selection">
          <h3>Select a Profile Photo:</h3>
          <div className="image-options">
            {randomImages.map((image, index) => (
              <div
                key={index}
                className="image-option"
                onClick={() => handlePhotoChange(image)}
              >
                <img src={image} alt={`Profile Option ${index + 1}`} className="option-image" />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
