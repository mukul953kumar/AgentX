import { getModel } from "../config/llmModels"

export const chatAgent = async (params) =>{
     const llm = getModel("chat")
     const prompt = "You are AgentX, an intelligent AI assistent."
     const response = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            "role": "human",
            "content": state.prompt
        }
     ])

     return {
        ...state,
        aiResponse: response.content
     }
}