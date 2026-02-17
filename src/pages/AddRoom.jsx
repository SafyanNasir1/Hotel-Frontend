import React, { useState } from "react";
import { assets } from "../assets/assets";
import icon from "../assets/dashboardIcon.svg";
import icon1 from "../assets/addIcon.svg";
import icon2 from "../assets/listIcon.svg";
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [images, setImages] = useState([null, null, null, null]); 
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...images];
    updated[index] = URL.createObjectURL(file); 
    setImages(updated);
  };

  const toggleAmenity = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const addRoom = async (e) => {
    e.preventDefault();

    if (!roomType || !price || !images[0]) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", roomName);
    formData.append("type", roomType);
    formData.append("price", price);
    formData.append("amenities", JSON.stringify(amenities));

    const imgInput = document.querySelector("#img0");
    formData.append("image", imgInput.files[0]);

    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(`"Room added successfully!`);
        setTimeout(() => setSuccessMsg(""), 3000);

      } else {
        alert(data.message || "Failed to add room");
      }
    } catch (error) {
      console.error("Add room error:", error);
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
            className="flex items-center py-3 px-4 md:px-8 gap-3 bg-blue-600/10 border-r-4 border-blue-600 text-blue-600"
          >
            <img className="min-h-6 min-w-6" src={icon1} alt="Add Room" />
            <p className="md:block hidden">Add Room</p>
          </Link>

          <Link
            to="/owner-list-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100 text-gray-700"
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

          <form onSubmit={addRoom}>
            <h1 className="text-4xl md:text-[40px]">Add Room</h1>
            <p className="text-gray-500 mt-2">
              Fill in the details to add a new room.
            </p>

            {/* Images */}
            <p className="text-gray-800 mt-10">Images</p>
            <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
              {[0, 1, 2, 3].map((i) => (
                <label key={i} htmlFor={`img${i}`} className="cursor-pointer">
                  {images[i] ? (
                    <img
                      src={images[i]}
                      className="h-28 w-32 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="h-28 w-32 border rounded-md flex items-center justify-center">
                      Upload
                    </div>
                  )}
                  <input
                    id={`img${i}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, i)}
                  />
                </label>
              ))}
            </div>

            {/* Room Info */}
            <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
              <div className="flex-1 max-w-48">
                <p className="text-gray-800 mt-4">Room Name</p>
                <input
                  type="text"
                  placeholder="Enter Room Name"
                  className="border border-gray-300 mt-1 rounded p-2 w-full max-w-64"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />

                <p className="text-gray-800 mt-4">Room Type</p>
                <select
                  className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="">Select Room Type</option>
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="King Bed">King Bed</option>
                  <option value="Luxury Room">Luxury Room</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
              </div>

              <div>
                <p className="mt-4 text-gray-800">
                  Price <span className="text-xs">/night</span>
                </p>
                <input
                  placeholder="0"
                  className="border border-gray-300 mt-1 rounded p-2 w-24"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Amenities */}
            <p className="text-gray-800 mt-4">Amenities</p>
            <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
              {["Free Wifi", "Free Breakfast", "Room Service"].map(
                (item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      id={`am${index}`}
                      type="checkbox"
                      checked={amenities.includes(item)}
                      onChange={() => toggleAmenity(item)}
                    />
                    <label htmlFor={`am${index}`}>{item}</label>
                  </div>
                )
              )}
            </div>

            <button
              className="bg-blue-600 text-white px-8 py-2 rounded mt-8 cursor-pointer"
              type="submit"
            >
              Add Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
