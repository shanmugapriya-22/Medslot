import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="space-y-2">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <div className="flex items-center justify-center space-x-2">
                <input onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="form-checkbox text-green-500"
                />
                <p className="text-gray-600">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
