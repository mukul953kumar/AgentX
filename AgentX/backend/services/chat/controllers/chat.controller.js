export const createConversation = async (req,res)=>{
    try{
        const userId=req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation = await Conversation.create({
            userId,
        })
        return res.status(201).json({success:true,conversation})
    }catch(error){
        console.log("error creating conversation",error)
        return res.status(500).json({success:false,message:"Error creating conversation"})
    }
}

export const getConversation = async (req,res)=>{
    try{
        const userId=req.headers["x-user-id"]
        console.log("userId",userId)
        const conversations = await Conversation.find({
            userId,
        }).sort({updatedAt:-1})
        return res.status(201).json({success:true,conversations})
    }catch(error){
        console.log("error getting conversation",error)
        return res.status(500).json({success:false,message:"error getting conversation"})
    }
}


export cos