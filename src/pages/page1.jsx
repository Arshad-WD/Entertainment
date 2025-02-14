import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import './page1.css'

function Page1() {
    gsap.registerPlugin(ScrollTrigger);

        useGSAP(function(){
            gsap.from(".rotateText",{
                transform: 'rotateX(-60deg) scale(0.9)',
                opacity:0,
                duration:1,
                stagger:1,
                scrollTrigger:{
                    trigger:'.rotateText',
                    start:"top 50%",
                    end:"top -300%",
                    scrub:2,
                    // markers:true
                }
                
            })
        })



  return (
    <div className='section2 bg-white text-center p-40 text-black'>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>LuxeVista</h1>
        </div>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>One of</h1>
        </div>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>the Best</h1>
        </div>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>Movie</h1>
        </div>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>Rating</h1>
        </div>
        <div className='rotateText'>
            <h1 className='text-[38vw] text-black font-[techi2] uppercase leading-[30vw]'>Platform</h1>
        </div>
    </div>
  )
}

export default Page1
