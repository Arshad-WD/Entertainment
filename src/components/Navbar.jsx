import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setIsNavVisible(false);
    } else {
      // Scrolling up
      setIsNavVisible(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

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
      </nav>

      <div className='auth-links hidden lg:flex space-x-4'>
        <Link to="/sign-in" className='nav-link'>LOGIN</Link>
        <Link to="/sign-in" className='nav-link'>SIGN IN</Link>
      </div>

      {isMobileMenuOpen && (
        <div className='mobile-nav lg:hidden flex flex-col bg-gray-800 text-white p-4 absolute top-16 right-0 w-48 z-50'>
          <Link to="/" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link to="/movie" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>MOVIE</Link>
          <Link to="/game" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>GAME</Link>
          <Link to="/login" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>LOGIN</Link>
          <Link to="/signup" className='nav-link-mobile' onClick={() => setIsMobileMenuOpen(false)}>SIGN IN</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
