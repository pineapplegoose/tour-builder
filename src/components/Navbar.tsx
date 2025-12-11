"use client";

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { Menu } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);

  const navbarClasses = isScrolled
    ? "fixed top-0 left-0 right-0 z-50 w-[90%] text-white mt-4 transition-all duration-300 bg-blue-900 backdrop-blur-lg shadow-lg "
    : "relative z-50 transition-all duration-300 text-blue-900 bg-(--neutral)";


  return (

    <div className={` ${navbarClasses}  mx-auto p-3 px-15 bg-(--neutral) flex items-center justify-between pt-4 rounded`}>
      <div className="text-xl text-blue-900 font-bold">Jagora</div>
      <div className='flex justify-center items-center gap-4 nav'>
        <Link href="/" className='hover:text-blue-400 hover:font-bold transition-all'>
          Home
        </Link>
        <Link href="/dashboard" className='hover:text-blue-400 hover:font-bold transition-all'>
          Dashboard
        </Link>
        <Link href="/about" className='hover:text-blue-400 hover:font-bold transition-all'>
          About Us
        </Link>
        <Link href="/documentation" className='hover:text-blue-400 hover:font-bold transition-all'>
          How it works
        </Link>

      </div>
      <div className='flex justify-center items-center gap-2.5'>
        <Link href="/dashboard">
          <button className='px-4  py-2 hover:shadow rounded'>
            Log in
          </button>
        </Link>
        <Link href="#">
          <button className={`text-white demo-three tracking-tight px-4 py-2 bg-blue-400 rounded `}>
            See a Demo
          </button>
        </Link>
        <div>
          <Menu className='menu' size={20} />
        </div>
      </div>

    </div>
  )
}
