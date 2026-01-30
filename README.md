# PIXY|NEWS.SYS

A futuristic, cyberpunk-themed news and data archival system.

## 🚀 Overview

**PIXY|NEWS.SYS** is a specialized front-end application designed to mimic a high-tech terminal interface. It serves as a news portal but operates like a system core, featuring "Core Logs," "System Integrity" checks, and an "Enforcement Bypass" module.

It is a **Hybrid Application**:
-   **Frontend**: React (Vite) for the immersive UI.
-   **Backend**: Vercel Serverless Functions for email automation and cron jobs.
-   **Database**: Supabase for real-time data and storage.

## ✨ Features

*   **Terminal Interface**: Custom CSS and animations (`scanlines`, `glitch` effects) to simulate a CRT monitor environment.
*   **Dynamic Blog Engine**: All logs/articles are stored in a database and rendered using Markdown (supports tables, code blocks, and images).
*   **Communication Hub (New)**:
    *   **Subscribe**: Users can join the "Network" to receive updates.
    *   **Auto-Digest**: Automated weekly emails (Wed/Sun) summarizing recent posts via Vercel Cron.
    *   **Burst Control**: Admins can broadcast manual messages to all subscribers via the "Uplink" console.
*   **Core Logs**: A raw data view of system activities and archive entries.
*   **System Integrity Module**: A dashboard visualizing real-time system metrics, threat levels, and module status.
*   **Enforcement Bypass**: An interactive "hacking" module.
*   **Admin Editor**: A protected `/editor` route that allows authorized users ("Unit Admins") to write, format, and upload new logs directly to the live site.
*   **Secure Auth**: Restricts access to sensitive areas using Supabase Authentication.

## 🛠️ Tech Stack

*   **Framework**: React 18 + Vite
*   **Language**: JavaScript (ES6+)
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Database**: Supabase (PostgreSQL)
*   **Backend Logic**: Vercel Serverless Functions (`/api/*`)
*   **Email Service**: Nodemailer (Gmail SMTP)
*   **Automation**: Vercel Cron Jobs
*   **Deployment**: Vercel

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd Blog-Begining
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    GMAIL_USER=your_email@gmail.com
    GMAIL_APP_PASSWORD=your_app_password
    ```

4.  **Database Setup**
    *   Run `src/db_setup.sql` in Supabase SQL Editor (creates `news_posts`).
    *   Run `src/setup_email_logs.sql` (creates `email_logs`, `subscribers`).

5.  **Run Locally**
    *   **Frontend**: `npm run dev` (http://localhost:5173)
    *   **Backend API**: To test API functions locally, use `vercel dev`.

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Crucial**: Add all Environment Variables (`VITE_SUPABASE_*`, `GMAIL_*`) in Vercel settings.
4.  **Cron Jobs**: Automatically configured via `vercel.json` upon deployment.

## 🛡️ Security

*   **RLS Policies**: The database is configured with Row Level Security. Public users can read logs, but only authenticated users can modify them.
*   **Route Protection**: The `/editor` and `/admin/uplink` pages check for a valid session token.

## 📄 License

Restricted System Access. © 2052 PIXY_NETWORKS.