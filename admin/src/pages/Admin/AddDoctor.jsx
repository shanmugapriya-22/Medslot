import React,{useContext, useState} from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [speciality,setSpeciality]=useState('General Physician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')

  const{backendUrl,aToken}=useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      if (!docImg || !name || !email || !password || !fees || !experience) {
        return toast.error('Please fill all required fields');
      }
  
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
  
      // Log the formData payload
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      // Log the backend URL
      console.log('POST URL:', `${backendUrl}/api/admin/add-doctor`);
  
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });
  
      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setExperience('')
        setFees('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };
  


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <p className="text-3xl font-semibold text-gray-800 mb-8">Add Doctor</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img src={docImg?URL.createObjectURL(docImg):assets.upload_area}  alt="Upload" className="h-36 w-36 border-2 border-blue-200 rounded-full object-cover"/>
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-gray-500 mt-3 text-sm text-center">Upload doctor picture</p>
          </div>
          <div>
            <label className="block text-gray-700">Doctor Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">Doctor Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">Doctor Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">Experience</label>
            <input onChange={(e)=>setExperience(e.target.value)} value={experience} type="number" min="1" max="50" step="1" placeholder="Years of Experience" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700">Fees</label>
            <input onChange={(e)=>setFees(e.target.value)} value={fees}type="number" placeholder="Fees" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">Speciality</label>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none" placeholder="Speciality">
         
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Education</label>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree}type="text" placeholder="Education" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1}type="text" placeholder="Address 1" required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"/>
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2}type="text" placeholder="Address 2" required className="border rounded-md px-4 py-2 mt-2 w-full focus:border-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block text-gray-700">About Doctor</label>
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder="Write about the doctor" rows={5} required className="border rounded-md px-4 py-2 mt-1 w-full focus:border-blue-500 focus:outline-none"></textarea>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto">Add Doctor</button>
      </div>
    </div>
    </form>
  );
};

export default AddDoctor;
