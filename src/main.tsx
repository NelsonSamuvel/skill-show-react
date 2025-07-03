import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm.tsx";
import HomePage from "./components/HomePage.tsx";
import ProfileBasicFormPage from "./pages/ProfileBasicFormPage.tsx";
import { ThemeProvider } from "./components/ui/ThemeProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Toaster } from "react-hot-toast";
import ProfileFormPage from "./pages/ProfileBasicFormPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "auth", element: <AuthForm /> },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <ProfileBasicFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/basic/update",
        element: (
          <ProtectedRoute>
            <ProfileFormPage />
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
