import { Footer } from '@/components/Footer';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';
import { Navbar } from '@/components/Navbar';
import React from 'react'

const About = () => {
  return (
    <>
      <Navbar/>
    <div className=' p-6 md:p-12 bg-(--neutral)'>
      <div>
        <h1 className='md:text-5xl text-2xl pb-6'>The Frictionless Path To User Success</h1>
      </div>
      <div className='flex justify-center md:flex-row flex-col items-center gap-2.5'>
                <div className="relative w-full overflow-hidden ">
            <Image
              src="/onboardd.jpg"
              alt="Modern house"
            className="w-full  h-80  object-cover"
            width={300}
            height={200}
            
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <p className=" text-lg max-w-md font-semibold text-white">
                Jagora is there to making your onboarding experience smooth as it can ever imagine
              </p>
            </div>
          </div>
      <ImageCarousel/>
      </div>

      <div className=' pt-6 md:pt-12 '>
        <h2 className='py-8 text-2xl md:text-5xl'>Jagora: Mission</h2>
        <div className="@container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 md:grid-rows-3 gap-4 auto-rows-[minmax(100px,auto)] sm:col-span-full">
          {/* Transparent Box */}
          <div className="bg-gray-100 md:col-span-4 md:row-span-1 rounded-xl" />

          {/* Black Box - Dedication */}
          <div className="bg-black text-white md:col-span-2  md:row-span-2 p-4 rounded-xl flex flex-col justify-between @max-2xl:h-120 row-start-7 sm:col-span-full">
            <div className="text-2xl sm:text-4xl font-bold">100</div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Dedication</h3>
              <p className="text-sm">
                We are committed to excellence and continuous improvement in
                every project. Our passion drives us to consistently deliver
                outstanding results.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-purple-200 md:col-span-3 md:row-span-1 row-start-2 p-4 rounded-xl  @max-2xl:h-60 flex justify-between flex-col sm:col-span-full">
            <h3 className="text-2xl sm:text-4xl font-bold">01</h3>
            <div>
              <p className="font-semibold">Mission</p>
              <p className="text-sm">
                To simplify and accelerate real estate transactions in Africa by replacing manual, fragmented workflows with AI-powered tools for agents and buyers.
              </p>
            </div>
          </div>

          {/* LinkedIn + Meta icons */}
          <div className="flex gap-4 md:col-span-2 md:row-start-2  md:row-span-1">
            <div className="bg-blue-100 col-span-1 w-full rounded-xl flex items-center justify-center h-full sm:col-span-full">
              <Image
                src="/github.svg"
                alt="github"
                width={35}
                height={35}
              />
            </div>
            <div className="bg-gray-200 rounded-xl w-full flex items-center justify-center h-full sm:col-span-full">
              <Image
                src="x.svg"
                alt="twitter"
                width={35}
                height={35}
              />
            </div>
          </div>

          {/* Innovation */}
          <div className="bg-yellow-400 md:col-span-2 md:col-start-3 md:row-span-2 p-4 rounded-xl flex flex-col justify-between row-start-4 sm:col-span-full @max-2xl:h-120">
            <h3 className="text-2xl sm:text-4xl font-bold">03</h3>
            <div>
              <p className="font-semibold">Innovation</p>
              <p className="text-sm">
                We embrace AI and automation to make the touring as seamless as possible.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-green-100 md:col-span-5 flex justify-between flex-col row-start-3  md:row-span-1 p-4 rounded-xl sm:col-span-full @max-2xl:h-80">
            <h3 className="text-2xl sm:text-4xl font-bold">02</h3>
            <div>
              <p className="font-semibold">Vision</p>
              <p className="text-sm">
                To become the must have touring companion in any onboarding experience
              </p>
            </div>
          </div>

          {/* Customer Success */}
          <div className="bg-pink-200 md:col-span-2 md:row-start-3 p-4 rounded-xl flex justify-between flex-col row-start-5 sm:col-span-full @max-2xl:h-68">
            <h3 className="text-2xl sm:text-4xl font-bold">04</h3>
            <div>
              <p className="font-semibold">Customer success</p>
              <p className="text-sm">
                We design tools that help users in their career growth as they scale upward.
              </p>
            </div>
          </div>

          {/* Simplicity */}
          <div className="bg-yellow-100 md:col-span-3 md:col-start-7 md:row-start-2 p-4 rounded-xl flex justify-between flex-col row-start-6 sm:col-span-full @max-2xl:h-68">
            <h3 className="text-2xl sm:text-4xl font-bold">05</h3>
            <div>
              <p className="font-semibold">Simplicity</p>
              <p className="text-sm">
                We remove complexity and provide easy-to-use solutions.
              </p>
            </div>
          </div>
        </div>
        </div>
    </div>
        <Footer/>
    </>
  )
} 

export default About;