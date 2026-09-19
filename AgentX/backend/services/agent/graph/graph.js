import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent";
import { visionAgent } from "../agents/vision.agent.js";
import { pptAgent } from "../agents/ppt.agent";
import { codingAgent } from "../agents/coding.agent";
import { pdfAgent } from "../agents/pdf.agent";

const workflow = new StateGraph(agentState)

workflow.addNode("router",router)
workflow.addNode("chat",chatAgent)
workflow.addNode("search",searchAgent)
workflow.addNode("vision",visionAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("pdf",pdfAgent)

workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent){
        case "chat":
            return "chat"
        case "coding":
            return "coding"
        case "search":
            return "search"
        case "vision":
            return "vision"
        case "ppt":
            return "ppt"
        case "pdf":
            return "pdf"
        default:
            return "chat"

    }
},{
    chat:"chat",
    search:"search",
    vision:"vision",
    ppt:"ppt",
    coding:"coding",
    pdf:"pdf"
})

workflow.addEdge("search","chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("vision","__end__")

export const graph = workflow.compile()