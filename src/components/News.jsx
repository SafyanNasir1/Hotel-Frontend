import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
const News = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing: ${email}`);
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
      <h1 className=" text-4xl md:text-[40px] font-playfair">Stay Inspired</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[700px]">
        Join our newsletter and be the first to discover new destinations,
        exclusive offers, and travel
        <span className="block text-center"> inspiration.</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-3 mt-6"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 flex-1 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
        >
          Subscribe{" "}
          <img
            src={assets.arrowIcon}
            className="ml-2 invert group-hover:translate-x-1"
          />
        </button>
      </form>
      <p className="text-gray-500 text-sm mt-6">
        By subscribing, you agree to our{" "}
        <span className="underline cursor-pointer">Privacy Policy</span> and
        consent to receive updates.
      </p>
    </div>
  );
};

export default News;
