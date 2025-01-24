import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { assets } from '../assets/assets';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      user_email: email,
      user_query: query,
    };

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_USER_ID' with your EmailJS credentials
    emailjs.send('shanpriyuu22@gmail.com', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        alert('Message sent successfully!');
        setShowForm(false); // Close the form after submission
      })
      .catch((err) => {
        alert('Failed to send message, please try again later');
      });
  };

  return (
    <div>
      <div className='text-center text-3xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="Office Image"/>
        
        <div>
          <p className="text-lg font-semibold text-gray-800">Our Office</p>
          <p className="text-gray-600 mb-4">
            We are located at 123 Health Avenue, MedCity, Country XYZ. Our office is open Monday to Friday from 9:00 AM to 6:00 PM.
          </p>
          <p className="text-lg font-semibold text-gray-800">Contact Information</p>
          <p className="text-gray-600 mb-4">
            <strong>Phone:</strong> +1 (234) 567-8901<br />
            <strong>Email:</strong> contact@doctorbook.com<br />
            <strong>Support Hotline:</strong> +1 (234) 567-8902 (24/7 support available)
          </p>

          {/* Button to show the form */}
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
            Have any queries? Click here
          </button>

          {/* Popup Form */}
          {showForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-96">
                <form onSubmit={handleFormSubmit}>
                  <p className="text-xl font-semibold text-gray-800">Submit Your Query</p>
                  <div className="mt-4">
                    <label className="block text-gray-600">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border border-gray-300 rounded-md mt-2" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600">Your Query</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md mt-2" 
                      rows="4" 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      required
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      type="submit" 
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                      Submit
                    </button>
                  </div>
                </form>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="absolute top-2 right-2 text-gray-500 text-xl font-semibold">
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
