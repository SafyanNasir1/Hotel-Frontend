import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [selectedRoomSub, setSelectedRoomSub] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error loading bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const openDeleteModal = (bookingId, roomName, sub) => {
    setSelectedBookingId(bookingId);
    setSelectedRoomName(roomName);
    setSelectedRoomSub(sub);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/bookings/${selectedBookingId}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      console.log(data.message);

      // MongoDB _id fix
      setBookings((prev) => prev.filter((b) => b._id !== selectedBookingId));

      setShowDeleteModal(false);
      setSelectedBookingId(null);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setSelectedRoomName("");
        setSelectedRoomSub("");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  if (bookings.length === 0)
    return <p className="p-6 text-center">No booking info available.</p>;

  return (
    <div className="min-h-[70vh] py-28 px-4 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-4xl font-playfair mb-8">My Bookings</h1>

      <div className="max-w-6xl flex flex-col gap-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 grid md:grid-cols-[3fr_2fr_1fr_0.5fr] gap-4 items-center"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-xl object-cover"
                src={`http://localhost:3000/Uploads/${booking.roomImage}`}
                alt={booking.roomName}
              />
              <div>
                <h2 className="font-semibold">{booking.roomName}</h2>
                <p className="text-gray-500 text-sm">{booking.roomType}</p>
                <p className="text-gray-500 text-sm">{booking.guests} Guests</p>
              </div>
            </div>

            <div className="text-gray-500 text-sm">
              <p>Check-In: {booking.checkIn}</p>
              <p>Check-Out: {booking.checkOut}</p>
            </div>

            <div className="font-medium">${booking.price}</div>

            <button
              onClick={() =>
                openDeleteModal(booking._id, booking.roomName, booking.roomType)
              }
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowDeleteModal(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-md transform transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800">
              Delete Booking
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {selectedRoomName} ({selectedRoomSub})
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-sm text-center transform transition-all duration-300">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Booking Deleted
            </h2>
            <p className="text-gray-600 mt-2">
              Your booking for{" "}
              <span className="font-semibold text-gray-800">
                {selectedRoomName} ({selectedRoomSub})
              </span>{" "}
              has been successfully deleted.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
