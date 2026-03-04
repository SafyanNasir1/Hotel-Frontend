import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/dashboardIcon.svg";
import icon1 from "../assets/addIcon.svg";
import icon2 from "../assets/listIcon.svg";
import { assets } from "../assets/assets";

const AddRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomName || !roomType || !price) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", roomName);
      formData.append("roomType", roomType);
      formData.append("price", price);
      formData.append("amenities", JSON.stringify(amenities));
      images.forEach((img) => formData.append("images", img));

      const res = await axios.post(
        "http://hotel-server-six.vercel.app/api/rooms",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      console.log("Room added:", res.data);
      setSuccessMsg("Room added successfully!");

      setTimeout(() => {
        setSuccessMsg("");
        navigate("/rooms");
      }, 1500);

      setRoomName("");
      setRoomType("");
      setPrice("");
      setAmenities([]);
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Error adding room");
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
        <div className="md:w-64 w-16 border-r h-full border-gray-300 pt-4 flex flex-col">
          <Link
            to="/owner"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100"
          >
            <img src={icon} className="min-w-6" />
            <p className="hidden md:block">Dashboard</p>
          </Link>

          <Link
            to="/owner-add-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 bg-blue-600/10 border-r-4 border-blue-600 text-blue-600"
          >
            <img src={icon1} className="min-w-6" />
            <p className="hidden md:block">Add Room</p>
          </Link>

          <Link
            to="/owner-list-page"
            className="flex items-center py-3 px-4 md:px-8 gap-3 hover:bg-gray-100"
          >
            <img src={icon2} className="min-w-6" />
            <p className="hidden md:block">List Room</p>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 md:px-10">
          {successMsg && (
            <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl">Add Room</h1>
            <p className="text-gray-500 mt-2">
              Fill the details to add a new room
            </p>

            {/* ROOM NAME */}
            <p className="mt-6">Room Name</p>
            <input
              className="border p-2 rounded w-full max-w-sm"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />

            {/* ROOM TYPE */}
            <p className="mt-4">Room Type</p>
            <select
              className="border p-2 rounded w-full max-w-sm"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option>Single Bed</option>
              <option>Double Bed</option>
              <option>Luxury Room</option>
              <option>Family Suite</option>
            </select>

            {/* PRICE */}
            <p className="mt-4">Price / night</p>
            <input
              type="number"
              className="border p-2 rounded w-40"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* IMAGES */}
            {/* <p className="mt-4">Room Images (up to 4)</p> */}
            {/* <input type="file" multiple onChange={handleFileChange} /> */}
            {/* IMAGES */}
            <p className="mt-4">Room Images (up to 4)</p>
            <div className="flex gap-4 mt-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-24 h-24 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer relative"
                  onClick={() =>
                    document.getElementById(`imageInput${index}`).click()
                  }
                >
                  {images[index] ? (
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt={`room ${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-3xl text-gray-400">+</span>
                  )}
                  <input
                    id={`imageInput${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImages = [...images];
                        newImages[index] = file;
                        setImages(newImages);
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* AMENITIES */}
            <p className="mt-4">Amenities</p>
            <div className="flex flex-col gap-2 text-gray-600">
              {["Free Wifi", "Free Breakfast", "Room Service"].map((item) => (
                <label key={item} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded mt-8"
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
