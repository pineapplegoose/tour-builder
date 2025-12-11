"use client";

// import Particles, { initParticlesEngine } from "@tsparticles/react";

import { Si99designs, SiActiveloop, SiActivision, SiAffine, SiAgora, SiBower, SiBoxysvg, SiBrave, SiBrenntag, SiBruno } from '@icons-pack/react-simple-icons'

import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';

// import { useEffect, useState } from 'react';

// import {Container} from "@tsparticles/engine"
// import { loadSlim } from "@tsparticles/slim"



export const Hero = () => {
  const route = useRouter()
  //   const [init, setInit] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       // load slim into the engine that tsparticles uses internally
  //       await loadSlim((window as any).tsParticles?.engine ?? ({} as unknown));
  //       setInit(true);
  //     })();
  //   }, []);
  // const particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log(container);
  // };




  const title = "Jagora";

  const parent = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.4 }
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>

      <div className=" w-full h-[600px] overflow-hidden relative bg-(--neutral) flex pt-50 flex-col items-center">



        {/* {init && <Particles
          className="absolute inset-0 "
          id="tsparticles"
          style={{ position: "absolute", height: "100%", width: "100%" }}
            particlesLoaded={particlesLoaded}
            options={{
                // background: {
                //     color: {
                //         value: "#0d47a1",
                //     },
                // },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#007B8C",
                    },
                    links: {
                        color: "#FF8A00",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
          } */}

        <motion.h1
          variants={parent}
          initial="hidden"
          animate="show"
          className="font-bold text-(--primary) pb-2 md:text-7xl sm:text-6xl text-3xl text-center ">
          {title.split("").map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="capitalize md:text-4xl text-center pb-5">Simplify your first-time experience. instantly.</p>
        <div className="flex items-center justify-center gap-2.5">

          <button className='text-white demo-two bg-(--accent) tracking-tight px-4 py-2 rounded'>See Demo</button>
          <button onClick={() => route.push("/dashboard")} className='text-white bg-(--primary) demo tracking-tight px-4 py-2 rounded'>Get Started</button>
        </div>
      </div>
      <p className='font-bold md:text-4xl text-2xl'>Our Partners</p>
      <div className='py-20 bg-gray-100'>
        <Marquee pauseOnHover={true} gradient={true} speed={50}>
          <Si99designs size={80} color="black" className='mr-20' />
          <SiActiveloop size={80} color="black" className='mr-20' />
          <SiActivision size={80} color="black" className='mr-20' />
          <SiAffine size={80} color="black" className='mr-20' />
          <SiAgora size={80} color='black' className='mr-20' />
          <SiBower size={80} color='black' className='mr-20' />
          <SiBoxysvg size={80} color='black' className='mr-20' />
          <SiBrave size={80} color='black' className='mr-20' />
          <SiBrenntag size={80} color='black' className='mr-20' />
          <SiBruno size={80} color='black' className='mr-20' />
        </Marquee>
      </div>
    </>
  )
}