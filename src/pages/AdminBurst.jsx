import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../index.css';

const AdminBurst = () => {
    // State for the form
    const [formData, setFormData] = useState({
        subject_id: 'PIXY_NEWS_DIGEST_VOL_442',
        priority: 'PRIORITY_STANDARD [BATCHED]',
        node_origin: 'SECTOR_07',
        latency_pref: 'ULTRA_LOW',
        content: `SUBJECT: NEURAL INTERFACE UPDATE v4.2
// INITIATING BROADCAST SEQUENCE
// TARGET: ALL_ACTIVE_NODES
Greetings,
We are pleased to announce the deployment of Protocol 88. This update ensures:
1. Reduced synaptic latency ( < 12ms )
2. Enhanced encryption for burst communications.
Required Action:
Nodes must re-initialize connection by 24:00.
[END_TRANSMISSION]`
    });

    const [recipientCount, setRecipientCount] = useState(4209);
    const [status, setStatus] = useState('IDLE');
    const [activeTab, setActiveTab] = useState('BURST'); // BURST, ORACLE, LOGS
    const [emailLogs, setEmailLogs] = useState([]);

    // Fetch Logs
    useEffect(() => {
        if (activeTab === 'LOGS') {
            const fetchLogs = async () => {
                const { data, error } = await supabase
                    .from('email_logs')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (!error) setEmailLogs(data || []);
            };
            fetchLogs();
            const interval = setInterval(fetchLogs, 10000); // 10s Poll
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const navigate = useNavigate();

    // Check Auth
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
            }
        };
        checkSession();
    }, [navigate]);

    // Live DB Sync for recipient count
    useEffect(() => {
        const fetchCount = async () => {
            const { count, error } = await supabase
                .from('collective_members')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'ACTIVE');

            if (!error && count !== null) {
                setRecipientCount(count);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBroadcast = async () => {
        // Validation: Check for empty subject or content
        if (!formData.subject_id?.trim() || !formData.content?.trim()) {
            alert("ERROR: SUBJECT_ID and CONTENT cannot be empty.");
            return;
        }

        setStatus('SENDING');
        try {
            const response = await fetch('/api/burst', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: formData.subject_id,
                    content: formData.content,
                    node_origin: formData.node_origin,
                    latency_pref: formData.latency_pref
                }),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") === -1) {
                throw new Error("API response is not JSON. If running locally, make sure to use 'vercel dev' instead of 'npm run dev'.");
            }

            const data = await response.json();

            if (response.ok) {
                setStatus('SUCCESS');
                console.log("Broadcast Result:", data);
                // Optionally show success stats
                // alert(`Sent to ${data.count} nodes.`); 
                setTimeout(() => setStatus('IDLE'), 3000);
            } else {
                console.error("Broadcast Failed:", data.error);
                setStatus('ERROR');
                alert(`ERROR: ${data.error}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            setStatus('ERROR');
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0] text-[#111] font-mono flex flex-col overflow-hidden selection:bg-black selection:text-white">

            {/* Top Navigation Bar */}
            <header className="h-[60px] bg-[#EAEAEA] border-b border-[#D4D4D4] flex items-center justify-between px-6 z-20">
                <div className="flex items-center h-full">
                    <div className="font-black text-lg tracking-widest mr-12 flex items-center gap-2">
                        <div className="w-4 h-4 bg-black"></div>
                        BURST_CONTROL_CENTER
                    </div>

                    {/* Tabs */}
                    <div className="flex h-full">
                        <div
                            onClick={() => setActiveTab('LOGS')}
                            className={`h-full flex items-center px-6 text-xs font-bold border-r border-[#D4D4D4] hover:bg-white cursor-pointer transition-colors ${activeTab === 'LOGS' ? 'bg-white text-black' : 'bg-[#EAEAEA] text-[#888]'}`}
                        >
                            CORE_LOGS
                        </div>
                        <div
                            onClick={() => setActiveTab('BURST')}
                            className={`h-full flex items-center px-6 text-xs font-bold border-r border-[#D4D4D4] hover:bg-white cursor-pointer transition-colors ${activeTab === 'BURST' ? 'bg-white text-black' : 'bg-[#EAEAEA] text-[#888]'}`}
                        >
                            NEURAL_SYNAPSE
                        </div>
                        <div className="h-full flex items-center px-6 text-white text-xs font-bold bg-black border-r border-black cursor-default">
                            ● DISPATCHER
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 text-[10px] text-[#666] font-bold tracking-wider">
                    <span>[SEARCH_INDEX]</span>
                    <span>LOC: 0X88.2.1</span>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 relative">

                {/* Background Grid Lines */}
                <div className="absolute inset-0 pointer-events-none z-0" style={{
                    backgroundImage: `linear-gradient(to right, #E0E0E0 1px, transparent 1px), linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Left Editor Area */}
                {/* Left Editor Area (Conditionally Rendered) */}
                {activeTab === 'LOGS' ? (
                    <div className="flex-1 p-12 relative z-10 flex flex-col h-full overflow-hidden">
                        <div className="mb-8 flex justify-between items-end">
                            <div>
                                <div className="text-[10px] text-[#888] tracking-[2px] mb-2 font-bold">SYSTEM_LOGS // 0X552</div>
                                <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.9]">
                                    COMMUNICATION<br />ARCHIVE
                                </h1>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] bg-black text-white px-3 py-1 font-bold mb-2 inline-block">LIVE_FEED</div>
                            </div>
                        </div>

                        <div className="flex-1 bg-white border border-[#DDD] shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative flex flex-col overflow-hidden">
                            {/* Logs Table Header */}
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#EEE] bg-[#FAFAFA] text-[10px] font-bold text-[#888] tracking-wider uppercase">
                                <div className="col-span-2">TIMESTAMP</div>
                                <div className="col-span-1">STATUS</div>
                                <div className="col-span-2">TRIGGER</div>
                                <div className="col-span-3">RECIPIENT</div>
                                <div className="col-span-4">SUBJECT / ERROR</div>
                            </div>

                            {/* Logs Scrollable Area */}
                            <div className="flex-1 overflow-auto p-0">
                                {emailLogs.map((log) => (
                                    <div key={log.id} className="grid grid-cols-12 gap-4 p-4 border-b border-[#F0F0F0] text-xs hover:bg-[#F9F9F9] transition-colors font-mono">
                                        <div className="col-span-2 text-[#666]">{new Date(log.created_at).toLocaleTimeString()}</div>
                                        <div className="col-span-1">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.status === 'SENT' ? 'bg-[#00D655]/10 text-[#00D655]' : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-[#444] font-bold">{log.trigger_source}</div>
                                        <div className="col-span-3 text-[#666] truncate">{log.recipient}</div>
                                        <div className="col-span-4 text-[#333] truncate" title={log.error || log.subject}>
                                            {log.status === 'FAILED' ? <span className="text-red-500 font-bold">ERR: {log.error}</span> : log.subject}
                                        </div>
                                    </div>
                                ))}
                                {emailLogs.length === 0 && (
                                    <div className="p-12 text-center text-[#888] italic">NO_LOGS_FOUND_IN_ARCHIVE</div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 p-12 relative z-10 flex flex-col">
                        <div className="mb-8">
                            <div className="text-[10px] text-[#888] tracking-[2px] mb-2 font-bold">SYSTEM PROTOCOL // 0X442</div>
                            <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.9]">
                                TRANSMISSION<br />PAYLOAD
                            </h1>
                        </div>

                        <div className="flex-1 bg-white border border-[#DDD] shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative flex flex-col overflow-hidden">
                            {/* Buffer Cap Label */}
                            <div className="absolute top-0 right-0 p-4 border-l border-b border-[#EEE] bg-[#FAFAFA] text-right">
                                <div className="text-[9px] text-[#888] font-bold tracking-widest">BUFFER_CAP</div>
                                <div className="text-xl font-bold">128kb</div>
                            </div>

                            {/* Editor Content */}
                            <div className="flex flex-1 p-8 font-mono text-sm leading-relaxed overflow-auto">
                                {/* Line Numbers */}
                                <div className="flex flex-col text-right pr-6 mr-6 border-r border-[#EEE] text-[#CCC] select-none font-bold">
                                    {Array.from({ length: 25 }, (_, i) => (
                                        <div key={i} className="leading-relaxed">{i + 1}</div>
                                    ))}
                                </div>

                                {/* Text Area */}
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="flex-1 resize-none outline-none border-none bg-transparent font-mono text-[#333] leading-relaxed"
                                    spellCheck="false"
                                />
                            </div>

                            {/* Editor Footer */}
                            <div className="h-8 border-t border-[#EEE] bg-[#FAFAFA] flex items-center justify-between px-4 text-[9px] font-bold text-[#888] tracking-wider uppercase">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D655]"></span>
                                    SYNTAX: HTML5_COMPLIANT
                                </div>
                                <div>AUTO_SAVE: ENABLED [14:02:22]</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Configuration Sidebar */}
                <div className="w-[450px] bg-[#F5F5F5] border-l border-[#DDD] p-10 relative z-10 flex flex-col h-full overflow-y-auto">

                    <div className="text-[10px] text-[#888] tracking-[3px] font-bold mb-8 uppercase border-b border-[#DDD] pb-4">
                        CONFIGURATION // SETUP
                    </div>

                    <h2 className="text-3xl font-black uppercase mb-12 leading-none">
                        DISPATCH<br />PARAMETERS
                    </h2>

                    {/* Subject Line Input */}
                    <div className="mb-10 Group">
                        <label className="block text-[10px] font-bold text-[#888] tracking-widest mb-3 uppercase">SUBJECT_LINE_ID</label>
                        <input
                            type="text"
                            name="subject_id"
                            value={formData.subject_id}
                            onChange={handleChange}
                            className="w-full bg-[#EAEAEA] border border-[#D4D4D4] p-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-black transition-colors"
                        />
                    </div>

                    {/* Node Origin Selector (Added per request) */}
                    <div className="mb-10">
                        <label className="block text-[10px] font-bold text-[#888] tracking-widest mb-3 uppercase">ORIGIN_POINT</label>
                        <div className="relative">
                            <select
                                name="node_origin"
                                value={formData.node_origin}
                                onChange={handleChange}
                                className="w-full bg-[#EAEAEA] border border-[#D4D4D4] p-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-black transition-colors appearance-none cursor-pointer uppercase"
                            >
                                <option value="SECTOR_07" className="text-black">SECTOR - 7</option>
                                <option value="SECTOR_09" className="text-black">SECTOR - 9</option>
                                <option value="PROXY_NODE" className="text-black">PROXY_NODE</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-black font-bold">▼</div>
                        </div>
                    </div>

                    {/* Latency Pref Selector (Added per request) */}
                    <div className="mb-10">
                        <label className="block text-[10px] font-bold text-[#888] tracking-widest mb-3 uppercase">LATENCY_PREF</label>
                        <div className="relative">
                            <select
                                name="latency_pref"
                                value={formData.latency_pref}
                                onChange={handleChange}
                                className="w-full bg-[#EAEAEA] border border-[#D4D4D4] p-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-black transition-colors appearance-none cursor-pointer uppercase"
                            >
                                <option value="ULTRA_LOW" className="text-black">ULTRA_LOW</option>
                                <option value="BALANCED" className="text-black">BALANCED</option>
                                <option value="SECURE" className="text-black">SECURE</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-black font-bold">▼</div>
                        </div>
                    </div>

                    {/* Priority Dropdown */}
                    <div className="mb-10">
                        <label className="block text-[10px] font-bold text-[#888] tracking-widest mb-3 uppercase">BURST_PRIORITY</label>
                        <div className="relative">
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-[#EAEAEA] border border-[#D4D4D4] p-4 text-sm font-bold font-mono outline-none focus:bg-white focus:border-black transition-colors appearance-none cursor-pointer"
                            >
                                <option value="PRIORITY_STANDARD [BATCHED]">PRIORITY_STANDARD [BATCHED]</option>
                                <option value="PRIORITY_HIGH [IMMEDIATE]">PRIORITY_HIGH [IMMEDIATE]</option>
                                <option value="PRIORITY_CRITICAL [OVERRIDE]">PRIORITY_CRITICAL [OVERRIDE]</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-black font-bold">▼</div>
                        </div>
                    </div>

                    {/* Target Nodes Counter */}
                    <div className="mb-auto">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-[10px] font-bold text-[#888] tracking-widest uppercase">TARGET_NODES</label>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D655] animate-pulse"></span>
                                <span className="text-[9px] font-bold text-[#00D655] uppercase tracking-wider">LIVE_DB_SYNC</span>
                            </div>
                        </div>
                        <div className="bg-white border border-[#D4D4D4] p-6 flex justify-between items-center shadow-sm">
                            <div className="text-4xl font-black tracking-tight">{recipientCount.toLocaleString()}</div>
                            <div className="text-[10px] border border-[#EEE] px-2 py-1 rounded bg-[#FAFAFA] font-bold text-[#888]">RECIPIENTS</div>
                        </div>
                    </div>

                    {/* Broadcast Button */}
                    <button
                        onClick={handleBroadcast}
                        disabled={status !== 'IDLE'}
                        className="mt-8 bg-black text-white w-full py-6 px-8 flex justify-between items-center font-bold tracking-widest hover:bg-[#222] transition-all active:scale-[0.99]"
                    >
                        <span>{status === 'SENDING' ? 'INITIALIZING...' : status === 'SUCCESS' ? 'BROADCAST SENT' : 'INITIALIZE_BROADCAST'}</span>
                        <span className="text-xl">{'->'}</span>
                    </button>

                </div>

            </div>

            {/* Bottom Footer */}
            <footer className="h-[40px] bg-[#F0F0F0] border-t border-[#D4D4D4] flex justify-between items-center px-6 text-[10px] font-bold text-[#888] uppercase tracking-wider">
                <div className="flex gap-12">
                    <span className="text-black">STATUS: AWAITING_INPUT</span>
                    <span>ENCRYPTION: AES-256</span>
                    <span>SIGNAL: <span className="text-[#00D655]">STABLE (14ms)</span></span>
                </div>
                <div>© 2052 PIXY_NETWORKS</div>
            </footer>

        </div>
    );
};

export default AdminBurst;
