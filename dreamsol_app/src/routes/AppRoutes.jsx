import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../components/Register";
import InvoiceForm from "../components/InvoiceForm";

// Mock function to check if the user is logged in
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  // ;return !!localStorage.getItem("authToken")
  return true;
};

// PrivateRoute component
const PrivateRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/signin" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Register />} />
      <Route
        path="/invoice"
        element={<PrivateRoute element={InvoiceForm} />}
      />
    </Routes>
  );
};

export default AppRoutes;
