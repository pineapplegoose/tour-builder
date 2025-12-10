'use client'

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../lib/AuthContext';
import { Copy, Check, Code2, Loader, ExternalLink } from 'lucide-react';

export default function EmbedView() {
    const { user } = useAuth();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const tours = useQuery(api.tour.getTours);

    const getEmbedCode = (tourId: string) => {
        return `<!-- Tour Builder Widget -->
<script src="https://cdn.yourdomain.com/tour-widget.js"></script>
<script>
  TourWidget.init({
    tourId: "${tourId}",
    apiUrl: "${process.env.NEXT_PUBLIC_CONVEX_URL}",
    theme: "light", // or "dark"
    autoStart: true // Start tour automatically
  });
</script>`;
    };

    const getReactCode = (tourId: string) => {
        return `import { TourWidget } from '@tourbuilder/react';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <TourWidget
        tourId="${tourId}"
        apiUrl="${process.env.NEXT_PUBLIC_CONVEX_URL}"
        theme="light"
        autoStart={true}
      />
    </div>
  );
}`;
    };

    const getNpmInstall = () => {
        return `npm install @tourbuilder/widget
# or
yarn add @tourbuilder/widget`;
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (tours === undefined) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Embed Code</h2>
                <p className="text-gray-600 mt-1">Copy and paste these codes into your website</p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Code2 className="text-blue-600" size={20} />
                    Quick Start Guide
                </h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">1. Install the widget (optional)</p>
                        <div className="bg-white rounded-lg p-4 font-mono text-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600">Terminal</span>
                                <button
                                    onClick={() => copyToClipboard(getNpmInstall(), 'npm')}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    {copiedId === 'npm' ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <pre className="text-gray-800">{getNpmInstall()}</pre>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            2. Copy the embed code for your tour (below)
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            3. Paste it before the closing <code className="bg-white px-2 py-0.5 rounded">&lt;/body&gt;</code> tag
                        </p>
                    </div>
                </div>
            </div>

            {tours.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow border border-gray-200 text-center">
                    <Code2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tours Available</h3>
                    <p className="text-gray-600">Create a tour first to get the embed code</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {tours.map((tour) => (
                        <div key={tour._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                            <div className="p-6 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{tour.name}</h3>
                                        <p className="text-sm text-gray-600">{tour.description}</p>
                                        <div className="flex items-center gap-3 mt-2 text-sm">
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded ${tour.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {tour.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-gray-500">{tour.stepCount} steps</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900">HTML/JavaScript</h4>
                                    <button
                                        onClick={() => copyToClipboard(getEmbedCode(tour._id), `html-${tour._id}`)}
                                        className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {copiedId === `html-${tour._id}` ? (
                                            <>
                                                <Check size={16} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code>{getEmbedCode(tour._id)}</code>
                                </pre>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900">React Component</h4>
                                    <button
                                        onClick={() => copyToClipboard(getReactCode(tour._id), `react-${tour._id}`)}
                                        className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {copiedId === `react-${tour._id}` ? (
                                            <>
                                                <Check size={16} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code>{getReactCode(tour._id)}</code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <ExternalLink className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
                        <p className="text-gray-600 text-sm mb-3">
                            Check out our documentation for advanced configuration options, styling guides, and API reference.
                        </p>
                        <a
                            href="https://docs.tourbuilder.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                            View Documentation
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Options</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">tourId</code>
                        <span className="text-gray-600">The unique ID of your tour (required)</span>
                    </div>
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">apiUrl</code>
                        <span className="text-gray-600">Your Convex API URL (required)</span>
                    </div>
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">theme</code>
                        <span className="text-gray-600">"light" or "dark" mode (optional, default: "light")</span>
                    </div>
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">autoStart</code>
                        <span className="text-gray-600">Start tour automatically (optional, default: false)</span>
                    </div>
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">onComplete</code>
                        <span className="text-gray-600">Callback function when tour completes</span>
                    </div>
                    <div className="flex gap-3">
                        <code className="bg-gray-100 px-3 py-1 rounded font-mono text-blue-600">onSkip</code>
                        <span className="text-gray-600">Callback function when tour is skipped</span>
                    </div>
                </div>
            </div>
        </div>
    );
}