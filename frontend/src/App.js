import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { UpdateKYC } from "./pages/UpdateKYC/UpdateKYC";

import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <div>Dashboard</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-KYC",
    element: (
      <ProtectedRoute>
        <UpdateKYC />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
