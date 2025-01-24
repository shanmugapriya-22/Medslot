import React, { useContext,useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const RelatedDoctors = ({speciality,docId}) => {
    const{doctors}=useContext(AppContext)
    const navigate=useNavigate()
    const [relDoc,setRelDoc]=useState([])

    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData=doctors.filter((doc)=>doc.speciality===speciality && doc._id!==docId)
            setRelDoc(doctorsData)
        }

    },[doctors,speciality,docId])
  return (
    <div>
        <h3>Related Doctors</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
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
    </div>
  )
}

export default RelatedDoctors