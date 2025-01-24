import React, { useState, useEffect } from "react";

const MyProfile = () => {
  // Retrieve data from localStorage if available, otherwise use default values
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [userData, setUserData] = useState(
    storedUserData || {
      name: "Tharun Kumar",
      image: null, // Initially no image uploaded
      email: "tharunkumar26@gmail.com",
      phone: "8807088905",
      address: {
        line1: "57th cross, Richmond",
        line2: "Circle, Church Road, London",
      },
      gender: "Male",
      dob: "2004-08-26",
    }
  );

  const [isEdit, setIsEdit] = useState(false);

  // Update localStorage when the user data changes
  useEffect(() => {
    if (!isEdit) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={userData.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-300"
          />
          {isEdit && (
            <div>
              <label
                htmlFor="profile-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-blue-700 transition"
              >
                Upload
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      {/* Name Section */}
      <div className="text-center mb-6">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border px-4 py-2 rounded-lg w-full max-w-xs mx-auto text-xl font-semibold"
          />
        ) : (
          <p className="text-2xl font-bold">{userData.name}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-6 mb-6">
        <div>
          <p className="text-gray-600">Email:</p>
          {isEdit ? (
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border px-4 py-2 rounded-lg w-full"
            />
          ) : (
            <p className="text-gray-800">{userData.email}</p>
          )}
        </div>

        <div>
          <p className="text-gray-600">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border px-4 py-2 rounded-lg w-full"
            />
          ) : (
            <p className="text-gray-800">{userData.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-6 mb-6">
        <div>
          <p className="text-gray-600">Address:</p>
          {isEdit ? (
            <>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border px-4 py-2 rounded-lg w-full mb-4"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border px-4 py-2 rounded-lg w-full"
                placeholder="Address Line 2"
              />
            </>
          ) : (
            <p className="text-gray-800">
              {userData.address.line1}, {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Gender and DOB */}
      <div className="space-y-6 mb-6">
        <div>
          <p className="text-gray-600">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border px-4 py-2 rounded-lg w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-800">{userData.gender}</p>
          )}
        </div>

        <div>
          <p className="text-gray-600">Date of Birth:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="border px-4 py-2 rounded-lg w-full"
            />
          ) : (
            <p className="text-gray-800">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Edit Toggle */}
      <div className="text-center">
        <button
          onClick={() => {
            setIsEdit((prev) => !prev);
            if (isEdit) {
              // Save changes to localStorage
              localStorage.setItem("userData", JSON.stringify(userData));
            }
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isEdit ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
