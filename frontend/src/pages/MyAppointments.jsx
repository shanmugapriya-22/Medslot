import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid'; // Updated import for v2

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);  // Fetching doctors data from context

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      
      <div className="space-y-6">
        {/* Loop through the first two doctors and display their details */}
        {doctors.slice(0, 2).map((doctor, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-full mr-4 border-2 bg-blue border-green-400 hover:border-green-500 transition-all duration-300"
              />
              <div>
                <p className="text-xl font-semibold">{doctor.name}</p>

                {/* Stylish Specialty Capsule with Border and Better Text Contrast */}
                <p className="inline-block px-4 py-1 mt-2 text-sm text-gray-800 bg-blue-100 border-1 border-green-300 rounded-full">
                  {doctor.speciality}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 flex items-center">
                <MapPinIcon className="w-5 h-5 text-gray-600 mr-2" />
                Address:
              </p>
              <div className="ml-7 space-y-1">
                <p className="text-sm text-gray-600">{doctor.address.line1}</p>
                <p className="text-sm text-gray-600">{doctor.address.line2}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 flex items-center">
              <CalendarIcon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-semibold">Date & Time: </span>25, July, 2024 | 8:30 PM
            </p>

            <div className="flex justify-between items-center mt-4">
              <div></div>
              <div className="space-x-4">
                <button
                  className="border-2 border-blue-500 text-blue-500 bg-transparent py-2 px-4 rounded transition-all duration-300 hover:bg-blue-500 hover:text-white"
                >
                  Pay Online
                </button>
                <button
                  className="border-2 border-red-500 text-red-500 py-2 px-4 rounded transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
