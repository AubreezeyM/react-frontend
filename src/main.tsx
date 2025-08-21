import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.js'
import LoginPage from './pages/LoginPage.js';
import HomePage from './pages/HomePage.js';
import AuthRoute from './components/AuthRoute.js';
import UserCard from './pages/UserPage.js';
import UserPage from './pages/UserPage.js';
import { AuthProvider } from './components/AuthProvider.js';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "user",
        element: <UserPage />
      }
    ],
  },
])

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
