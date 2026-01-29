import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Welcome = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="app-main-wrapper">

            {/* Background Grid (kept for visual even though app-main-wrapper has some styles, this adds the specific grid) */}
            <div className="interactive-grid"></div>

            {/* Main Content Container matching Home.jsx layout */}
            <div className={`app-layout p-8 md:p-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ minHeight: '80vh' }}>

                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-16 border-b border-[#333] pb-4">
                    <Link to="/" className="flex items-center gap-2 group text-white no-underline hover:text-[#00f0ff] transition-colors">
                        <img src="/logo.png" alt="PIXY Logo" className="h-6 w-auto" />
                        <span className="font-bold tracking-wider text-xl group-hover:text-[#00f0ff]">PIXY|NEWS.SYS</span>
                    </Link>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-[#666]">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                            <span>NET_STATUS: SECURE</span>
                        </div>
                        <div>ID: 884-XJ-92</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">

                    {/* Left Column (Text & Protocol Cards) */}
                    <div className="lg:col-span-7 flex flex-col">

                        <div className="text-[#00f0ff] text-sm mb-2">// ACCESS_LEVEL_01</div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight md:leading-[0.85] mb-8 tracking-tighter">
                            COLLECTIVE<br />
                            <span className="relative inline-block">
                                ACCESS
                                <span className="absolute bottom-2 right-[-20px] md:right-[-40px] w-4 md:w-8 h-2 md:h-4 bg-[#666]"></span>
                            </span>
                            <span className="text-transparent hidden md:inline" style={{ WebkitTextStroke: '1px white' }}>_</span>
                            <br className="md:hidden" />
                            GRANTED
                        </h1>

                        <div className="border-t border-[#333] pt-6 mb-8 relative">
                            <h2 className="text-xl font-bold mb-4">WELCOME_MESSAGE</h2>
                            <div className="absolute top-6 right-0 text-[10px] text-[#333]">MSG_ID: 001</div>
                            <p className="text-[#888] text-lg leading-relaxed max-w-xl">
                                Welcome to the inner circle of Pixy|News. The noise has been filtered.
                                You now possess direct line access to raw data streams, bypassing
                                the algorithmic filters of the public web.
                            </p>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                            {/* Card 1 */}
                            <div className="border border-[#333] p-6 bg-[#0a0a0a] group hover:border-[#00f0ff] transition-colors">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[10px] text-[#00f0ff]">PROTOCOL_A</span>
                                    <span className="text-[#333]">🔒</span>
                                </div>
                                <h3 className="font-bold mb-3">DIRECT_CORE_FEED // ENCRYPTED</h3>
                                <ul className="text-xs text-[#666] space-y-2 font-mono">
                                    <li>{'>'} BYPASS_ARCHON_FILTER: ENABLED</li>
                                    <li>{'>'} DATA_LATENCY: 0.00ms</li>
                                    <li>{'>'} INTEGRITY_VERIFICATION: 100%</li>
                                </ul>
                            </div>

                            {/* Card 2 */}
                            <div className="border border-[#333] p-6 bg-[#0a0a0a] group hover:border-[#00f0ff] transition-colors">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[10px] text-[#00f0ff]">PROTOCOL_B</span>
                                    <span className="text-[#333]">🕸️</span>
                                </div>
                                <h3 className="font-bold mb-3">COLLECTIVE_RESONANCE // SYNC</h3>
                                <ul className="text-xs text-[#666] space-y-2 font-mono">
                                    <li>{'>'} GHOST_SIGNAL_DISTRIBUTION: ACTIVE</li>
                                    <li>{'>'} MESH_NETWORK_REDUNDANCY: MAX</li>
                                    <li>{'>'} ASSET_REPUTATION: [SCANNING...]</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Image & Info) */}
                    <div className="lg:col-span-5 flex flex-col h-full border-l border-[#333] pl-0 lg:pl-12">

                        {/* Image Container */}
                        <div className="relative aspect-video w-full bg-[#111] mb-8 overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Overlay Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))]"></div>

                            {/* Scanline */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

                            <div className="absolute bottom-4 right-4 bg-black px-2 py-1 text-[10px] text-[#00f0ff] font-mono border border-[#00f0ff]">
                                FIG. 01 // TOWER
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 flex flex-col justify-start relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                                <h3 className="text-xl font-bold">EMAIL_BURSTS</h3>
                            </div>

                            <div className="border-l border-[#333] pl-4 py-2 mb-12">
                                <p className="text-[#888] text-sm leading-relaxed">
                                    High-frequency, encrypted news updates delivered directly to your secure inbox.
                                    Our burst transmission system ensures zero interception.
                                </p>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-auto border-t border-[#333] pt-4 flex justify-between text-xs font-mono">
                                <div>
                                    <div className="text-[#666] mb-1">FREQUENCY</div>
                                    <div className="font-bold"> 2x Weekly</div>
                                </div>
                                <div>
                                    <div className="text-[#666] mb-1">ENCRYPTION</div>
                                    <div className="font-bold">AES-256</div>
                                </div>
                            </div>

                            {/* Blue Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#00f0ff] translate-x-1 translate-y-1"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[#00f0ff] -translate-x-1 translate-y-1"></div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-16 flex justify-between items-end border-t border-[#333] pt-8">
                    <div className="text-xs text-[#444] hidden md:block">
                        SYSTEM_READY<br />
                        WAITING_FOR_INPUT...
                    </div>

                    <Link to="/archive" className="group flex items-center gap-4 cursor-pointer no-underline">
                        <span className="text-4xl md:text-6xl font-black uppercase hover:text-[#00f0ff] transition-colors">{'>'} ARCHIVES</span>
                        <div className="w-4 h-8 md:w-6 md:h-12 bg-[#00f0ff] animate-pulse"></div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Welcome;
