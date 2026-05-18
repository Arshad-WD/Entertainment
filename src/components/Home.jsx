import React, { useEffect, useRef, useState } from "react";
import introvid from "../assets/introvid.mp4";
import cinema from "../assets/cinema.mp4";
import { Link, useNavigate } from "react-router-dom";
import { FaFilm, FaGamepad, FaTv, FaMusic, FaUser, FaCompass, FaArrowRight, FaPlay, FaChevronRight } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import "../index.css";

const Home = () => {
  const cursorRef = useRef(null);
  const cursorRayRef = useRef(null);
  const navigate = useNavigate();
  
  // Simulation of auth state
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let isRunning = true;
    const updateCursor = () => {
      if (!isRunning) return;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Smooth lag interpolation
      const lerpFactor = 0.15;
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      if (cursorRayRef.current) {
        cursorRayRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(updateCursor);
    };

    requestAnimationFrame(updateCursor);

    return () => {
      isRunning = false;
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const genresMarquee = [
    "ACTION MOVIE BLOCKBUSTERS", "OPEN WORLD ACTION RPGs", "CRITICALLY ACCLAIMED DRAMAS", 
    "CO-OP MULTIPLAYER CAMPAIGNS", "ANIME SENSATIONS", "HEART-POUNDING SCI-FI THRILLERS", 
    "CYBERPUNK FUTURISM", "INDIE GAME DARLINGS", "HOLLYWOOD MASTERPIECES", "ESPORTS CHAMPIONSHIPS"
  ];

  return (
    <>
      <div className="relative min-h-screen bg-[#03000a] overflow-x-hidden text-zinc-100 selection:bg-red-500 selection:text-white">
        
        {/* HERO SECTION WITH BG VIDEO */}
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Top Elegant Navbar Overlay */}
          <nav className="absolute top-0 left-0 w-full z-50 p-6 md:px-12 bg-gradient-to-b from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              
              {/* Sleek Logo */}
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                <RiMovie2Line className="text-red-500 text-3xl animate-pulse" />
                <span className="font-sans font-black text-2xl tracking-wider bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  LuxeVista
                </span>
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center space-x-6">
                <Link to="/movie" className="hidden sm:inline-block text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-colors duration-300 py-2">
                  Movies
                </Link>
                <Link to="/game" className="hidden sm:inline-block text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-colors duration-300 py-2">
                  Games
                </Link>
                <Link to="/about" className="hidden sm:inline-block text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-colors duration-300 py-2">
                  About
                </Link>

                {/* Profile/Auth Actions */}
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/settings" className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all duration-300">
                      <FaUser className="text-red-500 text-sm" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{user.name || "Profile"}</span>
                    </Link>
                    <button onClick={handleLogout} className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
                    <Link to="/login" className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full text-zinc-300 hover:text-white transition-all">
                      Login
                    </Link>
                    <Link to="/sign-in" className="px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Hero Content with radial and linear masks for ultimate readability */}
          <div className="relative z-30 max-w-4xl mx-auto px-6 text-center mt-12 flex flex-col items-center">
            
            <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-red-600/10 border border-red-500/30 text-red-500 mb-6 animate-pulse">
              ⚡ Welcome to LuxeVista Entertainment
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Discover the Art of <br />
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Digital Spectacle
              </span>
            </h1>

            <p className="text-md md:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-10 font-light">
              Elevate your daily entertainment. Dive into rich databases of critically 
              acclaimed cinema, legendary interactive gaming, and real-time community statistics.
            </p>

            {/* Premium CTA Pill Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <button 
                onClick={() => navigate("/movie")}
                className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span>Browse Movies</span>
                <FaPlay className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate("/game")}
                className="group flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 font-bold px-8 py-4 rounded-full hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span>Explore Gaming</span>
                <FaGamepad className="text-sm group-hover:scale-110 transition-transform text-red-500" />
              </button>
            </div>
          </div>

          {/* Mask layers on top of video */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#03000a] via-black/45 to-[#03000a]/80"></div>
          
          <video
            className="absolute z-10 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={introvid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* MODERN REVOLVING MARQUEE FOR GENRES */}
        <div className="w-full py-5 bg-black/80 border-y border-white/5 relative z-30">
          <div className="marquee-container">
            <div className="marquee-text gap-8 items-center">
              {/* Render twice for continuous loop */}
              {[...genresMarquee, ...genresMarquee].map((tag, idx) => (
                <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
                  <span className="text-zinc-600 font-extrabold text-xs">•</span>
                  <span className="text-sm font-bold tracking-widest bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent hover:from-red-400 hover:to-pink-500 transition-all duration-300 cursor-pointer">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURE CATEGORIES / VALUE PROPOSITION */}
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-30">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">Unrivaled Portals</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-white">
              Endless Entertainment Awaits
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mt-4 font-light">
              Step into curated, highly interactive databases with modern design layouts built around speed and visual splendor.
            </p>
          </div>

          {/* Interactive glassmorphic grid items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* MOVIES PORTAL */}
            <div 
              onClick={() => navigate("/movie")}
              className="group glass-panel-glow p-8 rounded-3xl hover:border-red-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between h-80 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/25 transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                  <FaFilm className="text-red-500 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">Cinema Portal</h3>
                <p className="text-zinc-400 text-sm mt-3 font-light leading-relaxed">
                  Browse weekly trends, detailed casting, ratings, and custom movie recommendation matrices.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-red-500 group-hover:text-red-400 transition-colors">
                <span>Enter Cinema</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* GAMING PORTAL */}
            <div 
              onClick={() => navigate("/game")}
              className="group glass-panel-glow p-8 rounded-3xl hover:border-pink-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between h-80 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-3xl group-hover:bg-pink-600/25 transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
                  <FaGamepad className="text-pink-500 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Gaming Hub</h3>
                <p className="text-zinc-400 text-sm mt-3 font-light leading-relaxed">
                  Discover game ratings, platform availabilities, and suggested titles with infinite scrolling catalogs.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-pink-500 group-hover:text-pink-400 transition-colors">
                <span>Explore Gaming</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* TV SERIES */}
            <div 
              onClick={() => navigate("/movie")}
              className="group glass-panel-glow p-8 rounded-3xl hover:border-amber-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between h-80 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl group-hover:bg-amber-600/25 transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <FaTv className="text-amber-500 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">TV Series</h3>
                <p className="text-zinc-400 text-sm mt-3 font-light leading-relaxed">
                  Binge on popular series, filter by genres, and track real-time ratings from TMDB.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                <span>View Series</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* MUSIC SECTION */}
            <div 
              onClick={() => navigate("/about")}
              className="group glass-panel-glow p-8 rounded-3xl hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between h-80 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl group-hover:bg-cyan-600/25 transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <FaMusic className="text-cyan-500 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">About & Team</h3>
                <p className="text-zinc-400 text-sm mt-3 font-light leading-relaxed">
                  Meet the creators, read our story, and explore the split-screen portfolio presentations.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors">
                <span>Meet Team</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* CINEMATIC PREVIEW SHOWCASE PANEL */}
        <div className="max-w-7xl mx-auto px-6 pb-24 relative z-30">
          <div className="glass-panel-glow rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 border border-white/10">
            
            {/* Left Info Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">Inside Look</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Premium Cinematic <br />
                Theater Interface
              </h2>
              <p className="text-zinc-300 font-light leading-relaxed mb-6">
                LuxeVista features stunning responsive video integrations, offering preview theaters that stream introductory credits and preview clips effortlessly.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Fully interactive custom controls</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Integrated TMDB trailers & suggestions</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Elegant overlay masks for flawless styling</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate("/movie")}
                className="group flex items-center space-x-2 text-red-500 font-bold hover:text-red-400 transition-colors w-max"
              >
                <span>Discover All Features</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Video Theater Frame */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-zinc-950 p-3 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <video
                  src={cinema}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-xl object-cover"
                ></video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-6">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Preview Trailer</h4>
                    <p className="text-xs text-zinc-400">Grand Cinema Hall Stream</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg text-white text-xs animate-bounce">
                    <FaPlay />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* REVERSE MARQUEE FOR FOOTER */}
        <div className="w-full py-4 bg-black/60 border-t border-white/5 relative z-30">
          <div className="marquee-container">
            <div className="marquee-text gap-8 items-center animate-marquee-reverse">
              {[...genresMarquee, ...genresMarquee].reverse().map((tag, idx) => (
                <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
                  <span className="text-zinc-700 font-extrabold text-xs">•</span>
                  <span className="text-xs font-semibold tracking-widest text-zinc-500 hover:text-pink-500 transition-colors cursor-pointer">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOM SLEEK CURSORS */}
        <div
          ref={cursorRef}
          className="cursor hidden md:block"
        ></div>
        <div
          ref={cursorRayRef}
          className="cursor-ray hidden md:block"
        ></div>
      </div>
    </>
  );
};

export default Home;
