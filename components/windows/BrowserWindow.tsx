'use client';

import { useState } from 'react';
import { RefreshCw, ArrowLeft, ArrowRight, Home, Search, Lock } from 'lucide-react';

interface Tab {
    id: string;
    title: string;
    url: string;
    type: 'internal' | 'external' | 'app';
    content?: React.ReactNode;
}

const SITE_DATA: Record<string, { title: string; content: React.ReactNode }> = {
    'localhost:3000': {
        title: 'Home Dashboard',
        content: (
            <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to LocalHost</h1>
                <p className="text-gray-600">The gateway to the Captain&apos;s digital soul.</p>
            </div>
        )
    },
    'google.com': {
        title: 'Google',
        content: (
            <div className="flex flex-col items-center justify-center h-full bg-white">
                <div className="text-6xl font-bold mb-8">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                </div>
                <div className="w-full max-w-md">
                    <div className="flex items-center border border-gray-200 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                        <input type="text" className="flex-1 outline-none text-gray-700" placeholder="Search Google or type a URL" />
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded border border-gray-100">Google Search</button>
                        <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded border border-gray-100">I&apos;m Feeling Lucky</button>
                    </div>
                </div>
            </div>
        )
    },
    'berkahkarya.org': {
        title: 'Berkah Karya',
        content: (
            <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 p-8 overflow-y-auto">
                <nav className="flex justify-between items-center mb-12 border-b border-green-200 pb-4">
                    <span className="text-2xl font-bold text-green-800">BerkahKarya</span>
                    <div className="space-x-4 text-green-700">
                        <span>About</span>
                        <span>Programs</span>
                        <span>Impact</span>
                        <span className="font-bold">Donate</span>
                    </div>
                </nav>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-black text-green-900 mb-6">Empowering Communities Through Technology</h1>
                    <p className="text-lg text-green-800/80 mb-8 leading-relaxed">
                        Berkah Karya is a non-profit initiative dedicated to bridging the digital divide. We provide coding bootcamps, hardware grants, and mentorship to underrepresented youth across the archipelago.
                    </p>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Our Impact</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div><div className="text-3xl font-black text-green-600">500+</div><div className="text-xs text-gray-500">Students</div></div>
                            <div><div className="text-3xl font-black text-green-600">50+</div><div className="text-xs text-gray-500">Workshops</div></div>
                            <div><div className="text-3xl font-black text-green-600">100%</div><div className="text-xs text-gray-500">Volunteer Led</div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    'aitradepulse.com': {
        title: 'AI Trade Pulse',
        content: (
            <div className="h-full bg-slate-900 text-white p-8 overflow-y-auto">
                <nav className="flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
                    <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI Trade Pulse</span>
                    <button className="bg-blue-600 px-4 py-2 rounded text-sm font-bold">Launch App</button>
                </nav>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-6 leading-tight">
                        Institutional-Grade <br />
                        <span className="text-blue-400">Crypto Analytics</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Leverage advanced ML models to predict market movements. Real-time sentiment analysis, on-chain metrics, and whale tracking in one dashboard.
                    </p>
                    <div className="flex justify-center gap-4 mb-16">
                        <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold">Get Started</button>
                        <button className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold border border-slate-700">View Demo</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg mb-4 flex items-center justify-center text-blue-400 font-bold">AI</div>
                            <h3 className="text-lg font-bold mb-2">Sentiment Engine</h3>
                            <p className="text-sm text-slate-400">Process millions of social signals to gauge market emotion instantly.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg mb-4 flex items-center justify-center text-purple-400 font-bold">Vol</div>
                            <h3 className="text-lg font-bold mb-2">Volume Profile</h3>
                            <p className="text-sm text-slate-400">Visualize liquidity clusters and potential support/resistance zones.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg mb-4 flex items-center justify-center text-green-400 font-bold">API</div>
                            <h3 className="text-lg font-bold mb-2">Real-time API</h3>
                            <p className="text-sm text-slate-400">Connect your trading bots directly to our low-latency data stream.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    'github.com/oyi77': {
        title: 'GitHub - oyi77',
        content: (
            <div className="h-full bg-[#0d1117] text-white p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold">
                            MF
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">Muchammad Fikri Izzuddin</h1>
                            <p className="text-gray-400 mb-4">@oyi77</p>
                            <p className="text-gray-300 mb-4">Lead Software Engineer | Full Stack Architect | Technical Leader</p>
                            <div className="flex gap-4 text-sm">
                                <span>📍 Indonesia</span>
                                <span>🔗 oyi77.github.io/oyi77</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <h2 className="text-xl font-bold mb-4">Pinned Repositories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors">
                                <h3 className="font-bold text-blue-400 mb-2">ai-trade-pulse</h3>
                                <p className="text-sm text-gray-400 mb-3">Crypto trading analytics platform with ML-powered insights</p>
                                <div className="flex gap-2 text-xs">
                                    <span className="text-yellow-400">⭐ Python</span>
                                    <span className="text-gray-500">React</span>
                                    <span className="text-gray-500">AWS</span>
                                </div>
                            </div>
                            <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors">
                                <h3 className="font-bold text-blue-400 mb-2">microservices-platform</h3>
                                <p className="text-sm text-gray-400 mb-3">High-performance microservices architecture</p>
                                <div className="flex gap-2 text-xs">
                                    <span className="text-blue-400">⭐ Go</span>
                                    <span className="text-gray-500">Kubernetes</span>
                                    <span className="text-gray-500">gRPC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    'linkedin.com/in/muchammadfikriizzuddin': {
        title: 'LinkedIn - Muchammad Fikri Izzuddin',
        content: (
            <div className="h-full bg-white p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 rounded-t-lg"></div>
                    <div className="bg-white rounded-b-lg shadow-lg p-6 -mt-16 relative">
                        <div className="flex items-start gap-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-white">
                                MF
                            </div>
                            <div className="flex-1 mt-16">
                                <h1 className="text-2xl font-bold text-gray-900">Muchammad Fikri Izzuddin</h1>
                                <p className="text-lg text-gray-700">Lead Software Engineer & Technical Architect</p>
                                <p className="text-sm text-gray-500 mt-1">Indonesia • 500+ connections</p>
                                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700">Connect</button>
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Passionate Lead Software Engineer with 8+ years of experience building scalable systems and leading high-performance teams.
                                Specialized in full-stack development, microservices architecture, and cloud infrastructure.
                                Proven track record of delivering systems serving 1M+ users with 99.9% uptime.
                            </p>
                        </div>

                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold">TC</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Lead Software Engineer</h3>
                                        <p className="text-gray-600">Tech Corp • Full-time</p>
                                        <p className="text-sm text-gray-500">2021 - Present • 3 yrs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default function BrowserWindow() {
    const [url, setUrl] = useState('localhost:3000');
    const [currentSite, setCurrentSite] = useState<string>('localhost:3000');
    const [loading, setLoading] = useState(false);

    const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate navigation delay
        setTimeout(() => {
            let target = url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
            // Simple exact match logic for simulation
            if (!SITE_DATA[target]) {
                // Fallback to "google search" simulation if site not found
                // or just keep 404
                if (target.includes('github')) {
                    window.open('https://github.com/oyi77', '_blank'); // Real navigation for github
                    target = currentSite; // Don't change view
                }
            }

            setCurrentSite(target);
            setLoading(false);
        }, 800);
    };

    const activeContent = SITE_DATA[currentSite]?.content || (
        <div className="h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-6xl mb-4">404</div>
            <p>Site not found on this restricted network.</p>
            <button onClick={() => { setUrl('localhost:3000'); setCurrentSite('localhost:3000'); }} className="mt-4 text-blue-500 hover:underline">Go Home</button>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Browser Bar */}
            <div className="flex items-center gap-3 p-3 bg-gray-100 border-b border-gray-300">
                <div className="flex gap-2 text-gray-500">
                    <ArrowLeft className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                    <ArrowRight className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                    <RefreshCw className={`w-4 h-4 cursor-pointer hover:text-gray-800 ${loading ? 'animate-spin' : ''}`} />
                    <Home className="w-5 h-5 cursor-pointer hover:text-gray-800" onClick={() => { setUrl('localhost:3000'); setCurrentSite('localhost:3000'); }} />
                </div>

                <form onSubmit={handleNavigate} className="flex-1">
                    <div className="relative flex items-center bg-white rounded-full border border-gray-300 px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 shadow-sm transition-all">
                        <Lock className="w-3 h-3 text-green-600 mr-2" />
                        <span className="text-green-600 text-xs font-bold mr-2">https://</span>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 outline-none text-sm text-gray-700 font-medium"
                        />
                    </div>
                </form>
            </div>

            {/* Viewport */}
            <div className="flex-1 overflow-hidden relative">
                {loading && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 z-10">
                        <div className="h-full bg-blue-500 animate-progress" style={{ width: '60%' }} />
                    </div>
                )}
                {activeContent}
            </div>
        </div>
    );
}
