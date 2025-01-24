import jwt from 'jsonwebtoken'
// admin auth middleware
const authAdmin=async(req,res,next)=>{
    try{
        const{atoken}=req.headers
        if(!atoken){
            return res.status(401).json({msg:"Not Authorized Login Again"})
        }
        const token_decoded=jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decoded !==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({msg:"Not Authorized Login Again"})
        }
        next()

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}
export default authAdmin