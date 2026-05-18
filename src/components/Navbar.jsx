import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RiMovie2Line } from 'react-icons/ri';
import { FaUser, FaCog, FaCrown, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import tempImg from '../assets/temperory.jpeg';
import Sukuna from '../assets/profile3.jpeg'; // Use high quality Sukuna image as default profile
import './responsive.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Read local auth state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Simulate standard default user if they clicked "LOGIN" without account
      // to keep mock premium experience working flawlessly.
      setUser({
        name: "Demon King Sukuna",
        email: "sukuna@luxevista.com",
        profilePhoto: Sukuna,
        bio: "An absolute ruler of the entertainment world."
      });
    }
  }, [location]);

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop && currentScrollTop > 80) {
      setIsNavVisible(false); // Hide on scroll down
    } else {
      setIsNavVisible(true);  // Show on scroll up
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  return (
    <div
      className={`glass-nav text-white flex justify-between items-center px-6 md:px-12 py-4 sticky top-0 z-50 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 shadow-lg'
      }`}
    >
      {/* Brand logo */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
        <RiMovie2Line className="text-red-500 text-3xl animate-pulse" />
        <h1 className="font-sans font-black text-2xl tracking-wider bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          LuxeVista
        </h1>
      </div>
      
      {/* Hamburger menu on mobile */}
      <div 
        className="hamburger-menu lg:hidden cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors z-50" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={22} className="text-red-500" /> : <FaBars size={22} />}
      </div>

      {/* Main navigation menu for desktop */}
      <nav className="menu hidden lg:flex justify-center items-center space-x-8">
        <Link to="/" className={`nav-link text-xs font-bold tracking-widest uppercase hover:text-red-500 transition-colors duration-300 relative py-2 ${location.pathname === '/' ? 'text-red-500 font-extrabold' : 'text-zinc-300'}`}>
          HOME
          {location.pathname === '/' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>}
        </Link>
        <Link to="/movie" className={`nav-link text-xs font-bold tracking-widest uppercase hover:text-red-500 transition-colors duration-300 relative py-2 ${location.pathname.startsWith('/movie') ? 'text-red-500 font-extrabold' : 'text-zinc-300'}`}>
          MOVIE
          {location.pathname.startsWith('/movie') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>}
        </Link>
        <Link to="/game" className={`nav-link text-xs font-bold tracking-widest uppercase hover:text-red-500 transition-colors duration-300 relative py-2 ${location.pathname.startsWith('/game') ? 'text-red-500 font-extrabold' : 'text-zinc-300'}`}>
          GAME
          {location.pathname.startsWith('/game') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>}
        </Link>
        <Link to="/watchparty" className={`nav-link text-xs font-bold tracking-widest uppercase hover:text-purple-400 transition-colors duration-300 relative py-1 ${location.pathname.startsWith('/watchparty') ? 'text-purple-400 font-extrabold' : 'text-zinc-300'}`}>
          <span className="flex items-center space-x-1.5 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full text-[10px] tracking-wider animate-pulse hover:border-purple-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>Watch Party</span>
          </span>
        </Link>
        <Link to="/about" className={`nav-link text-xs font-bold tracking-widest uppercase hover:text-red-500 transition-colors duration-300 relative py-2 ${location.pathname === '/about' ? 'text-red-500 font-extrabold' : 'text-zinc-300'}`}>
          ABOUT
          {location.pathname === '/about' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>}
        </Link>
      </nav>

      {/* Auth Actions & Profile dropdown for desktop */}
      <div className="auth-links hidden lg:flex items-center">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
              className="flex items-center space-x-3 focus:outline-none p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300"
            >
              <img 
                src={user.profilePhoto || Sukuna} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-red-500/50 object-cover" 
              />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center space-x-1">
                <span>{user.name.split(" ")[0]}</span>
                {user.prime && <FaCrown className="text-amber-400 text-[10px] animate-pulse" />}
              </span>
            </button>
            
            {/* Animated Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 flex flex-col z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-white/5 mb-1">
                  <p className="text-xs font-semibold text-zinc-400">Signed in as</p>
                  <p className="text-sm font-bold truncate text-white">{user.email}</p>
                </div>
                <Link 
                  to="/settings" 
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <FaCog className="text-zinc-500 text-sm" />
                  <span>Settings</span>
                </Link>
                <Link 
                  to="/prime" 
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
                >
                  <FaCrown className="text-sm" />
                  <span>Prime Status</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left w-full mt-1 border-t border-white/5 pt-3"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/10">
            <Link to="/login" className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full text-zinc-300 hover:text-white transition-all">
              Login
            </Link>
            <Link to="/sign-in" className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav lg:hidden flex flex-col bg-zinc-950/95 backdrop-blur-2xl border-l border-white/10 p-6 absolute top-16 right-0 w-64 h-[calc(100vh-4rem)] z-40 animate-fade-in shadow-2xl space-y-6">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-bold tracking-widest uppercase text-zinc-200 hover:text-red-500 transition-colors py-2 border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
            <Link to="/movie" className="text-sm font-bold tracking-widest uppercase text-zinc-200 hover:text-red-500 transition-colors py-2 border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>MOVIE</Link>
            <Link to="/game" className="text-sm font-bold tracking-widest uppercase text-zinc-200 hover:text-red-500 transition-colors py-2 border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>GAME</Link>
            <Link to="/watchparty" className="text-sm font-bold tracking-widest uppercase text-purple-400 hover:text-purple-300 transition-colors py-2 border-b border-white/5 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span>WATCH PARTY</span>
            </Link>
            <Link to="/about" className="text-sm font-bold tracking-widest uppercase text-zinc-200 hover:text-red-500 transition-colors py-2 border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <img src={user.profilePhoto || Sukuna} alt="Profile" className="w-10 h-10 rounded-full border border-red-500/50 object-cover" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-white uppercase truncate flex items-center space-x-1">
                      <span>{user.name}</span>
                      {user.prime && <FaCrown className="text-amber-400 text-[10px]" />}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>
                <Link to="/settings" className="flex items-center space-x-2 text-sm font-semibold text-zinc-300 hover:text-white py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaCog className="text-zinc-500" />
                  <span>Settings</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-sm font-bold text-red-400 hover:text-red-300 py-1 text-left w-full">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" className="w-full text-center py-2.5 text-xs font-bold tracking-wider uppercase rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/sign-in" className="w-full text-center py-2.5 text-xs font-bold tracking-wider uppercase rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
