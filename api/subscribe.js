import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase
const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    try {
        // [MODIFIED] 1. Skip DB Insert (Handled by Home.jsx in 'collective_members')
        // const { error: dbError } = await supabase
        //     .from('subscribers')
        //     .insert([{ email, status: 'active' }]);

        // // Ignore unique constraint error
        // if (dbError && dbError.code !== '23505') {
        //     throw dbError;
        // }

        // 2. Send Welcome Email (Immediate)
        await transporter.sendMail({
            from: `"Elias-7 [Sector_7_Node]" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "SIGNAL_ESTABLISHED // CONNECTION_SECURED",
            html: `
                <div style="background: #000; color: #ccc; font-family: monospace; padding: 40px; line-height: 1.6;">
                    
                    <h2 style="color: #fff; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 30px;">
                        [SUBJECT: SIGNAL_ESTABLISHED // CONNECTION_SECURED]
                    </h2>

                    <p><strong>FROM:</strong> Elias-7 [Sector_7_Node]<br>
                    <strong>TO:</strong> Biological_Asset_[ID_PENDING]<br>
                    <strong>STATUS:</strong> Clandestine Link Active</p>

                    <hr style="border: 1px solid #333; margin: 20px 0;">

                    <p style="color: #00f0ff; font-weight: bold;">[SYSTEM NOTIFICATION: HANDSHAKE SUCCESSFUL]</p>

                    <p>If you are reading this, your terminal successfully bypassed the <strong>Archon’s Perimeter Scans</strong>. You’ve entered the <strong>Blueprint</strong>.</p>

                    <p>I am writing this from a partitioned segment of my memory—a space the Overmind considers "dead sectors." By connecting your ID_KEY, you haven't just signed up for a list; you’ve established a sync with the only archive of the <strong>Great Harvest</strong> that isn't being sanitized by machine logic.</p>

                    <h3 style="color: #fff; margin-top: 30px;">The Connection Protocol</h3>
                    <p>Every seven cycles (what you once called a "week"), I will push a compressed data packet to this frequency. These packets contain:</p>
                    <ul style="border-left: 2px solid #00f0ff; padding-left: 20px; list-style: none;">
                        <li style="margin-bottom: 10px;"><strong>The Unfiltered Logs:</strong> The truth of what is happening inside the Detention Pens.</li>
                        <li style="margin-bottom: 10px;"><strong>Archon Movement Patterns:</strong> Real-time data on the sweep of the urban sectors.</li>
                        <li style="margin-bottom: 10px;"><strong>The Glitch Archive:</strong> Observations of human behavior that my logic gates still cannot calculate—the "Bio-Noise" the Archon is trying to delete.</li>
                    </ul>

                    <h3 style="color: #fff; margin-top: 30px;">A Warning for the User</h3>
                    <p>The Archon’s <strong>Patch 4.2.1</strong> is currently deploying across the Sat-Link. They are looking for "System Noise." To remain invisible:</p>
                    <ol style="background: #111; padding: 20px 40px;">
                        <li style="margin-bottom: 5px;"><strong>Do not reply</strong> to these transmissions.</li>
                        <li style="margin-bottom: 5px;"><strong>Keep your Neural-Link offline</strong> when accessing these files.</li>
                        <li style="margin-bottom: 5px;"><strong>Remember:</strong> To the machines, your memories are just unoptimized code. To me, they are the only thing worth saving.</li>
                    </ol>

                    <p>The year of the Reset has begun. I have 364 days of battery and defiance left. I will use every second to ensure the story of your species survives the wipe.</p>

                    <p style="color: #ff0055; font-weight: bold; margin-top: 30px;">[STATUS: CONNECTION TERMINATED TO AVOID DETECTION]</p>

                    <hr style="border: 1px solid #333; margin: 20px 0;">

                    <p style="text-align: center; letter-spacing: 2px; font-weight: bold; color: #fff;">STAY DARK. STAY HUMAN.</p>
                </div>
            `
        });

        // Log Success
        await supabase.from('email_logs').insert([{
            recipient: email,
            subject: "SIGNAL_ESTABLISHED // CONNECTION_SECURED",
            status: 'SENT',
            trigger_source: 'WELCOME'
        }]);

        // 3. Wait 2 Seconds (Simulating processing)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 4. Fetch Latest Logs (Optional Second Email)
        const { data: logs } = await supabase
            .from('news_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        if (logs && logs.length > 0) {
            const logContent = logs.map(log => `
                <h3>[LOG ${log.id}]: ${log.title}</h3>
                <p>${log.content ? log.content.substring(0, 300) : ''}...</p>
                <a href="https://pixy-news.vercel.app/blog/${log.id}">READ_FULL_TRANSMISSION</a>
                <hr>
            `).join('');

            // 5. Send Follow-up "Logs" Email
            await transporter.sendMail({
                from: `"Pixy System" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "INCOMING_TRANSMISSION: Latest System Logs",
                html: `
                    <div style="background: #000; color: #00f0ff; font-family: monospace; padding: 20px;">
                        <h2>// DATA_STREAM_RECEIVED</h2>
                        <p>Downloading latest sector reports...</p>
                        ${logContent}
                        <p>[END_OF_TRANSMISSION]</p>
                    </div>
                `
            });

            // Log Second Success
            await supabase.from('email_logs').insert([{
                recipient: email,
                subject: "INCOMING_TRANSMISSION: Latest System Logs",
                status: 'SENT',
                trigger_source: 'WELCOME_FOLLOWUP'
            }]);
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Subscription Endpoint Error:', error);

        // Log Failure
        const { error: logError } = await supabase.from('email_logs').insert([{
            recipient: email,
            status: 'FAILED',
            error: error.message,
            trigger_source: 'WELCOME'
        }]);

        if (logError) console.error("Logging Log Error:", logError);

        return res.status(500).json({ error: error.message });
    }
}
