import {getAuth} from "firebase-admin/auth"
import {app} from "../config/firebase.js"
import User from "../models/user.model.js"
import redis from "../../../shared/redis/redis.js"

export const login = async (req, res)=>{
    try{
        const {token} = req.body
        const decoded = await getAuth(app).verifyIdToken(token)
        let user = await User.findOne({
            firebaseUid:decoded.uid,
        })

        if(!user){
            user = await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture,
            })
        }

        const sessionId = crypto.randomUUID()
        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
        }),"EX",7*24*60*60)

        res.cookie("sessionId", sessionId, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.json({success:true,message:"User logged in successfully"})
        
    }catch(error){
        console.log("Failed to login:", error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const logout = async (req,res)=>{
    try{
        const sessionId = req.cookies?.sessionId || req.cookies?.session
        if (sessionId) {
            await redis.del(`session-${sessionId}`)
        }

        res.clearCookie("sessionId")
        res.clearCookie("session")

        return res.json({success:true,message:"User logged out successfully"})

    }catch(error){
        console.log("Failed to logout:", error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}