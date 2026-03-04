import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { assets } from "../assets/assets";
import icon from "../assets/dashboardIcon.svg";
import icon1 from "../assets/addIcon.svg";
import icon2 from "../assets/listIcon.svg";
import icon3 from "../assets/totalBookingIcon.svg";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // <-- Add this

const Dashboard = () => {
  const { user } = useUser(); // <-- Get logged-in user

  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch initial bookings and set up Socket.IO
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://hotel-server-six.vercel.app/api/bookings",
        );
        const data = await res.json();
        setBookings(data || []);

        const revenue = (data || []).reduce(
          (acc, curr) => acc + (parseFloat(curr.paymentAmount) || 0),
          0,
        );
        setTotalRevenue(revenue);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();

    // Socket.IO real-time updates
    const socket = io("https://hotel-server-six.vercel.app");
    socket.on("newBooking", ({ booking, review }) => {
      setBookings((prev) => [booking, ...prev]);
      setTotalRevenue(
        (prev) => prev + (parseFloat(booking.paymentAmount) || 0),
      );
      console.log("New review generated:", review);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-9 invert opacity-80" />
        </Link>

        <div className="flex items-center gap-3">
          <p className="text-gray-700 font-medium max-sm:hidden">
            {user?.fullName || user?.firstName || "User"}
          </p>
          <img
            src={user?.imageUrl}
            alt="profile"
            className="h-10 w-10 rounded-full border"
          />
        </div>
      </div>

      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col">
          <Link
            to="/owner"
            className="flex items-center py-3 px-4 md:px-8 gap-3 bg-blue-600/10 border-r-4 border-blue-600 text-blue-600 "
          >
            <img className="min-h-6 min-w-6" src={icon} alt="Dashboard" />
            <p className="md:block hidden">Dashboard</p>
          </Link>

          <Link
            to="/owner-add-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100 text-gray-700"
          >
            <img className="min-h-6 min-w-6" src={icon1} alt="plus-icon" />
            <p className="md:block hidden">Add Room</p>
          </Link>

          <Link
            to="/owner-list-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100 text-gray-700"
          >
            <img className="min-h-6 min-w-6" src={icon2} alt="plus-icon" />
            <p className="md:block hidden">List Room</p>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <div>
            {/* HEADING */}
            <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
              <h1 className="text-4xl md:text-[40px] outfit">Dashboard</h1>
              <p className="text-sm md:text-base text-gray-500 mt-2 max-w-174">
                Monitor your room listings, track bookings and analyze
                revenue—all in one place.
              </p>
            </div>

            {/* CARDS */}
            <div className="flex gap-4 my-8">
              <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                <img
                  className="max-sm:hidden h-10"
                  src={icon3}
                  alt="total bookings"
                />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Bookings</p>
                  <p className="text-neutral-400 text-base">
                    {bookings.length}
                  </p>
                </div>
              </div>

              <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                <img className="max-sm:hidden h-10" src={icon3} alt="revenue" />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Revenue</p>
                  <p className="text-neutral-400 text-base">${totalRevenue}</p>
                </div>
              </div>
            </div>

            {/* RECENT BOOKINGS */}
            <h2 className="text-xl text-blue-950/70 font-medium mb-5">
              Recent Bookings
            </h2>

            <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-gray-800 font-medium">
                      User Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                      Room Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Total Amount
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-3 px-4">
                        {user?.fullName || user?.firstName || "User"}
                      </td>
                      <td className="py-3 px-4 max-sm:hidden">{b.roomName}</td>
                      <td className="py-3 px-4 text-center">
                        ${b.paymentAmount}
                      </td>
                      <td
                        className={`py-3 px-4 text-center ${b.paymentStatus === "paid" ? "text-green-600" : "text-red-500"}`}
                      >
                        {b.paymentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
