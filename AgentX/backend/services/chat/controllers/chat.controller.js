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

export const updateConversation = async (req,res)=>{
    try{
       const {id,title}=req.body
       const conversation = await Conversation.findByIdAndUpdate(id,{
        title:title
       },{
        new:true
       })
       if(!conversation){
        return res.status(404).json({success:false,message:"Conversation not found"})
       }
        return res.status(201).json({success:true,conversations})
    }catch(error){
        console.log("error updating conversation",error)
        return res.status(500).json({success:false,message:"error updating conversation"})
    }
}


export const saveMessage=async (req,res) => {
    try{
        const {conversationId,role,content}=req.body
        const message = await Message.create({
            conversationId,
            role,
            content,
        })
        return res.status(201).json({success:true,message})
    }catch(error){
       return res.status(500).json({success:false,message:"error saving message"})
    }
}


export const getMessage=async (req,res) => {
    try{
        const message = await Message.find({
            conversationId:req.params.conversationId
        }).sort({createdAt:-1})
        return res.status(201).json({success:true,message})
    }catch(error){
       return res.status(500).json({success:false,message:"error getting message"})
    }
}
 