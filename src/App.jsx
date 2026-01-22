import { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import './index.css';

// Lazy load components
const Home = lazy(() => import('./Home'));
const BlogPost = lazy(() => import('./BlogPost'));
const Login = lazy(() => import('./pages/Login'));
const EditPost = lazy(() => import('./pages/EditPost'));

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
    path: "/blog/:id",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <BlogPost />
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
      <div className="interactive-grid"></div>
      <RouterProvider router={router} />
    </BlogProvider>
  );
}

export default App;
