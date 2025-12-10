'use client'

import React, { useState } from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useAuth } from '../../lib/AuthContext';
import ToursView from '@/components/dashboard/TourView';
import AnalyticsView from '@/components/dashboard/Analytics';
import EmbedView from '@/components/dashboard/EmbedCode';
import Sidebar from '@/components/dashboard/SideBar';

export default function DashboardPage() {
    const { isLoading } = useAuth();
    const [currentView, setCurrentView] = useState<'tours' | 'analytics' | 'embed'>('tours');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <SignedOut>
                <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">TB</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Tour Builder</h1>
                            <p className="text-gray-600 mt-2">Sign in to manage your tours</p>
                        </div>
                        <SignIn
                            routing="hash"
                            appearance={{
                                elements: {
                                    rootBox: "mx-auto",
                                    card: "shadow-2xl"
                                }
                            }}
                        />
                    </div>
                </div>
            </SignedOut>

            <SignedIn>
                {isLoading ? (
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading dashboard...</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-screen bg-gray-100">
                        <Sidebar
                            currentView={currentView}
                            onViewChange={setCurrentView}
                            isOpen={sidebarOpen}
                            onToggle={() => setSidebarOpen(!sidebarOpen)}
                        />

                        <div className="flex-1 flex flex-col overflow-hidden">
                            <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 capitalize">{currentView}</h1>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {currentView === 'tours' && 'Manage your onboarding tours'}
                                            {currentView === 'analytics' && 'View performance metrics'}
                                            {currentView === 'embed' && 'Get integration code'}
                                        </p>
                                    </div>
                                </div>
                            </header>

                            <main className="flex-1 overflow-y-auto p-6">
                                {currentView === 'tours' && <ToursView />}
                                {currentView === 'analytics' && <AnalyticsView />}
                                {currentView === 'embed' && <EmbedView />}
                            </main>
                        </div>
                    </div>
                )}
            </SignedIn>
        </>
    );
}