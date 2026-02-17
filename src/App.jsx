import React from "react";
import "./App.css";
import { useLocation, Routes, Route, Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
// import Boos from "./pages/Boos";
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
function App() {
  const isOwnerpath = useLocation().pathname.includes("owner");

  return (
    <>
      <ScrollToTop />
      {!isOwnerpath && <Navbar />}
      <div>
        <div className="min-h-[70vh]">
          <Routes>
            <Route path="/review" element={<Review />} />
            <Route path="/" element={<Boos />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/owner" element={<Dashboard />} />
            <Route path="/owner-add-page" element={<AddRoom />} />
            <Route path="/owner-list-page" element={<ListRoom />} />
          </Routes>
        </div>
        {!isOwnerpath && <Fotter />}
      </div>
    </>
  );
}

export default App;
