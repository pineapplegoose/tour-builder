
import React, { useState } from 'react';
import { LogIn } from 'lucide-react';


export function LoginForm({ onLogin: onLogin }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({
            userId: 'demo_user',
            email: email || 'demo@tourbuilder.com',
            name: 'Demo User'
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">TB</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Tour Builder</h1>
                    <p className="text-gray-600 mt-2">Sign in to your dashboard</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="demo@tourbuilder.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2"
                    >
                        <LogIn size={20} />
                        Sign In (Demo)
                    </button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center mb-2">This is a demo interface</p>
                    <p className="text-xs text-gray-600 text-center">
                        For real implementation with Convex authentication, use the component files provided
                    </p>
                </div>
            </div>
        </div>
    );
}