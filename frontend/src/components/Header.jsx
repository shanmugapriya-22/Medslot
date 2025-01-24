import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Content */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-8 mb-7">
        <div className="text-center text-blue-800">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 whitespace-pre-wrap">
            Your Health, Our Priority
          </h2>
          <p className="text-base md:text-lg mb-6">
            "We are here to ensure your health is in the best hands. Book your
            appointment today for a seamless experience!"
          </p>
          <p className="text-xs md:text-sm mb-8">
            At our clinic, we believe in providing personalized care for your
            well-being. Whether it's a routine checkup or an urgent
            consultation, we are just a click away!
          </p>
          <div className="space-x-0 md:space-x-4 flex flex-col md:flex-row items-center">
            <a href="#speciality">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full md:w-auto mb-4 md:mb-0">
                Get Started
              </button>
            </a>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-full md:w-auto">
              Track Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Right Side with Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img
          src={assets.bg_img}
          alt="Background"
          className="object-contain w-full h-64 md:h-full"
        />
      </div>
    </div>
  );
};

export default Header;
