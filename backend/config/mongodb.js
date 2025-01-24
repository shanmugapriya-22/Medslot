import mongoose from "mongoose";
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URL}/Doctor-appointment-booking`)
}
export default connectDB