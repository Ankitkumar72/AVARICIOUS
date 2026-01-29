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

    const { subject, content, node_origin, latency_pref } = req.body;

    if (!subject || !content) {
        return res.status(400).json({ error: 'Missing subject or content' });
    }

    try {
        // 1. Fetch Recipients from Database
        // Note: In a real "Sector/Node" system, we would filter by node_origin here.
        // For now, we fetch ALL active members.
        const { data: recipients, error: dbError } = await supabase
            .from('collective_members')
            .select('email')
            .eq('status', 'ACTIVE'); // Assuming you want only active members

        if (dbError) throw dbError;

        if (!recipients || recipients.length === 0) {
            return res.status(200).json({ success: true, count: 0, message: 'No recipients found.' });
        }

        // 2. Loop and Send (Basic Batching)
        // Note: For GMAIL_USER, limits apply. This loop is sequential to be gentle.
        let sentCount = 0;
        const failedEmails = [];

        for (const recipient of recipients) {
            try {
                await transporter.sendMail({
                    from: `"Elias-7 [Sector_7_Node]" <${process.env.GMAIL_USER}>`,
                    to: recipient.email,
                    subject: subject, // "SIGNAL_ESTABLISHED..."
                    html: `
                        <div style="background: #000; color: #ccc; font-family: monospace; padding: 40px; line-height: 1.6;">
                            
                            <div style="border: 1px solid #333; padding: 10px; margin-bottom: 20px; color: #666; font-size: 0.8rem;">
                                <div>// TRANSMISSION_SOURCE: ${node_origin || 'UNKNOWN_NODE'}</div>
                                <div>// ENCRYPTION: ${latency_pref || 'STANDARD'}</div>
                            </div>

                            <h2 style="color: #fff; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 30px;">
                                ${subject}
                            </h2>

                            <div style="white-space: pre-wrap;">${content}</div>

                            <hr style="border: 1px solid #333; margin: 30px 0;">

                            <p style="text-align: center; letter-spacing: 2px; font-weight: bold; color: #fff; font-size: 0.8rem;">
                                PIXY_NETWORK // END_OF_LINE
                            </p>
                        </div>
                    `
                });
                sentCount++;
            } catch (err) {
                console.error(`Failed to send to ${recipient.email}:`, err);
                failedEmails.push(recipient.email);
            }
        }

        return res.status(200).json({
            success: true,
            count: sentCount,
            failed: failedEmails.length
        });

    } catch (error) {
        console.error('Burst Endpoint Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
