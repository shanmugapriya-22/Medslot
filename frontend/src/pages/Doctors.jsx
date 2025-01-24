import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]); // State for filtered doctors
  const [fees, setFees] = useState(1000); // Default max fees for range slider
  const [rating, setRating] = useState(0); // State for rating filter
  const [speciality, setSpeciality] = useState(""); // State for speciality filter
  const { doctors } = useContext(AppContext); // Get all doctors from context
  const navigate = useNavigate(); // Navigation to appointment page

  // Filter doctors based on fees, rating, and speciality
  const applyFilter = () => {
    let filtered = doctors;

    // Apply speciality filter if it exists
    if (speciality && speciality !== "all") {
      filtered = filtered.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    // Apply fee filter if it exists
    if (fees) {
      filtered = filtered.filter((doc) => doc.fees <= Number(fees));
    }

    // Apply rating filter if it exists
    if (rating) {
      filtered = filtered.filter((doc) => doc.rating >= Number(rating));
    }

    setFilterDoc(filtered); // Update the filtered doctors
  };

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFilter();
  }, [fees, rating, speciality, doctors]);

  return (
    <div className="flex">
      {/* Sidebar for Filters */}
      <div className="w-1/4 p-4 border-r bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Speciality Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Speciality</h3>
          <div className="space-y-2">
            {[
              "General Physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatrician",
              "Neurologist",
              "Gastroenterologist",
            ].map((spec, index) => (
              <button
                key={index}
                onClick={() => setSpeciality(spec)}
                className={`block text-left px-4 py-2 rounded-md w-full ${
                  speciality === spec
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-300"
                } hover:bg-blue-200`}
              >
                {spec}
              </button>
            ))}
            <button
              onClick={() => setSpeciality("")}
              className={`block text-left px-4 py-2 rounded-md w-full ${
                speciality === ""
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              } hover:bg-blue-200`}
            >
              All
            </button>
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Fees</h3>
          <input
            type="range"
            min="10"
            max="100"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-700 mt-2">Max Fees: ₹{fees}</p>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((rate) => (
              <button
                key={rate}
                onClick={() => setRating(rate)}
                className={`block text-left px-4 py-2 rounded-md w-full ${
                  rating === rate
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-300"
                } hover:bg-blue-200`}
              >
                {rate} ★ & Above
              </button>
            ))}
            <button
              onClick={() => setRating(0)}
              className={`block text-left px-4 py-2 rounded-md w-full ${
                rating === 0
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              } hover:bg-blue-200`}
            >
              All Ratings
            </button>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Doctors Directory</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-white shadow-lg rounded-lg p-4 relative transform transition-transform duration-300 ease-in-out hover:scale-105 border border-blue-400 cursor-pointer"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full mr-4 border-2 border-blue-400"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                    <p className="text-gray-600 text-sm">Fees: ₹{item.fees}</p>
                    <p className="text-yellow-500 text-sm">Rating: {item.rating} ★</p>
                    <p className="text-green-500 text-sm mt-1">Available</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found matching the selected criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
