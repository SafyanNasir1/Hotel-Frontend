import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

import room1 from "../assets/room1.jpg";
import room3 from "../assets/room3.jpg";
import room2 from "../assets/room2.jpg";
import room4 from "../assets/room4.jpg";
import roomPart1 from "../assets/roomPart1.jpg";
import roomPart2 from "../assets/roomPart2.jpg";
import roomPart3 from "../assets/roomPart3.jpg";
import RoomAssetsAgain1 from "../assets/room-assets-again1.jpg";
import RoomAssetsAgain2 from "../assets/room-assets-again2.jpg";
import RoomAssetsAgain3 from "../assets/room-assets-again3.jpg";
import RoomAssets1 from "../assets/room-assets-1.jpg";
import RoomAssets3 from "../assets/room-assets-3.jpg";
import Last1 from "../assets/last-room1.jpg";
import Last2 from "../assets/last-room2.jpg";
import Last3 from "../assets/room-assets-3.jpg";
import host from "../assets/host.jpg";
// import { useNavigate } from "react-router-dom";
const imagesMap = {
  room1: [room1, roomPart1, roomPart2, roomPart3],
  room2: [room3, RoomAssetsAgain1, RoomAssetsAgain2, RoomAssetsAgain3],
  room3: [room2, RoomAssets1, RoomAssets3],
  room4: [room4, Last1, Last2, Last3],
};

const RoomDetails = () => {

  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [fade, setFade] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rooms/" + id);
        const selectedRoom = await res.json();
        if (!selectedRoom) return;
        console.log(selectedRoom);
        setRoom(selectedRoom);
        setMainImage(imagesMap[selectedRoom.imageKey][0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, [id]);

  if (!room) return <p className="p-6 text-center">Room not found</p>;

  const handleImageClick = (img) => {
    setFade(true);
    setTimeout(() => {
      setMainImage(img);
      setFade(false);
    }, 200);
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkIn = e.target[0].value;
    const checkOut = e.target[1].value;
    const guests = e.target[2].value;

    if (!checkIn || !checkOut || !guests) {
      showPopup("Please fill all fields!", "error");
      return;
    }

    const bookingDetails = {
      roomId: room.id, 
      checkIn,
      checkOut,
      guests,
      paymentAmount: room.price, 
      paymentStatus: "paid", 
    };
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      showPopup("Room booked successfully!", "success");
      // setTimeout(() => {
      //   navigate("/my-bookings");
      // }, 100);

      // Optional: form clear kar do
      e.target.reset();
    } catch (error) {
      console.error(error);
      showPopup("Booking failed!", "error");
    }
  };

  const images = imagesMap[room.imageKey];

  return (
    <>
      {popup && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 text-white rounded-md z-50 shadow-lg ${
            popup.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popup.message}
        </div>
      )}

      <div className="min-h-[70vh]">
        <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-playfair">
              {room.name}
              <span className="font-inter text-sm ml-2">{room.sub}</span>
            </h1>
            <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full mt-3">
              {room.percent}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                className="w-4.5 h-4.5"
                src={
                  index < Math.floor(room.rating)
                    ? assets.starIconFilled
                    : assets.starIconOutlined
                }
                alt="star"
              />
            ))}

            <p className="ml-2">{room.review}</p>
          </div>
          <div className="flex items-center gap-1 text-gray-500 mt-2">
            <img src={assets.locationIcon} alt="location" />
            <span>{room.location}</span>
          </div>

          {/* .//////////////////////// */}

          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <div className="lg:w-1/2 w-full">
              <img
                src={mainImage}
                className={`w-full rounded-xl shadow-lg object-cover transition-opacity duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                alt="selected"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
              {images.map((img, index) => (
                <img
                  key={index}
                  onClick={() => handleImageClick(img)}
                  src={img}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer border-2 transition ${
                    mainImage === img
                      ? "border-orange-500 scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                  alt="thumbnail"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mt-10">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-playfair">
                {room.experince}
              </h1>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <img
                    src={assets.freeWifiIcon}
                    alt="wifi"
                    className="w-5 h-5"
                  />
                  <p>{room.wifi}</p>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <img
                    src={assets.freeBreakfastIcon}
                    alt="Breakfast"
                    className="w-5 h-5"
                  />
                  <p>{room.breakFAst}</p>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                  <img
                    src={assets.roomServiceIcon}
                    alt="Room Service"
                    className="w-5 h-5"
                  />
                  <p>{room.RoomService}</p>
                </div>
              </div>
            </div>

            <p className="text-2xl font-medium">{room.price}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
          >
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
              <div className="flex flex-col">
                <label htmlFor="CheckInDate" className="font-medium">
                  Check-In
                </label>
                <input
                  id="CheckInDate"
                  min={"2025-12-01"}
                  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  placeholder="Check-In"
                  required
                  type="date"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="CheckOutDate" className="font-medium">
                  Check-Out
                </label>
                <input
                  id="CheckOutDate"
                  min={"2025-12-01"}
                  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  placeholder="Check-Out"
                  required
                  type="date"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="guests" className="font-medium">
                  Guests
                </label>
                <input
                  id="guests"
                  className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  placeholder="0"
                  required
                  type="number"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
            >
              Check Availability
            </button>
          </form>

          <div className="mt-25 space-y-4">
            <div className="flex items-start gap-2">
              <img src={assets.homeIcon} alt="home" className="w-6.5" />
              <div>
                <p className="text-base">Clean & Safe Stay</p>
                <p className="text-gray-500">
                  {" "}
                  A well-maintained and hygienic space just for you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img src={assets.badgeIcon} alt="badgeIcon" className="w-6.5" />
              <div>
                <p className="text-base">Enhanced Cleaning</p>
                <p className="text-gray-500">
                  {" "}
                  This host follows Staybnb's strict cleaning standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img
                src={assets.locationFilledIcon}
                alt="location-filled"
                className="w-6.5"
              />
              <div>
                <p className="text-base">Excellent Location</p>
                <p className="text-gray-500">
                  {" "}
                  90% of guests rated the location 5 stars.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img src={assets.heartIcon} alt="heart" className="w-6.5" />
              <div>
                <p className="text-base">Smooth Check-In</p>
                <p className="text-gray-500">
                  {" "}
                  100% of guests gave check-in a 5-star rating
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
            <p>
              Guests will be allocated on the ground floor according to
              availability. You get a comfortable Two bedroom apartment has a
              true city feeling. The price quoted is for two guest, at the guest
              slot please mark the number of guests to get the exact price for
              groups. The Guests will be allocated ground floor according to
              availability. You get the comfortable two bedroom apartment that
              has a true city feeling.
            </p>
          </div>
          <div className="w-full h-[60vh] md:h-[639px]">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Location On Map
            </h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13605.202222874279!2d74.26875308715819!3d31.51590410000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903a24f371795%3A0x74beee8aa43e49d5!2sPNY%20Trainings%20-%20Iqbal%20Town%20Branch!5e0!3m2!1sen!2s!4v1758825472346!5m2!1sen!2s"
              className="w-full h-full border-0 rounded-xl pt-5"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>

          <div className=" border border-gray-300  text-gray-500 mt-30"></div>

          <div className="flex flex-col items-start gap-4 mt-10">
            <div className="flex gap-4">
              <img
                className="h-14 w-14 md:h-18 md:w-18 rounded-full"
                src={host}
                alt="Host"
              />
              <div>
                <p className="text-lg md:text-xl">Hosted by Safyan Suites</p>
                <div className="flex items-center gap-1">
                  <img
                    className='class="w-4.5 h-4.5'
                    src={assets.starIconFilled}
                    alt="filled-star"
                  />
                  <img
                    className='class="w-4.5 h-4.5'
                    src={assets.starIconFilled}
                    alt="filled-star"
                  />
                  <img
                    className='class="w-4.5 h-4.5'
                    src={assets.starIconFilled}
                    alt="filled-star"
                  />
                  <img
                    className='class="w-4.5 h-4.5'
                    src={assets.starIconFilled}
                    alt="filled-star"
                  />
                  <img
                    className='class="w-4.5 h-4.5'
                    src={assets.starIconOutlined}
                    alt="not-filled-star"
                  />
                  <p className="ml-2">200+ reviews</p>
                </div>
              </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
