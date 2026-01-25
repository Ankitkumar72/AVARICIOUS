import React, { useState, useEffect } from 'react';
import { supabase, isConfigured } from '../supabaseClient';
import { Link } from 'react-router-dom';

const Diagnostics = () => {
    const [status, setStatus] = useState('IDLE');
    const [pingResult, setPingResult] = useState(null);
    const [error, setError] = useState(null);

    const envStatus = {
        URL_PRESENT: !!import.meta.env.VITE_SUPABASE_URL,
        KEY_PRESENT: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        CLIENT_INITIALIZED: !!supabase
    };

    const handlePing = async () => {
        setStatus('PINGING');
        setError(null);
        setPingResult(null);

        if (!supabase) {
            setError("Supabase Client is NULL. Check Environment Variables.");
            setStatus('FAILED');
            return;
        }

        try {
            const start = performance.now();
            const { count, error: err } = await supabase
                .from('news_posts')
                .select('*', { count: 'exact', head: true });
            const time = Math.round(performance.now() - start);

            if (err) {
                console.error("Ping Error:", err);
                setError(err);
                setStatus('FAILED');
            } else {
                setPingResult({ count, latency: time });
                setStatus('SUCCESS');
            }
        } catch (e) {
            console.error("Ping Exception:", e);
            setError(e);
            setStatus('CRITICAL_ERROR');
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#00f0ff] font-mono p-10 mt-20">
            <h1 className="text-3xl font-bold mb-8 border-b border-[#333] pb-4">SYSTEM DIAGNOSTICS_MODULE</h1>

            <section className="mb-10">
                <h2 className="text-xl text-white mb-4">[ENVIRONMENT_VARIABLES]</h2>
                <div className="grid grid-cols-2 gap-4 max-w-lg">
                    <div className="border border-[#333] p-4">
                        <div className="text-xs text-secondary mb-1">VITE_SUPABASE_URL</div>
                        <div className={envStatus.URL_PRESENT ? "text-green-500" : "text-red-500 font-bold"}>
                            {envStatus.URL_PRESENT ? "DETECTED" : "MISSING"}
                        </div>
                    </div>
                    <div className="border border-[#333] p-4">
                        <div className="text-xs text-secondary mb-1">VITE_SUPABASE_ANON_KEY</div>
                        <div className={envStatus.KEY_PRESENT ? "text-green-500" : "text-red-500 font-bold"}>
                            {envStatus.KEY_PRESENT ? "DETECTED" : "MISSING"}
                        </div>
                    </div>
                    <div className="border border-[#333] p-4 col-span-2">
                        <div className="text-xs text-secondary mb-1">CLIENT_STATUS</div>
                        <div className={envStatus.CLIENT_INITIALIZED ? "text-green-500" : "text-red-500 font-bold"}>
                            {envStatus.CLIENT_INITIALIZED ? "INITIALIZED" : "NULL (SAFE_MODE)"}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-xl text-white mb-4">[CONNECTIVITY_TEST]</h2>
                <button
                    onClick={handlePing}
                    disabled={status === 'PINGING'}
                    className="bg-[#00f0ff]/10 border border-[#00f0ff] px-6 py-3 text-[#00f0ff] font-bold hover:bg-[#00f0ff] hover:text-black transition-all disabled:opacity-50"
                >
                    {status === 'PINGING' ? 'PINGING_SERVER...' : 'PING_DATABASE'}
                </button>

                {status === 'SUCCESS' && (
                    <div className="mt-6 border border-green-500/50 bg-green-900/10 p-4 max-w-lg">
                        <div className="text-green-500 font-bold text-xl mb-2">CONNECTION ESTABLISHED</div>
                        <div className="text-sm">LATENCY: {pingResult.latency}ms</div>
                        <div className="text-sm">TABLE_COUNT: {pingResult.count}</div>
                    </div>
                )}

                {(status === 'FAILED' || status === 'CRITICAL_ERROR') && (
                    <div className="mt-6 border border-red-500/50 bg-red-900/10 p-4 max-w-3xl overflow-auto">
                        <div className="text-red-500 font-bold text-xl mb-2">CONNECTION FAILED</div>
                        <pre className="text-xs text-red-400 whitespace-pre-wrap">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                        {error?.message === "Failed to fetch" && (
                            <div className="mt-4 text-white text-sm">
                                <strong>HINT:</strong> "Failed to fetch" usually means:
                                <ul className="list-disc pl-5 mt-2 text-gray-400">
                                    <li>Invalid URL format (must ensure it doesn't have trailing spaces or odd characters).</li>
                                    <li>Network blocked (CORS issue if headers are wrong, or firewall).</li>
                                    <li>The URL is completely unreachable.</li>
                                </ul>
                            </div>
                        )}
                        {error?.code === "PGRST301" && (
                            <div className="mt-4 text-white text-sm">
                                <strong>HINT:</strong> Permission Denied (401). Your Anon Key is likely invalid or Row Level Security (RLS) is blocking access.
                            </div>
                        )}
                    </div>
                )}
            </section>

            <Link to="/" className="text-gray-500 hover:text-white underline">← RETURN_TO_ROOT</Link>
        </div>
    );
};

export default Diagnostics;
