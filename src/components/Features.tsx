"use client"

import { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "motion/react";

const features = [
    {
        image: "/open-source.svg",
        heading: "Open Source",
        desc: "Jagora offers a transparent and secure foundation for your onboarding, built by the community."
    },
       {
        image: "/custom.svg",
        heading: "Highly Customizable",
        desc: "Jagora provides full customization and configuration for all tour steps."
    },
       {
        image: "/easy.svg",
        heading: "Awesome User-Experience",
        desc: "Easy tours for users, simple creation for developers."
    },
       {
           image: "/feedback.svg",
           heading: "User Feedback",
           desc: "Instant user feedback, constant improvement."
    },
          {
        image: "/onboarding.svg",
        heading: "Onboarding Customers",
        desc: "The onboarding of new users made easy"
    },
             {
        image: "/growth.svg",
        heading: "Business Growth",
        desc: "A great boost to your business."
    },
    ]
    const Ripple = ({ size = 100 }) => {
        return (
            <>
            {[0, 0.8, 1.7, 2.7, 3.7].map((delay, i) => (
                <motion.div
                    key={i}
                    className="absolute -z-30 top-3rem left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-600"
                    style={{
                        width: size,
                        height: size,
                        top: "50%",
                        left: "50%",
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{
                        duration: 5,
                        delay: delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </>
    )
};

function FeatureCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = features.length;
    const spacing = 180;
    const scales = [0.4, 0.6, 1.2, 0.6, 0.4];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % length);
        }, 5000);
        return ()=> clearInterval(interval)
    }, [length])
    const getVisibleItems = () => {
        const visible: { index: number; position: number }[] = [];
        for (let p = -2; p <= 2; p++){
            const index = (currentIndex + p + length) % length;
            visible.push({ index, position: p });
        }
        return visible
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold p-4 pt-10">Features on Jagora</h2>
        <div className="relative w-full overflow-clip mb-15  h-screen flex justify-center items-center mx-auto">
            {getVisibleItems().map(({ index, position }) => (
                <motion.div
                    key={`${index}-${position}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                    animate={{
            x: position * spacing,
            scale: scales[position + 2 ],
            y: 0,
          }}
          transition={{ duration: 0.5 }}
                >
                        <div>
            {position === 0 && <Ripple size={800} />}

            <Image
              src={features[index].image}
              alt=""
              className={` object-cover rounded-full z-50 ${
                position === 0 ? "border-4 bored-black" : ""
                                }`}
                            width={160}    
                            height={160}  
            />
          </div>

                </motion.div>
            ))}
<div className="mt-2 text-center z-20 ">
        <div className="pt-3 absolute top-15 left-1/2 -translate-x-1/2">
          <h1 className="text-2xl w-[20rem]  md:text-4xl lg:text-5xl lg:w-160 mx-auto">
            {features[currentIndex].heading}
          </h1>
        </div>

        <div className="absolute w-[80%] mx-auto bottom-15 left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center bg-(--crm_green) border3 w-max border-2 md:w-fit mx-auto text-sm   sm:text-base px-2 sm:px-5 rounded-4xl py-1.5 gap-2 sm:gap-2.5">
            <p className="word-nowrap">{features[currentIndex].desc}</p>
          </div>
        </div>
      </div>
        </div>
    </div>
    )
    
}

export default FeatureCarousel;

