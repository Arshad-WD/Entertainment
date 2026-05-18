import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Carasol.css';

gsap.registerPlugin(ScrollTrigger);

function Carasol() {
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: "50% 50%",
        end: "150% 50%",
        scrub: 2,
        pin: true,
      },
    });

    tl
      .to("#center", {
        height: "100vh",
      }, 'a')
      .to("#top", {
        top: "-50%",
      }, 'a')
      .to("#bottom", {
        bottom: "-50%",
      }, 'a')
      .to("#top-h1", {
        top: "60%",
      }, 'a')
      .to("#bottom-h1", {
        bottom: "-30%",
      }, 'a')
      .to("#center-h1", {
        top: "-30%",
      }, 'a')
      .to(".content", {
        delay: -0.2,
        marginTop: "0%",
      });

    const handleScroll = () => {
      const mouse = document.querySelector('.mouse');
      const mouseBottom = document.querySelector('.mouseBottom');
      
      if (window.scrollY > 0) {
        if (mouse) mouse.style.display = 'none';
        if (mouseBottom) mouseBottom.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="main">
      <div id="top">
        <h1 id="top-h1" className="text-zinc-950">LuxeVista</h1>
      </div>
      <div id="center" className="bg-[#03000a]">
        <div className="content">
          <h4 className="text-xs uppercase tracking-widest text-red-500 font-extrabold">About Our Studio</h4>
          <h3 className="text-white">
            <i>Crafted</i> for cinematic fidelity and immersive interactivity. <i>Now</i> it is your gateway to explore.
          </h3>
          <button 
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer border-none"
            onClick={() => navigate("/movie")}
          >
            Explore Movies
          </button>
        </div>
      </div>
      <div id="bottom">
        <h1 id="bottom-h1" className="text-zinc-950">LuxeVista</h1>
      </div>
      <div className="mouseBottom">
        <div className="mouse"></div>
      </div>
    </div>
  );
}

export default Carasol;
