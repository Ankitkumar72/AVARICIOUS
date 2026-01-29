import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export default async function handler(req, res) {
    // Vercel Cron authentication (optional but recommended in prod)
    // For now we allow open access for testing or simple setup

    try {
        // 1. Fetch posts from the last 4 days (covers Wed->Sun gap)
        const fourDaysAgo = new Date();
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

        const { data: posts, error: postError } = await supabase
            .from('news_posts')
            .select('*')
            .gte('created_at', fourDaysAgo.toISOString())
            .order('created_at', { ascending: false });

        if (postError) throw postError;

        if (!posts || posts.length === 0) {
            console.log('No new posts to broadcast.');
            return res.status(200).json({ skipped: true, reason: 'No new content' });
        }

        // 2. Fetch all subscribers
        const { data: recipients, error: dbError } = await supabase
            .from('collective_members')
            .select('email')
            .eq('status', 'ACTIVE');

        if (dbError) throw dbError;

        if (!recipients || recipients.length === 0) {
            return res.status(200).json({ skipped: true, reason: 'No active subscribers' });
        }

        // 3. Format Digest HTML
        const digestContent = posts.map(post => `
            <div style="margin-bottom: 40px; border-left: 2px solid #00f0ff; padding-left: 20px;">
                <h3 style="color: #fff; margin: 0 0 10px 0;">${post.title}</h3>
                <div style="color: #888; font-size: 0.8rem; margin-bottom: 10px;">// LOG_ID: ${post.id.split('-')[0]}</div>
                <p style="color: #ccc;">${post.content ? post.content.substring(0, 200) + '...' : 'Data fragment...'}</p>
                <a href="https://pixy-news.vercel.app/blog/${post.slug || post.id}" 
                   style="color: #00f0ff; text-decoration: none; font-weight: bold; font-size: 0.8rem;">
                   [ACCESS_FULL_LOG] ->
                </a>
            </div>
        `).join('');

        const emailHtml = `
            <div style="background: #000; color: #ccc; font-family: monospace; padding: 40px; line-height: 1.6;">
                <h2 style="color: #fff; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 30px;">
                    // AUTOMATED_DIGEST
                </h2>
                
                <p><strong>STATUS:</strong> Routine Sync</p>
                <p>New entries detected in the archives.</p>

                <hr style="border: 1px solid #333; margin: 30px 0;">

                ${digestContent}

                <hr style="border: 1px solid #333; margin: 30px 0;">
                
                <p style="text-align: center; color: #666; font-size: 0.7rem;">
                    To unsubscribe, reply "2052_OBLIVION" (Manual Removal)
                </p>
            </div>
        `;

        // 4. Send Emails (Sequential loop to be safe with Gmail limits)
        let sentCount = 0;
        for (const recipient of recipients) {
            try {
                await transporter.sendMail({
                    from: `"Elias-7 [Automated]" <${process.env.GMAIL_USER}>`,
                    to: recipient.email,
                    subject: `// DIGEST: ${posts.length} New System Logs`,
                    html: emailHtml
                });

                // Log Success
                await supabase.from('email_logs').insert([{
                    recipient: recipient.email,
                    subject: `// DIGEST: ${posts.length} New System Logs`,
                    status: 'SENT',
                    trigger_source: 'DIGEST'
                }]);

                sentCount++;
            } catch (err) {
                console.error(`Failed to send digest to ${recipient.email}:`, err);

                // Log Failure
                await supabase.from('email_logs').insert([{
                    recipient: recipient.email,
                    subject: `// DIGEST: ${posts.length} New System Logs`,
                    status: 'FAILED',
                    error: err.message,
                    trigger_source: 'DIGEST'
                }]);
            }
        }

        return res.status(200).json({ success: true, count: sentCount });

    } catch (error) {
        console.error('Digest Cron Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
