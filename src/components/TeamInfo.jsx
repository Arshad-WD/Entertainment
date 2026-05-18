import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './TeamInfo.css';

gsap.registerPlugin(ScrollTrigger);

function TeamInfo() {
  useEffect(() => {
    const workInfoItems = document.querySelectorAll(".work_photo-item");
    workInfoItems.forEach((item, index) => {
      item.style.zIndex = workInfoItems.length - index;
    });
    gsap.set(workInfoItems, {
      clipPath: "inset(0% 0% 0% 0%)",
    });
    const animation = gsap.to(workInfoItems, {
      clipPath: "inset(0% 0% 100% 0%)",
      stagger: 0.9,
      ease: "none",
    });
    const trigger = ScrollTrigger.create({
      trigger: ".work",
      start: "top -40%",
      end: "bottom 1%",
      animation: animation,
      scrub: 1, 
      markers: false,
    });
    return () => {
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className=''>
      <section className='work'>
        <div className='work_left'>
          <div className='work_info'>
            <div className='work_left-bl'>
              <span className='work_num'>01</span>
              <h2 className='title'>Shayan Ahmed <span className='stroke'>Backend And Architect</span></h2>
              <button className='work_link' onClick={() => alert('Shayan Ahmed is the Chief Architect of LuxeVista, designing the conceptual database architecture and high-performance backend schemas.')}>View Profile</button>
            </div>
          </div>

          <div className='work_info'>
            <div className='work_left-bl'>
              <span className='work_num'>02</span>
              <h2 className='title'>Imran Ansari <span className='stroke'>Lead Design & Backend</span></h2>
              <button className='work_link' onClick={() => alert('Imran Ansari is our Lead Product Owner, coordinating API integrations across live TMDB & RAWG data grids.')}>View Profile</button>
            </div>
          </div>

          <div className='work_info'>
            <div className='work_left-bl'>
              <span className='work_num'>03</span>
              <h2 className='title'>Arshad Chaudhary<span className='stroke'>Frontend and Backend</span></h2>
              <button className='work_link' onClick={() => alert('Arshad Chaudhary is a Senior Full-Stack Engineer specializing in high-performance WebGL renders and Node.js microservices.')}>View More</button>
            </div>
          </div>

          <div className='work_info'>
            <div className='work_left-bl'>
              <span className='work_num'>04</span>
              <h2 className='title'>Saif Ansari<span className='stroke'>UI/UX & Frontend</span></h2>
              <button className='work_link' onClick={() => alert('Saif Ansari is our Principal UI/UX Architect, crafting elegant responsive glassmorphic cards and interactive scroll experiences.')}>View Profile</button>
            </div>
          </div>
        </div>
        <div className='work_right'>
          <div className='work_right-bl'>
            <div className='work_photo-item' title='1'>
              <img src="/game1.jpeg" alt="Game 1" />
            </div>
            <div className='work_photo-item' title='2'>
              <img src="/game2.jpeg" alt="Game 2" />
            </div>
            <div className='work_photo-item' title='3'>
              <img src="/game3.jpeg" alt="Game 3" />
            </div>
            <div className='work_photo-item' title='4'>
              <img src="/game4.jpeg" alt="Game 4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamInfo;
