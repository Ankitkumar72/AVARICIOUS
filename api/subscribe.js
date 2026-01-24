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
        // 1. Save to Database
        const { error: dbError } = await supabase
            .from('subscribers')
            .insert([{ email, status: 'active' }]);

        // Ignore unique constraint error (user already subscribed), just proceed to send emails
        if (dbError && dbError.code !== '23505') {
            throw dbError;
        }

        // 2. Send Welcome Email (Immediate)
        await transporter.sendMail({
            from: `"Pixy System" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "UPLINK_ESTABLISHED: Welcome to the Grid",
            html: `
                <div style="background: #000; color: #00f0ff; font-family: monospace; padding: 20px;">
                    <h2>// CONNECTION_CONFIRMED</h2>
                    <p>Identity verified. You are now connected to the Pixy Neural Network.</p>
                    <p>Standby for data transmission...</p>
                </div>
            `
        });

        // 3. Wait 5 Seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        // 4. Fetch Latest Logs
        const { data: logs } = await supabase
            .from('news_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        const logContent = logs ? logs.map(log => `
            <h3>[LOG ${log.id}]: ${log.title}</h3>
            <p>${log.content ? log.content.substring(0, 300) : ''}...</p>
            <a href="https://pixy-news.vercel.app/blog/${log.id}">READ_FULL_TRANSMISSION</a>
            <hr>
        `).join('') : 'No active logs found.';

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

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Subscription Endpoint Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
