import React from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Fotter from "./components/Fotter";

import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import Review from "./components/review";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import AddRoom from "./pages/AddRoom";
import ListRoom from "./pages/ListRoom";
import Boos from "./components/Boos";
import AuthForm from "./pages/Auth/Auth";
import Home from "./components/Home";
import HeroRoom from "./components/HeroRoom";
import Exclusive from "./components/Exclusive";
import News from "./components/News";

// 🔐 Login Required
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

// 🔥 Admin Route
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin" ? children : <Navigate to="/home" />;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
};

function App() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const isOwnerPath = location.pathname.includes("owner");

  return (
    <>
      <ScrollToTop />

      {isLoggedIn && !isOwnerPath && <Navbar />}

      <Routes>
        {/* Auth */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <AuthForm />}
        />

        {/* 🏠 HOME (Landing Page) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
              <HeroRoom />
              <Exclusive/>
              <Review />
              <News />
            </PrivateRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <AllRooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <PrivateRoute>
              <RoomDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/boos"
          element={
            <PrivateRoute>
              <Boos />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/owner"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/owner-add-page"
          element={
            <AdminRoute>
              <AddRoom />
            </AdminRoute>
          }
        />
        <Route
          path="/owner-list-page"
          element={
            <AdminRoute>
              <ListRoom />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {isLoggedIn && !isOwnerPath && <Fotter />}
    </>
  );
}

export default App;
