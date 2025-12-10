import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-(--primary) py-15 text-white md:p-12 p-6">
      <div className=' flex items-start justify-between '>
      <div>
        <div>

          <h1 className='text-xl font-bold pb-5'>Jagora</h1>
          <p>Showcase your product in a unique way</p>
        </div>
              <button>
                  Get a Demo
              </button>

          </div>
      <div>
        <Link href={""}>
        <p className='font-semibold pb-5'>Dashboard</p>
        </Link>
        <ul>
          <li>Product Analytics</li>
          <li>User Engagement </li>
          <li>USer Feedback</li>
        </ul>
          </div>
      <div>
        <p className='font-semibold pb-5'>Company</p>
        <ul>
          <li>Careers</li>
          <li>Customers</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
          </div>
      <div>
        <p className='font-semibold pb-5'>Use Cases</p>
        <ul>
          <li>
            User Onboarding

          </li>
          <li>Customer Retention</li>

          <line>Product Led Growth</line>
          <li>In-App Support</li>
        </ul>
          </div>
      </div>
      <div className='h-0.5 bg-amber-50 mt-15'/>
      <div className='flex items-center justify-between py-15'>
        <div>
          <p>Jagora 2025. All rights reserved</p>
        </div>
        
        <div className='flex items-center gap-2.5'>
          <Image src={'/facebook.svg'} alt={'facebook'} width={30} height={30} />
          <Image src={'/x.svg'} alt={'facebook'} width={30} height={30} />
          <Image src={'/github.svg'} alt={'facebook'} width={30} height={30}/>
        </div>
      </div>
    </div>
  )
}
