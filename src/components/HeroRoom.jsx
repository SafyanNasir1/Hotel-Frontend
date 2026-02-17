import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

import room1 from "../assets/room1.jpg";
import room3 from "../assets/room2.jpg";
import room2 from "../assets/room3.jpg";
import room4 from "../assets/room4.jpg";

const fallbackImages = { room1, room2, room3, room4 };

const HeroRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms");
        const data = await res.json();

        const mapped = data.map((room, index) => ({
          ...room,
          imageKey: room.imageKey || `room${(index % 4) + 1}`,
          bestSeller: room.bestSeller ?? false,
          rating: room.rating ?? 4.5,
          HomePrice: room.HomePrice || room.price || "$0/Night",
          location: room.location || "Unknown Location",
        }));

        setRooms(mapped);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p className="py-20 text-center">Loading rooms...</p>;

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <h1 className="text-4xl md:text-[40px] font-playfair text-center">
        Featured Destination
      </h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174 text-center">
        Discover our handpicked selection of exceptional properties around the
        Pakistan.
      </p>

      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {rooms.map((room) => {
          const isBackendImage = room.imageUrl?.startsWith("/assets/rooms/");
          const backendImg = `http://localhost:5000${room.imageUrl}`;
          const localImg = fallbackImages[room.imageKey] || room1;

          return (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="w-72 md:w-80 lg:w-72"
            >
              <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                <div className="relative w-full">
                  <img
                    src={isBackendImage ? backendImg : localImg}
                    alt={room.name}
                    className="w-full h-48 object-cover transition-all duration-500 hover:scale-110"
                  />

                  {room.bestSeller && (
                    <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white text-gray-800 rounded-full">
                      Best Seller
                    </p>
                  )}
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
                      <span>{room.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm mt-2">
                    <img
                      src={assets.locationIcon}
                      alt="location"
                      className="w-4 h-4"
                    />
                    <span>{room.location}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl text-gray-800">{room.HomePrice}</p>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link to="/rooms">
        <button className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
          View All Rooms
        </button>
      </Link>
    </div>
  );
};

export default HeroRoom;
