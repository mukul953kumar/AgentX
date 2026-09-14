import express from "express"
import { createConversation,getConversation,saveMessage,getMessage,updateConversation } from "../controllers/chat.controller.js"

const router=express.Router()

router.get("/create-conversation",createConversation)
router.get("/get-conversations",getConversation)
router.post("save-message",saveMessage)
router.get("get-messages/:conversationId",getMessage)
router.post("/update-conversation",updateConversation)
export default router