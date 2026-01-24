import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize the "Tech Stack"
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

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

        // 2. Fetch the latest stories (Adjust 'limit' based on your 2-3 posts/week)
        const { data: logs, error: logError } = await supabase
            .from('news_posts') // Corrected table name
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        if (logError) throw logError;

        if (!logs || logs.length === 0) {
            console.log("UPLINK_TERMINATED: No logs found to transmit.");
            return;
        }

        // 3. Construct the Data Packet
        const emailList = subscribers.map(s => s.email);
        const logContent = logs.map(log => `
      <h3>[LOG ${log.id}]: ${log.title}</h3>
      <p>${log.content ? log.content.substring(0, 300) : 'No content'}...</p>
      <a href="https://pixy-news.vercel.app/blog/${log.id}">READ_FULL_TRANSMISSION</a>
      <hr>
    `).join('');

        // 4. Fire the Signal Burst
        // Resend free tier limits to 1 email per request usually if using personal email, 
        // or batch sending if domain verified. 
        // NOTE: 'to' accepts array of strings, but check your Resend plan limits.
        // If needed, iterate and send individually to avoid exposing all emails in 'to' field (privacy),
        // OR use 'bcc'. For a newsletter, distinct emails or BCC is better.
        // However, for simplicity based on request, using single send with list.
        // Better privacy practice: Loop or BCC. 
        // Let's implement BCC for privacy if sending as one batch, or just keep as requested.
        // user snippet had `to: emailList`. 
        // CAUTION: 'to: [array]' reveals all recipients to each other in standard email headers unless backend handles it as batch custom.
        // Resend 'batch' API is different. 
        // Assuming 'to' works for now as requested, but adding a note.

        await resend.emails.send({
            from: 'onboarding@resend.dev', // Default testing domain (Only sends to YOUR email)
            to: emailList,
            subject: `[SIGNAL_BURST] Weekly Archive: ${new Date().toLocaleDateString()}`,
            html: `
        <div style="background: #000; color: #00FFFF; font-family: monospace; padding: 20px;">
          <h2>SYSTEM_ALERT: WEEKLY_DATA_DUMP</h2>
          <p>The Archon's scans are low. Transmitting latest entries...</p>
          ${logContent}
          <p style="font-size: 10px;">[TERMINATE_CONNECTION / PURGE_TRACE]</p>
        </div>
      `
        });

        console.log("UPLINK_SUCCESSFUL: Signal distributed to grid.");

    } catch (err) {
        console.error("UPLINK_CRITICAL_FAILURE:", err.message);
        process.exit(1);
    }
}

initiateWeeklyUplink();
