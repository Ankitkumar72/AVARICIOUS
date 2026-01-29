import { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import './index.css';
import { SpeedInsights } from "@vercel/speed-insights/react";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Home = lazy(() => import('./Home'));
const BlogPost = lazy(() => import('./BlogPost'));
const Login = lazy(() => import('./pages/Login'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Archive = lazy(() => import('./pages/Archive'));
const About = lazy(() => import('./pages/About'));
const CoreLogs = lazy(() => import('./pages/CoreLogs'));
const NeuralSynapse = lazy(() => import('./pages/NeuralSynapse'));
const JoinNetwork = lazy(() => import('./pages/JoinNetwork'));
const EnforcementBypass = lazy(() => import('./pages/EnforcementBypass'));
const SystemIntegrity = lazy(() => import('./pages/SystemIntegrity'));
const AdminBurst = lazy(() => import('./pages/AdminBurst'));
const Diagnostics = lazy(() => import('./pages/Diagnostics'));
const Welcome = lazy(() => import('./pages/Welcome'));

// Loading Fallback Component
const LoadingScreen = () => (
  <div style={{
    height: '100vh',
    width: '100vw',
    display: 'grid',
    placeItems: 'center',
    background: '#050505',
    color: '#00f0ff',
    fontFamily: 'monospace',
    letterSpacing: '2px'
  }}>
    INITIALIZING SYSTEM...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <BlogPost />
      </Suspense>
    ),
  },
  {
    path: "/archive",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Archive />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/editor",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <EditPost />
      </Suspense>
    ),
  },
  {
    path: "/editor/:id",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <EditPost />
      </Suspense>
    ),
  },
  {
    path: "/core-logs",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <CoreLogs />
      </Suspense>
    ),
  },
  {
    path: "/neural-synapse",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <NeuralSynapse />
      </Suspense>
    ),
  },
  {
    path: "/join-network",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <JoinNetwork />
      </Suspense>
    ),
  },
  {
    path: "/enforcement-bypass",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <EnforcementBypass />
      </Suspense>
    ),
  },
  {
    path: "/system-integrity",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SystemIntegrity />
      </Suspense>
    ),
  },
  {
    path: "/diagnostics",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Diagnostics />
      </Suspense>
    ),
  },
  {
    path: "/admin/uplink",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <AdminBurst />
      </Suspense>
    ),
  },
  {
    path: "/welcome",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Welcome />
      </Suspense>
    ),
  },
]);

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BlogProvider>
      <ErrorBoundary>
        <div className="interactive-grid"></div>
        <RouterProvider router={router} />
        <SpeedInsights />
      </ErrorBoundary>
    </BlogProvider>
  );
}

export default App;
