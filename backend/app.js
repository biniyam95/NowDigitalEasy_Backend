import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import {config} from 'dotenv'
config()

import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

const app=express()

//use middlewares
app.use(cors())
app.use(morgan('dev')) 

app.use(express.json())
app.use(cookieParser())

//api
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

//error handler for all api
 app.use((err,req,res,next)=>{
  console.log(err)
  console.log('internal server error');
}) 

const port= process.env.PORT||4000

app.listen(port,()=>{
  mongoose.connect(process.env.MONGO_URL)
  .then(()=>{
    console.log('db connected')
    console.log('server running on 4000');
  })
  
  .catch(()=>{
    console.log('db not connected');
  })
})