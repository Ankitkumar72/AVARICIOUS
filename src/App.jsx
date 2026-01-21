import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Lazy load components
const Home = lazy(() => import('./Home'));
const BlogPost = lazy(() => import('./BlogPost'));

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
    path: "/blog/synthetic-horizon",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <BlogPost />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
