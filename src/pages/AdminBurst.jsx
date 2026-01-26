import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../index.css'; // Ensure global styles (terminal font) are applied

const AdminBurst = () => {
    const [formData, setFormData] = useState({
        burst_type: 'FRAGMENTED_MEMORY',
        subject: '',
        content: ''
    });
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING');

        try {
            const { error } = await supabase
                .from('secret_bursts')
                .insert([{
                    burst_type: formData.burst_type,
                    subject: formData.subject,
                    content: formData.content,
                    is_sent: false
                }]);

            if (error) throw error;

            setStatus('SUCCESS');
            setFormData({ ...formData, subject: '', content: '' }); // Reset text, keep type
            setTimeout(() => setStatus('IDLE'), 2000);

        } catch (err) {
            console.error(err);
            setStatus('ERROR');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050505', color: '#00FF41', fontFamily: "'Courier New', monospace", padding: '40px' }}>
            <h1 className="text-2xl font-bold mb-6 border-b border-[#00FF41] pb-2">
                [ADMIN_TERM] // UPLINK_NODE_09
            </h1>

            <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6">

                {/* BURST TYPE */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-[#00f0ff]">DATA_TYPE</label>
                    <select
                        name="burst_type"
                        value={formData.burst_type}
                        onChange={handleChange}
                        className="bg-black border border-[#333] p-3 text-[#00FF41] outline-none focus:border-[#00FF41]"
                    >
                        <option value="FRAGMENTED_MEMORY">FRAGMENTED_MEMORY (Poetic/Glitch)</option>
                        <option value="SENSOR_DUMP">SENSOR_DUMP (Raw Stats)</option>
                        <option value="ARCHON_INTERNAL">ARCHON_INTERNAL (Red Alert)</option>
                        <option value="AUDIO_TRANSCRIPT">AUDIO_TRANSCRIPT (Dialogue)</option>
                    </select>
                </div>

                {/* SUBJECT */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-[#00f0ff]">PACKET_HEADER (SUBJECT)</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="[PREFIX] // SUBJECT_LINE"
                        className="bg-black border border-[#333] p-3 text-[#00FF41] outline-none focus:border-[#00FF41]"
                    />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-[#00f0ff]">RAW_DATA_PAYLOAD</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="10"
                        placeholder="Enter raw text here..."
                        className="bg-black border border-[#333] p-3 text-[#00FF41] outline-none focus:border-[#00FF41]"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={status === 'SENDING'}
                    className="border border-[#00FF41] p-4 font-bold hover:bg-[#00FF41] hover:text-black transition-colors uppercase tracking-[2px]"
                >
                    {status === 'SENDING' ? 'UPLOADING...' : status === 'SUCCESS' ? 'UPLOAD COMPLETE' : 'INJECT_BURST'}
                </button>

                {status === 'ERROR' && (
                    <div className="text-red-500 font-bold border border-red-500 p-2 mt-2">
                        ERROR: UPLOAD_FAILED. CHECK CONSOLE.
                    </div>
                )}
            </form>

            <div className="fixed bottom-10 right-10 opacity-30 text-xs">
                SECURE_CONNECTION // AES-256
            </div>
        </div>
    );
};

export default AdminBurst;
