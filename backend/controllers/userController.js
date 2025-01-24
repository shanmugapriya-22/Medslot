import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Log request data for debugging
    console.log("Request Data:", { name, email, password });

    // Validate input fields
    if (!name || !email || !password) {
      console.error("Error: Missing Details");
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (typeof email !== "string" || !validator.isEmail(email)) {
      console.error(`Error: Invalid email format - ${email}`);
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      console.error("Error: Password length less than 8 characters");
      return res.status(400).json({ success: false, message: "Password should be at least 8 characters" });
    }

    // Check for duplicate email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.error(`Error: Email already registered - ${email}`);
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store user in the database
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("User registered successfully:", user);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getProfile=async(req,res)=>{
  
}

export { registerUser };
