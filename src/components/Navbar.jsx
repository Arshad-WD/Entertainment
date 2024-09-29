import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tempImg from '../assets/temperory.jpeg';
import './responsive.css'


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/sign-in');
  };

  return (
    <div
      className={`navbar bg-slate-800 text-white flex justify-between items-center p-4 sticky top-0 z-50 transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
      }`}
      style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
    >
      <h1 className='brand text-2xl font-bold hover:text-3xl'>LuxeVista</h1>
      
      <div 
        className='hamburger-menu lg:hidden cursor-pointer' 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        &#9776;
      </div>

      <nav className='menu flex-grow hidden lg:flex justify-center items-center space-x-6'>
        <Link to="/" className='nav-link'>HOME</Link>
        <Link to="/movie" className='nav-link'>MOVIE</Link>
        <Link to="/game" className='nav-link'>GAME</Link>
        <Link to="/about" className='nav-link'>About</Link>
      </nav>

      <div className='auth-links hidden lg:flex items-center'>
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center focus:outline-none">
              <img src={tempImg} alt="Profile" className="w-10 h-10 rounded-full" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg p-2 flex flex-col animate-fade-in">
                <Link to="/settings" className="px-4 py-2 hover:bg-gray-700">Settings</Link>
                <Link to="/prime" className="px-4 py-2 hover:bg-gray-700">Prime Member</Link>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/sign-in" className='nav-link' onClick={handleLogin}>LOGIN</Link>
            <div className="mx-2" /> 
            <Link to="/sign-in" className='nav-link' onClick={handleLogin}>SIGN IN</Link>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className='mobile-nav lg:hidden flex flex-col bg-gray-800 text-white p-4 absolute top-16 right-0 w-48 z-50'>
          <Link to="/" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link to="/movie" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>MOVIE</Link>
          <Link to="/game" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>GAME</Link>
          <div className="flex items-center mt-2">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center focus:outline-none">
              <img src={tempImg} alt="Profile" className="w-10 h-10 rounded-full z-10" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg p-2 flex flex-col animate-fade-in">
                <Link to="/settings" className="px-4 py-2 hover:bg-gray-700">Settings</Link>
                <Link to="/prime" className="px-4 py-2 hover:bg-gray-700">Prime Member</Link>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
          <Link to="/sign-in" className='nav-link-mobile' onClick={handleLogin}>LOGIN</Link>
          <Link to="/sign-in" className='nav-link-mobile' onClick={handleLogin}>SIGN IN</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
