import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-gray-50 py-10 px-5">
      {/* About Section */}
      <div className="text-center mb-10">
        <p className="text-3xl font-bold text-gray-800">
          ABOUT <span className="text-blue-500">US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <img
          src={assets.about_image}
          alt="About us"
          className="max-w-md rounded-lg shadow-lg"
        />
        <div className="max-w-lg text-gray-700">
          <p className="mb-4">
            Welcome to our doctor appointment booking platform! We simplify healthcare by connecting you with the best medical professionals, ensuring timely and convenient access to care.
          </p>
          <p className="font-bold text-xl text-blue-500 mb-2">Our Vision</p>
          <p>
            To make healthcare accessible, efficient, and patient-friendly, empowering individuals to take charge of their well-being with ease.
          </p>
        </div>
      </div>

      {/* Features Section */}
    
        <div className="text-center mb-8">
        <p className="text-4xl font-semibold text-gray-800 leading-tight">
  Why Choose <span className="text-blue-500">US</span>
</p>

          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-5 border-2 border-blue-300 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-blue-500 text-4xl mb-4">
              <i className="fas fa-hospital-alt"></i>
            </div>
            <p className="font-bold text-lg text-gray-800">Wide Network of Doctors</p>
            <p className="text-gray-600 mt-2">
              Access top-rated doctors across various specialties, all verified and trusted to deliver quality care.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center p-5 border rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-green-500 text-4xl mb-4">
              <i className="fas fa-calendar-check"></i> {/* Updated icon */}
            </div>
            <p className="font-bold text-lg text-gray-800">Easy Appointment Scheduling</p>
            <p className="text-gray-600 mt-2">
              Book appointments at your convenience with a simple and user-friendly interface.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center p-5 border-2 border-blue-300 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-purple-500 text-4xl mb-4">
              <i className="fas fa-shield-alt"></i> {/* Updated icon */}
            </div>
            <p className="font-bold text-lg text-gray-800">Secure and Private</p>
            <p className="text-gray-600 mt-2">
              Your personal information is protected with our advanced encryption and security protocols.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="text-center p-5 border rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-yellow-500 text-4xl mb-4">
              <i className="fas fa-credit-card"></i>
            </div>
            <p className="font-bold text-lg text-gray-800">Online Payment Integration</p>
            <p className="text-gray-600 mt-2">
              Secure online payments via Stripe and PayPal for seamless and contactless transactions.
            </p>
          </div>
          {/* Feature 5 */}
          <div className="text-center p-5  rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 border-2 border-blue-300 ">
            <div className="text-red-500 text-4xl mb-4">
              <i className="fas fa-headset"></i> {/* Updated icon */}
            </div>
            <p className="font-bold text-lg text-gray-800">24/7 Support</p>
            <p className="text-gray-600 mt-2">
              Our dedicated support team is here to assist you with any queries, anytime you need.
            </p>
          </div>
          {/* Feature 6 */}
          <div className="text-center p-5 border rounded-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-500 text-4xl mb-4">
              <i className="fas fa-star"></i> {/* Updated icon */}
            </div>
            <p className="font-bold text-lg text-gray-800">Verified Reviews</p>
            <p className="text-gray-600 mt-2">
              Read real reviews from other patients to make informed decisions about your healthcare.
            </p>
          </div>
        </div>
      </div>

  );
};

export default About;
