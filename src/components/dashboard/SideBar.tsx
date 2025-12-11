'use client'

import { Home, BarChart3, Code2, LogOut, Menu, X } from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface SidebarProps {
    currentView: 'tours' | 'analytics' | 'embed';
    onViewChange: (view: 'tours' | 'analytics' | 'embed') => void;
    isOpen: boolean;
    onToggle: () => void;
}

export default function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
    const { signOut } = useClerk();
    const { user } = useUser();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            <div
                className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          w-64 bg-gray-900 text-white flex flex-col
        `}
            >
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <Link href="/" ><h1 className="text-xl font-bold">Tour Builder</h1></Link>
                        <p className="text-sm text-gray-400 mt-1">Dashboard</p>
                    </div>
                    <button
                        onClick={onToggle}
                        className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => {
                            onViewChange('tours');
                            if (window.innerWidth < 1024) onToggle();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'tours'
                            ? 'bg-blue-900 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Home size={20} />
                        <span className="font-medium">Tours</span>
                    </button>

                    <button
                        onClick={() => {
                            onViewChange('analytics');
                            if (window.innerWidth < 1024) onToggle();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'analytics'
                            ? 'bg-blue-900 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <BarChart3 size={20} />
                        <span className="font-medium">Analytics</span>
                    </button>

                    <button
                        onClick={() => {
                            onViewChange('embed');
                            if (window.innerWidth < 1024) onToggle();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'embed'
                            ? 'bg-blue-900 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Code2 size={20} />
                        <span className="font-medium">Embed Code</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-900 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold">
                                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {user?.fullName || user?.firstName || 'User'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {user?.emailAddresses[0]?.emailAddress || ''}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>

            <button
                onClick={onToggle}
                className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-blue-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
            >
                <Menu size={24} />
            </button>
        </>
    );
}