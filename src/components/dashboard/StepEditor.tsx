'use client'

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { X, Plus, Trash2, Loader, GripVertical } from 'lucide-react';

interface StepEditorProps {
    tourId: Id<"tours">;
    userId?: Id<"users">;
    onClose: () => void;
}

export default function StepEditor({ tourId, userId, onClose }: StepEditorProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newStep, setNewStep] = useState({
        stepId: '',
        title: '',
        description: '',
        targetElement: '',
        position: 'bottom',
    });

    const tour = useQuery(api.tour.getTour, { tourId });
    const steps = useQuery(api.steps.getSteps, { tourId });
    const createStep = useMutation(api.steps.createStep);
    const deleteStep = useMutation(api.steps.deleteStep);

    const handleCreateStep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!steps) return;

        try {
            await createStep({
                tourId,
                stepId: newStep.stepId,
                title: newStep.title,
                description: newStep.description,
                targetElement: newStep.targetElement,
                position: newStep.position,
                order: steps.length,
            });
            setNewStep({
                stepId: '',
                title: '',
                description: '',
                targetElement: '',
                position: 'bottom',
            });
            setIsCreating(false);
        } catch (error) {
            console.error('Failed to create step:', error);
            alert('Failed to create step. Please try again.');
        }
    };

    const handleDeleteStep = async (stepId: Id<"steps">) => {
        if (!confirm('Delete this step?')) return;
        try {
            await deleteStep({ id: stepId });
        } catch (error) {
            console.error('Failed to delete step:', error);
        }
    };

    if (!tour || !steps) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-8">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tour.name}</h3>
                        <p className="text-gray-600 mt-1">
                            Manage tour steps (minimum 5 required) • {steps.length} step{steps.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {steps.length < 5 && (
                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                ⚠️ You need at least 5 steps for this tour. Currently have {steps.length}.
                                Please add {5 - steps.length} more step{5 - steps.length !== 1 ? 's' : ''}.
                            </p>
                        </div>
                    )}


                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <div
                                key={step._id}
                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center gap-2">
                                        <GripVertical className="text-gray-400" size={20} />
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                            <span>
                                                ID: <code className="bg-gray-200 px-2 py-0.5 rounded">{step.stepId}</code>
                                            </span>
                                            <span>
                                                Target: <code className="bg-gray-200 px-2 py-0.5 rounded">{step.targetElement}</code>
                                            </span>
                                            <span>
                                                Position: <span className="font-medium capitalize">{step.position}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteStep(step._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isCreating && (
                        <div className="mt-4 bg-white p-4 rounded-lg border-2 border-blue-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Add New Step</h4>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Step ID *
                                        </label>
                                        <input
                                            type="text"
                                            value={newStep.stepId}
                                            onChange={(e) => setNewStep({ ...newStep, stepId: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            placeholder="welcome-step"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Position *
                                        </label>
                                        <select
                                            value={newStep.position}
                                            onChange={(e) => setNewStep({ ...newStep, position: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        >
                                            <option value="top">Top</option>
                                            <option value="bottom">Bottom</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Welcome to our platform!"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        value={newStep.description}
                                        onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        rows={2}
                                        placeholder="This is the first step of your journey..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Element (CSS Selector) *
                                    </label>
                                    <input
                                        type="text"
                                        value={newStep.targetElement}
                                        onChange={(e) => setNewStep({ ...newStep, targetElement: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                                        placeholder="#hero, .welcome-section, [data-tour='start']"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCreateStep}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                    >
                                        Add Step
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsCreating(false);
                                            setNewStep({
                                                stepId: '',
                                                title: '',
                                                description: '',
                                                targetElement: '',
                                                position: 'bottom',
                                            });
                                        }}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-3">
                        {!isCreating && (
                            <button
                                onClick={() => setIsCreating(true)}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
                            >
                                <Plus size={20} />
                                Add Step
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}