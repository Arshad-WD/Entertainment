import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Carasol.css';

gsap.registerPlugin(ScrollTrigger);

function Carasol() {


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
  
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup event listener and GSAP scroll triggers
      return () => {
        window.removeEventListener('scroll', handleScroll); // Clean up scroll event listener
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up ScrollTriggers
      };
    }, []);

  return (
    <div id="main">
      <div id="top">
        <h1 id="top-h1">LuxeVista</h1>
      </div>
      <div id="center">
        <div className="content">
          <h4>LuxeVista</h4>
          <h3>
            <i>Developer</i> done there work so,  <i>Now</i> it's your job to use this and appreciate.
          </h3>
          <div className="btn">
            <h5>ENTER MOVUE</h5>
          </div>
        </div>
      </div>
      <div id="bottom">
        <h1 id="bottom-h1">LuxeVista</h1>
      </div>
      <div className='mouseBottom'>
        <div className='mouse'>

        </div>
      </div>
    </div>
  );
}

export default Carasol;
