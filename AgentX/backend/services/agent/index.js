import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import { router } from "./graph/router.js"


dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use("/", router)

app.get("/", (req, res) => {
    res.json({ message: "hello from agent service" })
})

app.listen(port, () => {
    console.log(`agent service started at port  ${port}`)
    connectDb()
})