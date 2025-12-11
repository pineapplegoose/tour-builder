'use client'

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../lib/AuthContext';
import { Plus, Edit, Trash2, Copy, Eye, EyeOff, Loader } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import StepEditor from './StepEditor';

export default function ToursView() {
    const { user } = useAuth();
    const [isCreating, setIsCreating] = useState(false);
    const [editingTourId, setEditingTourId] = useState<Id<"tours"> | null>(null);
    const [newTour, setNewTour] = useState({ name: '', description: '' });

    const tours = useQuery(api.tour.getTours);
    const createTour = useMutation(api.tour.createTour);
    const updateTour = useMutation(api.tour.updateTour);
    const deleteTour = useMutation(api.tour.deleteTour);

    const handleCreateTour = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newTour.name.trim()) return;

        try {
            await createTour({
                name: newTour.name,
                description: newTour.description,
            });
            setNewTour({ name: '', description: '' });
            setIsCreating(false);
        } catch (error) {
            console.error('Failed to create tour:', error);
            alert('Failed to create tour. Please try again.');
        }
    };

    const handleToggleActive = async (tourId: Id<"tours">, name: string, description: string, currentActive: boolean) => {
        if (!user) return;
        try {
            await updateTour({
                tourId,
                name,
                description,
                isActive: !currentActive,
            });
        } catch (error) {
            console.error('Failed to update tour:', error);
        }
    };

    const handleDeleteTour = async (tourId: Id<"tours">) => {
        if (!user) return;
        if (!confirm('Delete this tour? All steps and analytics will also be deleted.')) return;

        try {
            await deleteTour({ tourId });
        } catch (error) {
            console.error('Failed to delete tour:', error);
            alert('Failed to delete tour. Please try again.');
        }
    };

    const copyEmbedCode = (tourId: string) => {
        const code = `<script src="https://cdn.yourdomain.com/tour-widget.js"></script>
<script>
  TourWidget.init({
    tourId: "${tourId}",
    apiUrl: "${process.env.NEXT_PUBLIC_CONVEX_URL}"
  });
</script>`;
        navigator.clipboard.writeText(code);
        alert('Embed code copied to clipboard!');
    };

    if (tours === undefined) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 text-blue-900 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Tours</h2>
                    <p className="text-gray-600 mt-1">Create and manage onboarding tours</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                    <Plus size={20} />
                    Create Tour
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-slideUp">
                    <h3 className="text-xl font-semibold mb-4">Create New Tour</h3>
                    <form onSubmit={handleCreateTour} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tour Name *
                            </label>
                            <input
                                type="text"
                                value={newTour.name}
                                onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Product Onboarding"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={newTour.description}
                                onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                                placeholder="Describe what this tour guides users through..."
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Create Tour
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewTour({ name: '', description: '' });
                                }}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {tours.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow border border-gray-200 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours yet</h3>
                    <p className="text-gray-600 mb-4">Create your first onboarding tour to get started</p>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Create Your First Tour
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {tours.map((tour) => (
                        <div
                            key={tour._id}
                            className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{tour.name}</h3>
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${tour.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {tour.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{tour.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>Created {new Date(tour.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => setEditingTourId(tour._id)}
                                        className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition"
                                        title="Edit Steps"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => copyEmbedCode(tour._id)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                        title="Copy Embed Code"
                                    >
                                        <Copy size={18} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleToggleActive(tour._id, tour.name, tour.description, tour.isActive)
                                        }
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                        title={tour.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {tour.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTour(tour._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Delete Tour"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editingTourId && (
                <StepEditor
                    userId={user?.userId}
                    tourId={editingTourId}
                    onClose={() => setEditingTourId(null)}
                />
            )}
        </div>
    );
}