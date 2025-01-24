import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
     <div className="p-4 bg-gray-100 min-h-screen">
  {/* Doctor Info Section */}
  <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
    {/* Doctor Image */}
    <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
      <img
        src={docInfo.image}
        alt="Doctor"
        className="rounded-lg bg-blue-500 w-full h-60 sm:h-full object-cover border-2 border-gray-300"
      />
    </div>

    {/* Doctor Details */}
    <div className="w-full sm:w-2/3 pl-0 sm:pl-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
        {docInfo.name}
        <img src={assets.verified_icon} alt="Verified" className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
      </h2>
      <p className="text-sm sm:text-lg text-gray-600 mt-2">
        {docInfo.degree} - {docInfo.speciality}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">Experience: {docInfo.experience} years</p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">About: {docInfo.about}</p>
      <p className="text-sm sm:text-lg text-gray-700 font-semibold mt-4">
        Appointment Fee: <span className="text-indigo-500">{currencySymbol}{docInfo.fees}</span>
      </p>
      
      {/* Rating Section */}
      <div className="mt-4">
        <p className="text-sm sm:text-lg text-gray-800 font-semibold">Rating:</p>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${docInfo.rating > index ? "text-yellow-500" : "text-gray-300"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.95 3.15-1.26-5.48 4.23-3.68-5.56-.48L10 0l-2.36 8.78-5.56.48 4.23 3.68-1.26 5.48L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Date Section */}
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Select a Date</h3>
    <div className="flex space-x-4 overflow-x-auto">
      {docSlots.length > 0 &&
        docSlots.map((item, index) => (
          <div
            key={index}
            onClick={() => setSlotIndex(index)}
            className={`p-3 border rounded-lg text-center cursor-pointer ${
              slotIndex === index ? "bg-indigo-500 text-white" : "bg-gray-100"
            }`}
          >
            <p className="text-xs sm:text-sm font-semibold">
              {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
            </p>
            <p className="text-xs">
              {item[0] && `${item[0].dateTime.getDate()} ${monthsOfYear[item[0].dateTime.getMonth()]}`}
            </p>
          </div>
        ))}
    </div>
  </div>

  {/* Time Slots Section */}
  <div className="flex items-center gap-3 w-full overflow-x-auto mt-4" style={{ scrollBehavior: "smooth" }}>
    {docSlots.length > 0 &&
      docSlots[slotIndex].map((item, index) => (
        <p
          onClick={() => setSlotTime(item.time)}
          key={index}
          className="text-xs sm:text-sm font-light flex-shrink-0 px-3 py-2 rounded-full cursor-pointer border border-gray-400 bg-gray-200 hover:bg-indigo-500 hover:text-white transition-colors"
        >
          {item.time.toLowerCase()}
        </p>
      ))}
  </div>

  {/* Book Appointment Button */}
  <button className="bg-primary text-white text-sm sm:text-lg font-light px-4 sm:px-7 py-2 rounded-full my-6">
    Book Appointment
  </button>

  {/* Related Doctors */}
  <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
</div>

    )
  );
};

export default Appointment;
