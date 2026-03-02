import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HeroRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rooms");
        const data = await res.json();
        setRooms(data || []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setRooms([]); 
      }
    };

    fetchRooms();
  }, []); 

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <h1 className="text-4xl md:text-[40px] font-playfair text-center">
        Featured Destination
      </h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174 text-center">
        Discover our handpicked selection of exceptional properties.
      </p>

      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {rooms.length > 0 ? (
          rooms.map((room) => {
            const image =
              room.images && room.images.length > 0
                ? `http://localhost:3000/Uploads/${room.images[0]}`
                : assets.placeholderImage;

            return (
              <Link key={room._id} to={`/room/${room._id}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={image}
                      alt={room.name}
                      className="w-full h-48 object-cover transition-all duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-4 pt-5">
                    <div className="flex items-center justify-between">
                      <p className="font-playfair text-xl font-medium text-gray-800">
                        {room.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <img
                          src={assets.starIconFilled}
                          alt="star"
                          className="w-4 h-4"
                        />
                        <span>{room.rating || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm mt-2 text-gray-500">
                      <img
                        src={assets.locationIcon}
                        alt="location"
                        className="w-4 h-4"
                      />
                      <span>{room.location || "Unknown"}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xl text-gray-800">
                        ${room.price || "N/A"}{" "}
                        <span className="text-gray-500">/night</span>
                      </p>

                      <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No rooms available.</p>
        )}
      </div>

      <Link to="/rooms">
        <button className="my-16 px-6 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
          View All Rooms
        </button>
      </Link>
    </div>
  );
};

export default HeroRoom;
