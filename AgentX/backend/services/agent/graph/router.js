import { getModel } from "../config/llmModels"

export const router = async (state) => {
    const llm = await getModel("router")
    const prompt =`
    You are a router for AI agents.
    Based on the user's prompt, decide which agent should handle the request.
    
    Return the agent name in JSON format: {"agent": "<agent_name>"}
    
    Available agents:
    - chat: For general conversations
    - search: For web searches
    - vision: For image analysis
    - ppt: For creating presentations
    - coding: For code generation
    - pdf: For PDF processing

    Rules:

    chat:

    General events,
    latest information,
    news,
    recent developments,
    internet lookup.


    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.

    coding:
    Generate code,
    debug code,
    write script,
    fix error,
    explain code,
    refactor,
    write test cases,
    

    vision:
    Image analysis,
    image description,
    object detection,
    OCR,

    ppt:
    Create presentation,
    Generate slides,
    Design presentation,

    Return ONLY one word:

    chat
    search
    vision
    ppt
    coding
    pdf

    
    
    User prompt: ${state.prompt}
    `

    const response = await llm.invoke(prompt)
    console.log(response)
    return {
        ...state,
        agent: response.content.content.trim().toLowerCase()
    }
}