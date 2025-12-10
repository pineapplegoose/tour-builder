import { Si99designs, SiActiveloop, SiActivision, SiAffine, SiAgora, SiBower, SiBoxysvg, SiBrave, SiBrenntag, SiBruno } from '@icons-pack/react-simple-icons'

import Marquee from "react-fast-marquee";
import { motion } from "motion/react";

export const Hero = () => {
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
      <div className="min-h-screen bg-(--neutral) flex pt-50 flex-col items-center">
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
          <button className='text-white bg-(--primary) demo tracking-tight px-4 py-2 rounded'>Get Started</button>
        </div>
      </div>
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
