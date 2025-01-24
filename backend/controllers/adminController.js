import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'


const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Log the request data
    console.log(
      { name, email, password, speciality, degree, experience, about, fees, address },
      imageFile
    );

    // Validate input fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !address) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    

    if (password.length < 8) {
      return res.status(400).json({ message: "Password should be at least 8 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    // Save doctor to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Send success response
    res.status(201).json({ success: true, message: "Doctor added successfully", doctorData });
  } catch (error) {
    console.error("Error in addDoctor:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//API for admin login
const loginAdmin=async(req,res)=>{
  try{
    const{email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})


    }else{
      res.status(500).json({ error: "Invalid Credentials" });
    }

  }catch(error){
    res.status(500).json({ error: "Internal server error" });
  }

}

//api to get all doctors on admin
const allDoctors=async(req,res)=>{
  try{
    const doctors=await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }

}

export { addDoctor ,loginAdmin,allDoctors};