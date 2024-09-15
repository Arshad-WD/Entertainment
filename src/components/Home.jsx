import React, { useEffect, useRef } from 'react';
import introvid from '../assets/introvid.mp4';
import cinema from '../assets/cinema.mp4';
import game from '../assets/game.mp4';
import game1 from '../assets/game1.mp4';
import game2 from '../assets/game2.mp4';
import game3 from '../assets/game3.mp4';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../index.css';

const Home = () => {
  const cursorRef = useRef(null);
  const cursorRayRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;
      }

      if (cursorRayRef.current) {
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const angle = Math.atan2(cursorY - window.innerHeight / 2, cursorX - window.innerWidth / 2) * (180 / Math.PI);
        cursorRayRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className='overflow-x-hidden bg-black'>
        <div className="relative flex items-center justify-center h-screen mb-2 overflow-hidden bg-black">
          <nav className="absolute top-0 left-0 w-full z-50">
            <div className='bg-opacity-50 bg-transparent text-white list-none flex justify-between items-center p-4 hover:bg-slate-800'>
              <h1 className='font-sans font-bold text-2xl hover:text-3xl'>LuxeVista</h1>
              <div className='flex space-x-8 m-5'>
                <Link className='p-4 border-2 border-red-900 rounded-md hover:text-xl ' to="/movie"><li><h1>PRODUCT</h1></li></Link>
                <Link className='p-4 border-2 border-red-900 rounded-s-full hover:text-xl ' to="/"><li><h1>SIGN IN</h1></li></Link>
                <Link className='p-4 border-2 border-red-900 rounded-r-full hover:text-xl ' to="/"><li><h1>SIGN UP</h1></li></Link>
              </div>
            </div>
          </nav>
          <div className="relative z-30 p-5 text-2xl text-white bg-opacity-50 rounded-xl">
            <p className='font-serif font-bold text-3xl animate-slide-in'>WELCOME TO ENTERTAINMENT STUDIO</p>
            <p>Discover the art in every moment. Elevate your day with experiences that spark joy and <br />ignite your passion for creativity.</p>
          </div>
          <video width="100%" height="auto" className="absolute z-10 w-auto min-w-full min-h-full max-w-none" autoPlay loop muted>
            <source src={introvid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className='bg-black h-screen w-screen bg-opacity-10 p-20 pt-14 text-white relative'>
        <div className='absolute top-0 left-0 w-full h-16 overflow-hidden flex items-center bg-yellow-400'>
          <div className='marquee-container w-full'>
            <div className='marquee-text whitespace-nowrap animate-marquee'>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-20 overflow-hidden flex items-center bg-yellow-400'>
          <div className='marquee-container w-full'>
            <div className='marquee-text whitespace-nowrap animate-marquee-reverse'>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
              <span className='text-xl font-bold text-gradient'>- This is the work of a developer</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full w-full text-center bg-temp bg-contain bg-center">
          <div>
            <h1 className='font-serif font-bold text-2xl text-white pt-16'>
              WE PROVIDE A HUGE NUMBER OF CONTENT, SO YOU NEVER HAVE TO STOP
            </h1>
            <p className='text-xl text-white'>
              Step into a world where imagination knows no bounds. <br />
              Let every day be a new adventure, filled with endless creativity and wonder.
            </p>
          </div>
          <div className='flex justify-around p-10 font-serif font-bold text-3xl'>
            <Link to={'/movie'}><li className='list-none'>MOVIES</li></Link>
            <li className='list-none'>TV SERIES</li>
            <Link to={'/game'}><li className='list-none'>GAMING</li></Link>
            <li className='list-none'>MUSIC</li>
          </div>
        </div>
      </div>

      <div className='flex w-full'>
        <div className="bg-movies pt-20 text-9xl text-zinc-50 h-screen w-screen bg-contain bg-center animate text-shadow-lg shadow-blue-500 bg-red-100">
          COVER WIDE RANGE ON MOVIE DETAILS
        </div>
        <div className='bg-black text-white p-5 border-white border-2 text-xl'>
          <video src={cinema} autoPlay loop muted className='justify-center p-12 pt-36 relative'></video>
          <p>Connect with and explore the ENTERTAINMENT STUDIO</p>
          <p>Unleash the power of creativity in your everyday life. Dive into a world where entertainment becomes inspiration, and every day feels brighter.</p>
        </div>
      </div>

      <div className='flex bg-black h-[80vh] py-10'>
        <div className='flex flex-wrap w-full'>
          <div className='w-1/2 flex flex-col justify-between'>
            {/* Top-left video */}
            <motion.div className='flex justify-center'
              animate={{ x: [-500, -15, -50], opacity: 1, scale: 1 }}
              transition={{
                duration: 6,
                delay: 0.6,
                ease: [0.5, 0.71, 0.8, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}>
              <video
                width='50%'
                height='50%'
                className='z-10 w-5/6 h-5/6'
                autoPlay
                loop
                muted
              >
                <source src={game} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            {/* Bottom-left video */}
            <motion.div className='flex justify-center'
              animate={{ x: [-500, -15, -50], opacity: 1, scale: 1 }}
              transition={{
                duration: 8,
                delay: 0.6,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}>
              <video
                width='50%'
                height='50%'
                className='z-10 w-5/6 h-5/6'
                autoPlay
                loop
                muted
              >
                <source src={game1} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            {/* Top-right video */}
            <motion.div className='flex justify-center'
              animate={{ x: [500, -15, -50], opacity: 1, scale: 1 }}
              transition={{
                duration: 6,
                delay: 1,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}>
              <video
                width='50%'
                height='50%'
                className='z-10 w-5/6 h-5/6'
                autoPlay
                loop
                muted
              >
                <source src={game2} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            {/* Bottom-right video */}
            <motion.div className='flex justify-center'
              animate={{ x: [500, -15, -50], opacity: 1, scale: 1 }}
              transition={{
                duration: 8,
                delay: 1,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}>
              <video
                width='50%'
                height='50%'
                className='z-10 w-5/6 h-5/6'
                autoPlay
                loop
                muted
              >
                <source src={game3} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cursor elements */}
      <div ref={cursorRef} className="cursor fixed top-0 left-0 w-10 h-10 bg-white rounded-full pointer-events-none z-50"></div>
      <div ref={cursorRayRef} className="cursor-ray fixed top-0 left-0 w-1 h-1 bg-white pointer-events-none z-50"></div>
    </>
  );
};

export default Home;
