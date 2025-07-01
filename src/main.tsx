import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm.tsx";
import HomePage from "./components/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { ThemeProvider } from "./components/UI/ThemeProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "auth", element: <AuthForm /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="theme" defaultTheme="system">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
