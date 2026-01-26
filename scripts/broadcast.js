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
    console.log("INITIATING_UPLINK: Scanning for clandestine data packets...");

    // 1. Fetch one unsent Secret Burst
    const { data: burst, error: burstError } = await supabase
      .from('secret_bursts')
      .select('*')
      .eq('is_sent', false)
      .limit(1)
      .maybeSingle();

    if (burstError) throw burstError;

    if (!burst) {
      console.log("SILENT_MODE: No new secret bursts to transmit.");
      return;
    }

    console.log(`PACKET_FOUND: [${burst.burst_type}] ${burst.subject}`);

    // 2. Fetch all Collective Members
    const { data: members, error: memError } = await supabase
      .from('collective_members')
      .select('email');

    if (memError) throw memError;

    if (!members || members.length === 0) {
      console.log("UPLINK_TERMINATED: No field agents found.");
      return;
    }

    const emailList = members.map(m => m.email);
    console.log(`TARGETS_LOCKED: ${emailList.length} agents.`);

    // 3. Send via Gmail SMTP
    const mailOptions = {
      from: `"Elias-7 // Partition 09" <${process.env.GMAIL_USER}>`,
      bcc: emailList,
      subject: burst.subject,
      // Raw text format for immersion
      text: `[DECRYPTED DATA]: \n\n${burst.content}\n\n[END_OF_TRANSMISSION]\n// ID_REF: ${burst.id}`,
      html: `
<div style="background: #050505; color: #00FF41; font-family: 'Courier New', monospace; padding: 20px;">
    <h3 style="border-bottom: 1px solid #00FF41; padding-bottom: 10px;">[SIGNAL_INTERCEPT] TYPE: ${burst.burst_type}</h3>
    <pre style="white-space: pre-wrap; color: #ccc;">${burst.content}</pre>
    <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 10px; font-size: 10px; color: #666;">
        // PURGE_ID: ${burst.id}<br/>
        // CONNECTION: TERMINATED
    </div>
</div>
            `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("UPLINK_SUCCESSFUL: Burst transmitted. ID: " + info.messageId);

    // 4. Mark as Sent
    const { error: updateError } = await supabase
      .from('secret_bursts')
      .update({ is_sent: true })
      .eq('id', burst.id);

    if (updateError) console.error("WARNING: Failed to mark burst as sent.", updateError);

  } catch (err) {
    console.error("UPLINK_CRITICAL_FAILURE:", err.message);
    process.exit(1);
  }
}

initiateWeeklyUplink();
