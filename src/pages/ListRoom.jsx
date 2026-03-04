import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import icon from "../assets/dashboardIcon.svg";
import icon1 from "../assets/addIcon.svg";
import icon2 from "../assets/listIcon.svg";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://hotel-server-six.vercel.app/api/rooms");
        const data = await res.json();
        setRooms(data || []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();

    // Socket.io for real-time updates (if new room added from AddRoom page)
    const socket = io("https://hotel-server-six.vercel.app");
    socket.on("newRoom", (room) => {
      setRooms((prev) => [room, ...prev]);
      setSuccessMsg(`New room "${room.name}" added!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    });

    return () => socket.disconnect();
  }, []);

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await fetch(`http://hotel-server-six.vercel.app/api/rooms/${id}`, {
        method: "DELETE",
      });
      setRooms((prev) => prev.filter((room) => room._id !== id));
      setSuccessMsg("Room deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Save edited room
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://hotel-server-six.vercel.app/api/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, price: editPrice }),
      });

      if (!res.ok) throw new Error("Update failed");

      // Update frontend state
      setRooms((prev) =>
        prev.map((room) =>
          room._id === id
            ? { ...room, name: editName, price: editPrice }
            : room,
        ),
      );

      setEditingRoom(null);
      setSuccessMsg("Room updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-9 invert opacity-80" />
        </Link>
      </div>

      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col">
          <Link
            to="/owner"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100 text-gray-700"
          >
            <img className="min-h-6 min-w-6" src={icon} alt="Dashboard" />
            <p className="md:block hidden">Dashboard</p>
          </Link>
          <Link
            to="/owner-add-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100 text-gray-700"
          >
            <img className="min-h-6 min-w-6" src={icon1} alt="Add Room" />
            <p className="md:block hidden">Add Room</p>
          </Link>
          <Link
            to="/owner-list-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 bg-blue-600/10 border-r-4 border-blue-600 text-blue-600"
          >
            <img className="min-h-6 min-w-6" src={icon2} alt="List Room" />
            <p className="md:block hidden">List Room</p>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          {successMsg && (
            <div className="bg-green-500 text-white p-2 rounded-md mb-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              {successMsg}
            </div>
          )}

          <h1 className="text-4xl md:text-[40px]">Room Listings</h1>
          <p className="text-gray-500 mt-2 max-w-174">
            Manage and edit all hotel rooms from one place.
          </p>
          <p className="text-gray-500 mt-4">Total Rooms: {rooms.length}</p>

          <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-96 overflow-y-scroll mt-4">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-medium">Image</th>
                  <th className="py-3 px-4 text-gray-800 font-medium">Type</th>
                  <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Price
                  </th>
                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="border-b hover:bg-gray-50">
                    {/* Image */}
                    <td className="py-3 px-4">
                      {room.images && room.images.length > 0 ? (
                        <img
                          src={`http://hotel-server-six.vercel.app/Uploads/${room.images[0]}`}
                          alt={room.name}
                          className="h-16 w-24 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4">{room.type || "N/A"}</td>
                    <td className="py-3 px-4">
                      {editingRoom === room._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        room.name
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editingRoom === room._id ? (
                        <input
                          type="text"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="border px-2 py-1 rounded-md w-full text-center"
                        />
                      ) : (
                        room.price
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editingRoom === room._id ? (
                        <button
                          onClick={() => handleSave(room._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md mx-1 text-sm"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingRoom(room._id);
                            setEditName(room.name);
                            setEditPrice(room.price);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md mx-1 text-sm"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md mx-1 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No rooms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
