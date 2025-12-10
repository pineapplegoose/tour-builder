"use client"

import React, { useEffect, useState } from 'react'

import Image from 'next/image';

const ImageCarousel = () => {
    const slides = [
        {
            image: "/custom.jpg",
            text: "Jagora can be tailored according to your needs"
        },
        {
            image: "/openSource.jpg",
            text: "Jagora is Open source"
        },
        {
            image: "/easyUse.jpg",
            text: "Jagora is easy to use and the User-Experience is second to none"

        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval)
    },[slides.length])

  return (
      <div className="relative w-full overflow-hidden">
          <Image
              src={slides[activeIndex].image}
              alt="image slides"
              width={300}
              height={200}
              className=' w-full  h-80 '
          />
            <div className="absolute inset-0 bg-black/15 flex flex-col justify-between p-6">
        <p className="text-white text-lg font-semibold">{slides[activeIndex].text}</p>
        <div className="flex justify-end gap-2">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full bg-red/500 border-2 border-white bg-cover bg-no-repeat cursor-pointer ${
                index === activeIndex ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
          
    </div>
  )
}

export default ImageCarousel