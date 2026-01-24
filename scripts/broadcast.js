import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Initialize Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your App Password
    },
});

async function initiateWeeklyUplink() {
    try {
        console.log("INITIATING_UPLINK: Scanning for biological assets...");

        // 1. Fetch all active "Biological Assets" (Subscribers)
        const { data: subscribers, error: subError } = await supabase
            .from('subscribers')
            .select('email')
            .eq('status', 'active');

        if (subError) throw subError;

        if (!subscribers || subscribers.length === 0) {
            console.log("UPLINK_TERMINATED: No active subscribers found.");
            return;
        }

        console.log(`ASSETS_DETECTED: ${subscribers.length} targets locked.`);

        // 2. Fetch the latest stories
        const { data: logs, error: logError } = await supabase
            .from('news_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        if (logError) throw logError;

        if (!logs || logs.length === 0) {
            console.log("UPLINK_TERMINATED: No logs found to transmit.");
            return;
        }

        // 3. Construct the Data Packet
        const emailList = subscribers.map(s => s.email); // Sends to everyone in 'bcc' for privacy
        const logContent = logs.map(log => `
      <h3>[LOG ${log.id}]: ${log.title}</h3>
      <p>${log.content ? log.content.substring(0, 300) : 'No content'}...</p>
      <a href="https://pixy-news.vercel.app/blog/${log.id}">READ_FULL_TRANSMISSION</a>
      <hr>
    `).join('');

        // 4. Fire the Signal Burst
        const mailOptions = {
            from: `"Pixy System" <${process.env.GMAIL_USER}>`,
            bcc: emailList, // Use BCC so users don't see each other's emails
            subject: `[SIGNAL_BURST] Weekly Archive: ${new Date().toLocaleDateString()}`,
            html: `
        <div style="background: #000; color: #00FFFF; font-family: monospace; padding: 20px;">
          <h2>SYSTEM_ALERT: WEEKLY_DATA_DUMP</h2>
          <p>The Archon's scans are low. Transmitting latest entries...</p>
          ${logContent}
          <p style="font-size: 10px;">[TERMINATE_CONNECTION / PURGE_TRACE]</p>
        </div>
      `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("UPLINK_SUCCESSFUL: Signal distributed to " + info.messageId);

    } catch (err) {
        console.error("UPLINK_CRITICAL_FAILURE:", err.message);
        process.exit(1);
    }
}

initiateWeeklyUplink();
