import { Link } from 'react-router-dom';
import Header from '../Header';

const About = () => {
    return (
        <div className="app-main-wrapper">
            <div className="app-layout">
                <Header minimal={true} />

                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
                    {/* Left: Text Content */}
                    <div className="p-10 md:p-20 border-r border-white/5 flex flex-col justify-center">
                        <div className="mono text-accent mb-6 text-sm">/// SYSTEM_MANIFESTO_V2.0</div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-none">
                            THE<br />TRUTH<br />ALGORITHM
                        </h1>

                        <div className="space-y-6 text-gray-400 leading-relaxed max-w-xl">
                            <p>
                                <span className="text-white font-bold">PIXY|NEWS</span> is not just a publication. It is a decentralized node in communication protocol 734.
                            </p>
                            <p>
                                Established in 2024, our improved neural network filters through the noise of the data swamp to deliver high-fidelity information streams directly to your optical cortex.
                            </p>
                            <p>
                                We believe in raw data. No filters. No corporate overlays. Just the signal.
                            </p>
                        </div>

                        <div className="mt-12">
                            <div className="flex gap-4">
                                <div className="border border-white/20 p-4 w-32">
                                    <div className="text-2xl font-bold text-white">24h</div>
                                    <div className="text-[10px] mono text-secondary mt-1">UPTIME</div>
                                </div>
                                <div className="border border-white/20 p-4 w-32">
                                    <div className="text-2xl font-bold text-accent">100%</div>
                                    <div className="text-[10px] mono text-secondary mt-1">ACCURACY</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative overflow-hidden bg-black/50">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border border-accent/20 rounded-full flex items-center justify-center animate-pulse-slow">
                                <div className="w-48 h-48 border border-accent/40 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full box-shadow-[0_0_20px_#00f0ff]" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-10 right-10 mono text-right text-xs text-secondary">
                            <div>CORE_LOCATION: UNDISCLOSED</div>
                            <div>SERVER_TEMP: 34°C</div>
                        </div>
                    </div>
                </div>

                <footer className="footer-simple border-t border-white/5">
                    <div className="mono text-secondary">
                        SYS.ADMIN: UNIT_734
                    </div>
                    <div className="footer-simple-links mono">
                        <Link to="/">RETURN TO INDEX</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default About;
