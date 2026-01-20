import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import BlogPost from './BlogPost';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog/synthetic-horizon",
    element: <BlogPost />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
