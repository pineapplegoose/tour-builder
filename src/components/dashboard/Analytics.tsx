'use client'

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../lib/AuthContext';
import { Activity, BarChart3, TrendingUp, Users, Loader } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

export default function AnalyticsView() {
    const { user } = useAuth();
    const [selectedTourId, setSelectedTourId] = useState<Id<"tours"> | null>(null);

    const tours = useQuery(api.tour.getTours);
    const allAnalytics = useQuery(
        api.analytics.getAllToursAnalytics,
        user ? { userId: user.userId } : 'skip'
    );
    const tourAnalytics = useQuery(
        api.analytics.getTourAnalytics,
        selectedTourId && user ? { tourId: selectedTourId, userId: user.userId } : 'skip'
    );

    if (!tours || !allAnalytics) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 text-blue-900 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
                <p className="text-gray-600 mt-1">Track tour performance and user engagement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Total Tours</h3>
                        <BarChart3 className="text-blue-900" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{allAnalytics.totalTours}</p>
                    <p className="text-sm text-gray-500 mt-2">Active tours created</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
                        <Users className="text-purple-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{allAnalytics.totalSessions}</p>
                    <p className="text-sm text-gray-500 mt-2">Across all tours</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                        <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{allAnalytics.totalCompleted}</p>
                    <p className="text-sm text-green-600 mt-2">Tours finished</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
                        <Activity className="text-orange-600" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{allAnalytics.overallCompletionRate}%</p>
                    <p className="text-sm text-gray-500 mt-2">Overall success rate</p>
                </div>
            </div>

            {tours.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Tour for Detailed Analytics
                    </label>
                    <select
                        value={selectedTourId || ''}
                        onChange={(e) => setSelectedTourId(e.target.value as Id<"tours"> || null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">-- Select a tour --</option>
                        {tours.map((tour) => (
                            <option key={tour._id} value={tour._id}>
                                {tour.name} ({tour.stepCount} steps)
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedTourId && tourAnalytics && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-600">Sessions</h3>
                                <Users className="text-blue-900" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{tourAnalytics.totalSessions}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                                <TrendingUp className="text-green-600" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{tourAnalytics.completedSessions}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
                                <Activity className="text-purple-600" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{tourAnalytics.completionRate}%</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-600">Skipped</h3>
                                <Activity className="text-orange-600" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{tourAnalytics.skippedCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Step Performance</h3>
                        {Object.keys(tourAnalytics.stepBreakdown).length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No analytics data yet</p>
                                <p className="text-sm mt-1">Data will appear once users interact with this tour</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(tourAnalytics.stepBreakdown).map(([stepId, data]) => {
                                    const completionRate = data.started > 0
                                        ? Math.round((data.completed / data.started) * 100)
                                        : 0;

                                    return (
                                        <div key={stepId}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    {stepId.replace(/-/g, ' ')}
                                                </span>
                                                <span className="text-sm text-gray-500">{completionRate}% completed</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-linear-to-r from-blue-900 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${completionRate}%` }}
                                                />
                                            </div>
                                            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                <span>Started: <strong>{data.started}</strong></span>
                                                <span>Completed: <strong className="text-green-600">{data.completed}</strong></span>
                                                <span>Skipped: <strong className="text-orange-600">{data.skipped}</strong></span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {tourAnalytics.recentEvents.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {tourAnalytics.recentEvents.slice(0, 10).map((event, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg text-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${event.event === 'completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : event.event === 'started'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >
                                                {event.event}
                                            </span>
                                            <span className="text-gray-700 font-mono text-xs">{event.stepId}</span>
                                        </div>
                                        <span className="text-gray-500 text-xs">
                                            {new Date(event.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {tours.length === 0 && (
                <div className="bg-white p-12 rounded-lg shadow border border-gray-200 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analytics Yet</h3>
                    <p className="text-gray-600">Create tours and embed them on your website to see analytics</p>
                </div>
            )}
        </div>
    );
}