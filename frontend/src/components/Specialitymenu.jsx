import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const Specialitymenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-6 my-4 text-gray-800 rounded-sm"
      id="speciality"
    >
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-600 hover:text-blue-800 transition-all duration-300">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="w-11/12 sm:w-2/3 text-center text-sm sm:text-xl text-gray-600 italic mb-6">
        Simply browse through our extensive list of trusted doctors and schedule
        your appointment with ease.
      </p>

      {/* Horizontal Scrollable Speciality Cards */}
      <div className="w-full overflow-x-auto">
        <div className="flex sm:justify-center gap-4 pt-3 w-full flex-nowrap">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex-shrink-0 relative flex flex-col items-center group"
            >
              {/* Image Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full shadow-lg mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Speciality Name */}
              <p className="text-center text-xs sm:text-lg text-gray-600 font-medium">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialitymenu;
