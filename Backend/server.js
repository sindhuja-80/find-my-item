import dotenv from "dotenv"
dotenv.config()

import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import itemRouter from "./routes/itemRoutes.js"
import matchRoute from "./routes/matchRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import {Server} from "socket.io"
import http from "http"


const app=express()

app.use(express.json())
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}
app.use(cors(corsOptions))

connectDB()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientBuildPath = path.join(__dirname, '..', 'Frontend', 'dist')

app.use("/api/users",userRouter)
app.use("/api/items",itemRouter)
app.use("/uploads", express.static("uploads"))
app.use("/api",matchRoute)
app.use("/api/messages",messageRouter)

// Basic API root
app.get('/',(req,res)=>{
    res.send("api is working")
})

// Serve frontend production build if present (placed after API routes)
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath))
  app.use((req, res, next) => {
    // Only serve index.html for non-API GET requests
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(clientBuildPath, 'index.html'))
    }
    next()
  })
}

const server =http.createServer(app)

const io=new Server(server,{
  cors:{
    origin: process.env.FRONTEND_URL || "*",
    credentials:true,
    methods:["GET","POST"]
  }
})
io.on("connection",(socket)=>{
  console.log("User connected",socket.id)
  socket.on("SendMessage",(data)=>{
    io.emit("receiveMessage",data)
  })
  socket.on("disconnect",()=>{
    console.log("User disconnected")
  })
})
const PORT=process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});