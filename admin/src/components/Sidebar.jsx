import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendar, FaUserPlus, FaUsers } from 'react-icons/fa'; // New icons

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="space-y-4">
          {/* Dashboard Link */}
          <li>
            <NavLink to="/admin-dashboard" className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-772 cursor-pointer ${isActive ?'bg-[#f2f3ff] border-r-4 border-primary':''}`}>
              <FaHome className="text-gray-500" /> {/* Light gray color */}
              <p>Dashboard</p>
            </NavLink>
          </li>

          {/* Appointments Link */}
          <li>
            <NavLink to="/all-appointments" className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-772 cursor-pointer ${isActive ?'bg-[#f2f3ff] border-r-4 border-primary':''}`}>
              <FaCalendar className="text-gray-500" /> {/* Light gray color */}
              <p>Appointments</p>
            </NavLink>
          </li>

          {/* Add Doctor Link */}
          <li>
            <NavLink to="/add-doctor" className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-772 cursor-pointer ${isActive ?'bg-[#f2f3ff] border-r-4 border-primary':''}`}>
              <FaUserPlus className="text-gray-500" /> {/* Light gray color */}
              <p>Add Doctor</p>
            </NavLink>
          </li>

          {/* Doctor List Link */}
          <li>
            <NavLink to="/doctor-list" className={({isActive})=> `flex items-center gap-3 py-3.5 md:px-9 md:min-w-772 cursor-pointer ${isActive ?'bg-[#f2f3ff] border-r-4 border-primary':''}`}>
              <FaUsers className="text-gray-500" /> {/* Light gray color */}
              <p>Doctor List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
