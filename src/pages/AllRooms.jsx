import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

import room1 from "../assets/room1.jpg";
import room2 from "../assets/room3.jpg";
import room3 from "../assets/room2.jpg";
import room4 from "../assets/room4.jpg";

const imagesMap = { room1, room2, room3, room4 };

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "$ 0 to 400",
    "$ 400 to 800",
    "$ 800 to 1200",
    "$ 1200 to 1600",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");


  useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms");
      const data = await res.json();

      const mappedData = data.map((room, i) => ({
        ...room,
        imageKey: room.imageKey || `room${(i % 4) + 1}`,
        bestSeller: room.bestSeller ?? false,
        rating: room.rating ?? 4.5,
        HomePrice: room.HomePrice || room.price || "$0/Night",
        location: room.location || "Unknown Location",
      }));

      setRooms(mappedData);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  fetchRooms();
}, []);

  

  const CheckBox = ({ label, selected = false, onchange = () => {} }) => (
    <label className="flex gap-2 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
        className="w-4 h-4"
      />
      <span className="select-none">{label}</span>
    </label>
  );

  const RadioButton = ({ label, selected = false, onchange = () => {} }) => (
    <label className="flex gap-2 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onchange(label)}
        className="w-4 h-4"
      />
      <span className="select-none">{label}</span>
    </label>
  );

  const renderImage = (key) => imagesMap[key] || room1;

  // --- Filter + Sort Logic ---
  const filteredRooms = rooms
    .filter((room) => {
      // Room Type Filter
      if (
        selectedRoomTypes.length > 0 &&
        !selectedRoomTypes.includes(room.sub.replace(/[()]/g, "").trim())
      )
        return false;

      // Price Filter
      if (selectedPriceRanges.length > 0) {
        const price = Number(room.price.replace(/[^0-9]/g, ""));
        const priceMatch = selectedPriceRanges.some((range) => {
          const [min, max] = range.replace(/\$/g, "").split(" to ").map(Number);
          return price >= min && price <= max;
        });
        if (!priceMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const priceA = Number(a.price.replace(/[^0-9]/g, ""));
      const priceB = Number(b.price.replace(/[^0-9]/g, ""));
      if (selectedSort === "Price Low to High") return priceA - priceB;
      if (selectedSort === "Price High to Low") return priceB - priceA;
      if (selectedSort === "Newest First") return b.id.localeCompare(a.id);
      return 0;
    });

  // --- Star Renderer ---
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <img key={"f" + i} src={assets.starIconFilled} alt="star" />
          ))}
        {halfStar ? (
          <img key="half" src={assets.starIconOutlined} alt="star" />
        ) : null}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <img key={"e" + i} src={assets.starIconOutlined} alt="star" />
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Rooms List */}
      <div className="flex-1">
        <div className="flex flex-col items-start text-left mb-5">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`}>
            <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
              <img
                src={renderImage(room.imageKey)}
                alt={room.name}
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">New York</p>
                <p className="text-gray-800 text-3xl font-playfair cursor-pointer">
                  {room.name} {room.sub}
                </p>
                <div className="flex items-center">
                  {renderStars(room.rating)}
                  <p className="ml-2">{room.review}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location" />
                  <span>{room.location}</span>
                </div>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.wifi && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                      <img src={assets.freeWifiIcon} alt="wifi" />
                      <p className="text-xs">{room.wifi}</p>
                    </div>
                  )}
                  {room.breakFAst && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                      <img src={assets.freeBreakfastIcon} alt="" />
                      <p className="text-xs">{room.breakFAst}</p>
                    </div>
                  )}
                  {room.RoomService && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                      <img src={assets.roomServiceIcon} alt="room-service" />
                      <p className="text-xs">{room.RoomService}</p>
                    </div>
                  )}
                  <p className="text-xl font-medium text-gray-700">
                    {room.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredRooms.length === 0 && (
          <p>No rooms match the selected filters.</p>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16 ml-10 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span
              className="hidden lg:block"
              onClick={() => {
                setSelectedRoomTypes([]);
                setSelectedPriceRanges([]);
                setSelectedSort("");
              }}
            >
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          }`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Room Type</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onchange={(checked, label) => {
                  if (checked)
                    setSelectedRoomTypes([...selectedRoomTypes, label]);
                  else
                    setSelectedRoomTypes(
                      selectedRoomTypes.filter((r) => r !== label)
                    );
                }}
              />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={range}
                selected={selectedPriceRanges.includes(range)}
                onchange={(checked, label) => {
                  if (checked)
                    setSelectedPriceRanges([...selectedPriceRanges, label]);
                  else
                    setSelectedPriceRanges(
                      selectedPriceRanges.filter((r) => r !== label)
                    );
                }}
              />
            ))}
          </div>

          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onchange={(label) => setSelectedSort(label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;

