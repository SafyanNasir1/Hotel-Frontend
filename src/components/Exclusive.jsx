import React from "react";
import { assets } from "../assets/assets";
import Img1 from "../assets/exclusiveOfferCardImg1.png";
import Img2 from "../assets/exclusiveOfferCardImg2.png";
import Img3 from "../assets/exclusiveOfferCardImg3.png";



const Exclusive = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
        <div className=" flex flex-col md:flex-row items-center justify-between w-full  ">
          <div className=" flex flex-col justify-center items-center text-center  md:items-start md:text-left">
            <h1 className=" text-4xl md:text-[40px] font-playfair">
              Exclusive Offers
            </h1>
            <p className=" text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
              Take advantage of our limited-time offers and special packages to
              enhance your stay and create unforgettable memories.
            </p>
          </div>
          <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
            View All Offers
            <img
              src={assets.arrowIcon}
              alt="arrow-icon"
              className="group-hover:translate-x-3 transition-all"
            />
          </button>
        </div>

        {/* 1 vip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full ">
          <div
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            style={{ backgroundImage: `url(${Img1})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              25 % OFF
            </p>
            <div>
              <p className="text-2xl font-medium font-playfair">
                Summer Escape Package
              </p>
              <p>Enjoy a complimentary night and daily breakfast</p>
              <p className="text-xs text-white/70 mt-3">Expires Aug 31</p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>

          {/* 2 Vip */}

          <div
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            style={{ backgroundImage: `url(${Img2})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              25 % OFF
            </p>
            <div>
              <p className="text-2xl font-medium font-playfair">
                Romantic Getaway
              </p>
              <p>Special couples package including spa treatment</p>
              <p className="text-xs text-white/70 mt-3">Expires Sep 20</p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>

          {/* Third Vip */}

          <div
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            style={{ backgroundImage: `url(${Img3})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              25 % OFF
            </p>
            <div>
              <p className="text-2xl font-medium font-playfair">
                Luxury Retreat
              </p>
              <p>
                Book 60 days in advance and save on your stay at any of our
                luxury properties worldwide.
              </p>
              <p className="text-xs text-white/70 mt-3">Expires Sep 25</p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exclusive;
