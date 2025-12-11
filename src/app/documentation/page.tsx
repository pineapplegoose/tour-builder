import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import React from 'react'

const Documentation = () => {
    return (
        <>
            <Navbar />
            <div className='md:p-12 p-6 '>
                <div>

                    <h2 className='md:text-2xl text-xl pb-6 font-bold hover:underline leading-10' >📚 Jagora Documentation: The Guide to Seamless Onboarding</h2>
                    <p className=' text-lg'>The open-source, developer-first product growth platform that helps you build, manage, and track powerful multi-step user tours with a single script.</p>
                </div>
                <div className='text-lg py-2'>
                    <p> <span className='font-bold'> Jagora (meaning Guide) </span> empowers product teams to deliver contextual, high-conversion tours without complex, proprietary frameworks. We provide a single, lightweight script for the frontend, and a powerful dashboard for tour management and analytics.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"> {/* Feature Card 1: Open Source & Code */}
                    <div className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center mb-6">
                            <div className="bg-primary rounded-lg p-3 mr-4"> {/* Replace with SimpleIcons SiGithub or SiOpenSource */}
                                <svg className="w-6 h-6 text-(--primary)" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.693.084-.693 1.205.086 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.312.464-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23c.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.873.118 3.176.771.841 1.235 1.909 1.235 3.221 0 4.587-2.807 5.624-5.474 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.8 1.387C20.56 22.183 24 17.68 24 12c0-6.627-5.373-12-12-12z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 m-0">Open Source Core</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6"> The embeddable widget is fully transparent and auditable. Inspect the code, customize the logic, and trust the security of a community-driven foundation. </p>
                    </div>

                    {/* Feature Card 2: Customization & Steps */}

                    <div className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center mb-6"> <div className="bg-primary rounded-lg p-3 mr-4"> {/* Use icon for Configuration/Steps */}
                            <svg className="w-6 h-6 text-(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.941 3.31.824 2.376 2.377a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.941 1.543-.824 3.31-2.377 2.376a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.941-3.31-.824-2.376-2.377a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.941-1.543.824-3.31 2.377-2.376a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> </div>
                            <h3 className="text-xl font-bold text-gray-900 m-0">Micro-Configurable Tours</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6"> Use the Jagora Dashboard to define tours with unique IDs per step. This granular control allows you to trigger custom events and track progress exactly where you need it. </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center mb-6"> <div className="bg-primary rounded-lg p-3 mr-4"> {/* Use icon for Configuration/Steps */}
                            <svg className="w-6 h-6 text-(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m13-2h-3.375a2.25 2.25 0 01-1.641-.679l-1.721-1.721a2.25 2.25 0 00-1.641-.679H5.501a2.25 2.25 0 00-1.641.679L2 15m13 0l-1.721 1.721a2.25 2.25 0 00-1.641.679H5.501a2.25 2.25 0 00-1.641-.679L2 12m17 0a2 2 0 100-4 2 2 0 000 4z" /></svg></div>
                            <h3 className="text-xl font-bold text-gray-900 m-0">Actionable Analytics</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6"> Every user interaction—step started, step completed, or skip event—is tracked. Use these insights in the dashboard to identify drop-off points and rapidly iterate on your tours.</p>
                    </div>
                </div>


                <div className=' my-10'>
                    <h1 className='font-semibold md:text-2xl text-xl'>Quick Start Guide</h1>
                    <div>
                        <ol>
                            <li className='pt-4 font-medium md:text-xl text-lg hover:underline'> 1. Install Jagora</li>
                            <p>Get Jagora running in your web app in minutes</p>
                            <li className='pt-4 font-medium md:text-xl text-lg hover:underline'> 2. Create your first flow</li>
                            <p>Build in-app experiences using the Chrome Extension - no code needed.</p>
                            <li className='pt-4 font-medium md:text-xl text-lg hover:underline'> 3. Track events and users</li>
                            <p>Set up event tracking to personalize experiences and measure impact.</p>
                            <li className='pt-4 font-medium md:text-xl text-lg hover:underline'> 4. Analyze performance</li>
                            <p>Use dashboards and session replay to understand user behavior.</p>
                            <li className='pt-4 font-medium md:text-xl text-lg hover:underline'> 5. Customize Jagora</li>
                            <p>Get Jagora to have the look and feel of what you want</p>
                        </ol>
                    </div>
                </div>









            </div>
            <Footer />
        </>
    )
}

export default Documentation;