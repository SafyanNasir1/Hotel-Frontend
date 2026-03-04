import React from "react";
import { assets } from "../assets/assets";
import men from "../assets/men.png";
import men2 from "../assets/men2.avif";
import mahi from "../assets/mahi.png";
const Review = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
        <div className="flex flex-col justify-center items-center text-center false">
          <h1 className=" text-4xl md:text-[40px] font-playfair">
            What Our Guests Say
          </h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Discover why discerning travelers consistently choose QuickStay for
            their exclusive and luxurious accommodations around the world.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-20">
          {/* 1 */}
          <div className="bg-white p-6 rounded-xl shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
            <div className="flex items-center gap-3 ">
              <img
                className="w-12 h-12 rounded-full"
                src={men}
                alt="men-profile"
              />
              <div>
                <p className="font-playfair text-xl">Emma Rodriguez</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconOutlined}
                alt="star-fil-without"
              />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "I've used many booking platforms before, but none compare to the
              personalized experience and attention to detail that QuickStay
              provides. Their curated selection of hotels is unmatched."
            </p>
          </div>

          {/* 2 */}
          <div className="bg-white p-6 rounded-xl shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={men2}
                alt="men-profile"
              />
              <div>
                <p className="font-playfair text-xl">Liam Johnson</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconOutlined}
                alt="star-fil-without"
              />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "I've used many booking platforms before, but none compare to the
              personalized experience and attention to detail that QuickStay
              provides. Their curated selection of hotels is unmatched."
            </p>
          </div>

          {/* 3 */}
          <div className="bg-white p-6 rounded-xl shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={mahi}
                alt="mahi-profile"
              />
              <div>
                <p className="font-playfair text-xl">Sophia Lee</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconFilled}
                alt="star-fil"
              />
              <img
                className="w-4.5 h-4.5"
                src={assets.starIconOutlined}
                alt="star-fil-without"
              />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">
              "I've used many booking platforms before, but none compare to the
              personalized experience and attention to detail that QuickStay
              provides. Their curated selection of hotels is unmatched."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
