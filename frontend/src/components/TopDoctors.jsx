import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const sortedDoctors = [...doctors].sort((a, b) => b.rating - a.rating)

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center mt-6">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Browse through our list of trusted doctors sorted by ratings.
      </p>

      {/* Grid layout with 3 on the top row and 3 below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedDoctors.slice(0, 6).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white shadow-lg rounded-lg p-4 relative transform transition-transform duration-300 ease-in-out hover:scale-105 border border-blue-400"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mr-4 border-2 border-blue-400"
              />
              <div>
                <p className="text-green-500 text-sm font-medium flex items-center">
                  <span className="text-3xl mr-1  mt-2 mb-1.5">•</span> Available
                </p>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
                <p className="mt-2 text-yellow-500 text-sm">
                  Rating: {item.rating} ★
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the More button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            navigate(`/appointment/${item._id}`);
            scrollTo(0, 0)
          }}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          More
        </button>
      </div>
    </div>
  )
}

export default TopDoctors
