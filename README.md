# PIXY|NEWS.SYS

A futuristic, cyberpunk-themed news and data archival system.

## 🚀 Overview

**PIXY|NEWS.SYS** is a specialized front-end application designed to mimic a high-tech terminal interface. It serves as a news portal but operates like a system core, featuring "Core Logs," "System Integrity" checks, and an "Enforcement Bypass" module. It is powered by **React** (Vite) and backed by **Supabase** for real-time data and storage.

## ✨ Features

*   **Terminal Interface**: Custom CSS and animations (`scanlines`, `glitch` effects) to simulate a CRT monitor environment.
*   **Dynamic Blog Engine**: All logs/articles are stored in a database and rendered using Markdown (supports tables, code blocks, and images).
*   **System Integrity Module**: A dashboard visualizing real-time system metrics, threat levels, and module status.
*   **Admin Editor**: A protected `/editor` route that allows authorized users ("Unit Admins") to write, format, and upload new logs directly to the live site.
*   **Secure Auth**: Restricts access to sensitive areas using Supabase Authentication.
*   **Responsive Design**: Fully optimized for mobile devices (includes custom grid tables and touch-friendly navigation).

## 🛠️ Tech Stack

*   **Framework**: React 18 + Vite
*   **Language**: JavaScript (ES6+)
*   **Styling**: Tailwind CSS + Custom CSS Variables
*   **Database**: Supabase (PostgreSQL)
*   **Storage**: Supabase Storage (for asset uploads)
*   **Routing**: React Router DOM v6+
*   **Markdown**: `react-markdown` + `remark-gfm`

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
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup (First Time Only)**
    If you are setting this up largely from scratch, you need to initialize the Supabase tables.
    *   Go to your Supabase Dashboard -> SQL Editor.
    *   Run the content of `src/db_setup.sql` to create the `news_posts` table.
    *   Run the content of `src/storage_setup.sql` to create the `blog_assets` bucket.

5.  **Run Locally**
    ```bash
    npm run dev
    ```
    Access the system at `http://localhost:5173`.

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Crucial**: Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel's "Environment Variables" settings.
4.  Deploy.

*(See `DEPLOYMENT_GUIDE.md` for a detailed walkthrough)*

## 🛡️ Security

*   **RLS Policies**: The database is configured with Row Level Security. Public users can read logs, but only authenticated users can modify them (configure this in Supabase policies).
*   **Route Protection**: The `/editor` page checks for a valid session token before loading.

## 📄 License

Restricted System Access. © 2052 PIXY_NETWORKS.