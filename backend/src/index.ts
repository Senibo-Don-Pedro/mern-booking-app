import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'

//connect to db
mongoose.connect(process.env.MONGO_DB as string)


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))


//join frontend to backend
app.use(express.static(path.join(__dirname, "../../front-end/dist")))

//user routes
app.use('/api/auth', authRoutes )
app.use('/api/users', userRoutes )

//listening
app.listen(7000, () => {
  console.log("server running on port 7000")
})
