import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [fade, setFade] = useState(false);
  const [popup, setPopup] = useState(null);

  /* ================= FETCH ROOM ================= */
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rooms/${id}`);
        const data = await res.json();

        if (!data || data.message) return;

        setRoom(data);

        if (data.images?.length > 0) {
          setMainImage(`http://localhost:3000/Uploads/${data.images[0]}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) return <p className="p-10 text-center">Room not found</p>;

  const images =
    room.images?.map((img) => `http://localhost:3000/Uploads/${img}`) || [];

  /* ================= IMAGE SWITCH ================= */
  const handleImageClick = (img) => {
    setFade(true);
    setTimeout(() => {
      setMainImage(img);
      setFade(false);
    }, 200);
  };

  /* ================= POPUP ================= */
  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 2500);
  };

  /* ================= BOOKING ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    const checkIn = e.target[0].value;
    const checkOut = e.target[1].value;
    // const guests = e.target[2].value;
    const guests = Number(e.target[2].value);

    if (!checkIn || !checkOut || !guests) {
      showPopup("Please fill all fields!", "error");
      return;
    }

    const nights =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      showPopup("Check-out must be after check-in", "error");
      return;
    }

    const totalPrice = nights * room.price;

    try {
      const res = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room._id,
          roomName: room.name,
          roomType: room.roomType,

          roomImage: room.images?.[0],

          price: totalPrice,
          nights,
          checkIn,
          checkOut,
          guests,

          paymentAmount: totalPrice,
          paymentStatus: "paid",
        }),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (!res.ok) throw new Error(data.message || "Booking failed");

      showPopup("Room booked successfully!", "success");

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    } catch (err) {
      console.error("Booking error:", err);
      showPopup("Booking failed!", "error");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      {popup && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 text-white rounded-md z-50 ${
            popup.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popup.message}
        </div>
      )}

      <div className="min-h-[70vh] py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-playfair">{room.name}</h1>

        {/* IMAGES */}
        {mainImage && (
          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <div className="lg:w-1/2 w-full">
              <img
                src={mainImage}
                className={`w-full rounded-xl shadow-lg object-cover transition-opacity duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                alt="main"
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
                  alt="thumb"
                />
              ))}
            </div>
          </div>
        )}

        {/* PRICE */}
        <div className="flex justify-between mt-10">
          <h2 className="text-3xl font-playfair">Room Details</h2>
          <p className="text-2xl font-medium">${room.price}</p>
        </div>

        {/* AMENITIES */}
        {room.amenities?.length > 0 && (
          <div className="flex flex-wrap items-center mt-6 gap-4">
            {room.amenities.includes("Free Wifi") && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <img src={assets.freeWifiIcon} className="w-5 h-5" />
                <p>Free Wifi</p>
              </div>
            )}
            {room.amenities.includes("Free Breakfast") && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <img src={assets.freeBreakfastIcon} className="w-5 h-5" />
                <p>Free Breakfast</p>
              </div>
            )}
            {room.amenities.includes("Room Service") && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <img src={assets.roomServiceIcon} className="w-5 h-5" />
                <p>Room Service</p>
              </div>
            )}
          </div>
        )}

        {/* BOOKING FORM */}
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
              100% of guests gave check-in a 5-star rating.
            </p>
          </div>
        </div>
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
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
              src={assets.host}
              alt="Host"
            />
          </div>
        </div>

        <p className="text-lg md:text-xl mt-5">Hosted by Safyan Suites</p>

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

        <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </div>
    </>
  );
};

export default RoomDetails;
