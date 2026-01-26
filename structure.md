# Project Structure & Architecture

## 1. Directory Structure

```graphql
src/
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable UI components
│   ├── BootSequence.jsx    # "Matrix-style" initial loading animation
│   ├── DataStream.jsx      # Digital rain effect component
│   ├── ErrorBoundary.jsx   # React error boundary for graceful crash handling
│   ├── Footer.jsx          # Site footer
│   ├── Header.jsx          # Logged-in/out navigation header
│   ├── NewsGrid.jsx        # Displays list of blog posts (from Supabase)
│   └── StatusTicker.jsx    # Scrolling text ticker (if used)
├── context/
│   └── BlogContext.jsx     # Global state management (User, Posts, Auth)
├── data/
│   └── ...                 # Static data files (if any)
├── pages/                  # Route-specific page components
│   ├── About.jsx           # "About" page
│   ├── Archive.jsx         # Full list of historical posts
│   ├── BlogPost.jsx        # Individual blog post view (/blog/:id)
│   ├── CoreLogs.jsx        # System logs view
│   ├── Diagnostics.jsx     # System diagnostics utility
│   ├── EditPost.jsx        # CMS Interface for creating/editing posts
│   ├── Login.jsx           # Authentication page
│   ├── NeuralSynapse.jsx   # Interactive visual page
│   └── ...                 # Other auxiliary pages
├── App.jsx                 # Main Application Component & Routing
├── main.jsx                # React Entry Point
├── supabaseClient.js       # Supabase Client Configuration
├── index.css               # Global Styles & Tailwind Directives
└── ...                     # Component-specific CSS files
```

## 2. Architecture Overview

### Component Hierarchy (Mermaid)

```mermaid
graph TD
    index[main.jsx] --> App
    App --> BlogProvider
    BlogProvider --> ErrorBoundary
    ErrorBoundary --> Router
    
    Router --> Home
    Router --> BlogPost
    Router --> Archive
    Router --> AdminPages[Admin/Edit Pages]
    
    Home --> BootSequence
    Home --> Header
    Home --> HeroSection
    Home --> NewsGrid
    Home --> Footer
    
    NewsGrid --> PostCard[Post Item]
    
    BlogProvider -- Provides State --> Home
    BlogProvider -- Provides State --> NewsGrid
    BlogProvider -- Provides State --> BlogPost
```

### Key Systems

#### 1. Routing System (`App.jsx`)
- Uses `createBrowserRouter` from `react-router-dom`.
- Implements **Code Splitting** via `React.lazy()` and `Suspense` for performance.
- Each route (e.g., `/`, `/blog/:id`) is lazy-loaded to reduce initial bundle size.

#### 2. State Management (`BlogContext.jsx`)
- **Purpose**: Centralized state for the application.
- **Key Data**:
    - `posts`: Array of blog posts fetched from Supabase.
    - `user`: Current authenticated user session.
    - `loading` / `error`: Data fetch status.
- **Pattern**: Uses React Context API. Wraps the entire app in `App.jsx`.
- **Caching**: Implements `localStorage` caching (`cached_posts`) for instant "offline-first" feel.

#### 3. Data Layer (`supabaseClient.js`)
- **Service**: Supabase (PostgreSQL + Auth).
- **Environment**: Configured via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Usage**:
    - `BlogContext` fetches all posts on mount.
    - `Home` and other pages can subscribe to real-time changes (if implemented).

#### 4. Styling System
- **Core**: Tailwind CSS (utility classes).
- **Custom**: Heavy use of custom CSS files (e.g., `neural-synapse.css`) for the "Cyberpunk" aesthetic.
- **Effects**:
    - Scanlines, CRT flickers, and text glows are handled mostly in CSS.
    - `App.jsx` tracks mouse movement (`--mouse-x`, `--mouse-y`) for dynamic background grids.

## 3. Data Flow

1.  **Initialization**:
    - App starts. `BlogProvider` initializes.
    - Checks `localStorage` for cached posts (immediate display).
    - Checks Supabase Auth session for user login.

2.  **Fetching**:
    - `useEffect` in `BlogContext` calls `fetchPosts()`.
    - Queries `news_posts` table in Supabase.
    - Updates `posts` state and refreshes `localStorage` cache.

3.  **Display**:
    - Components like `Home` consume `useBlog()`.
    - `NewsGrid` receives `posts` and mapping them to UI cards.

## 4. Connection Map

| Component | Connected To | Reason |
| :--- | :--- | :--- |
| `Home.jsx` | `BlogContext` | Needs list of posts to display in grid. |
| `Home.jsx` | `Header/Footer` | Layout structure. |
| `BlogPost.jsx` | `BlogContext` | Needs to find specific post by ID. |
| `EditPost.jsx` | `Supabase` | Direct DB writes for creating/updating content. |
| `App.jsx` | `BlogContext` | Provides the context provider to the tree. |
