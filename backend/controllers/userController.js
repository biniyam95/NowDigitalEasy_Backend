import asyncHandler from 'express-async-handler'
import { userModel } from '../models/userModel.js'
import { hash,compare } from 'bcrypt'
import { postModel } from '../models/postModel.js'
import jwt from 'jsonwebtoken'



//login - api/user/login
export const Login =asyncHandler(async(req,res,next)=>{
  const {email,password}=req.body

  //check email
  const user= await userModel.findOne({email})
  if(!user) return res.send('email doesnt exist')
  
  //check password
  const isPassMatch=compare(password,user.password)

  if(!isPassMatch) return res.send('password dont match')

  //remove password after password Check-sensitive info
  delete user._doc.password 

  
  //token generate
  const token =  jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"7d"})
  
  //set token to cookies with key name - 'cookieToken'
  res.cookie('cookieToken',token,{httpOnly:true})
  
   return res.json({user,token, msg:'login success'})
})







//signup-api/user/signup
export const Signup =asyncHandler(async(req,res,next)=>{
    const {name,email,mobile,role,password} =req.body
    
    //email exist
    const emailExist= await userModel.findOne({email})
    if(emailExist) return res.send('user already exists')

    //hash password
    const hashedPassword= await hash(password,10)  

    const newUser= await userModel.create({name,email,mobile,role,password:hashedPassword})

    //remove password
    delete newUser._doc.password 
   
    const token = jwt.sign({user},'jwtsecret',{expiresIn:"7d"})
    res.cookie('cookieToken',token,{httpOnly:true})

    return res.json({newUser,token , msg:'new user created'})

})


//log out-api/user/logout
export const Logout =asyncHandler(async(req,res,next)=>{
    
    //setting cookieToken as null
     res.cookie('cookieToken',null, { httpOnly:true, expires:new Date(Date.now()) } )  
     res.status(200).json({message:"logged Out succesfully"})
   
})



//==========  user actions on posts=================

//CREATE POST- ' /api/user/post/create?userId= '
  export const createPost =asyncHandler(async(req,res,next)=>{
  const {title,description,isPrivate} =req.body
  const userId= req.query.userId
  
    const {filename}= req.file

    const newPost= await postModel.create({title,description,isPrivate,image:filename , createdBy:userId})

    //newPost's id will be pushed to userModel's postIDs array field
    await userModel.findByIdAndUpdate(userId, { $push: { postIDs: newPost._id } }); 

   return res.json({newPost,msg:'new post created '})

})



//EDIT , DELETE

//' UPDATE POST-/api/user/post/edit?postId= &userId='
export const updatePost =asyncHandler(async(req,res,next)=>{
const {postId,userId}= req.query

const updateData=req.body

//if  uploadedFile exists,then put it inside updateData
if(req.file&&req.file.filename){
 updateData.image=req.file.filename
}

//updated Date
updateData.updatedDate=new Date()  

  const updatedPost=await postModel.findOneAndUpdate({_id:postId,createdBy:userId}, updateData, {new:true}) //id,data to be updated in the req.body, object checklisting this as new.
  if(!updatedPost) return res.send('post not found') 

return res.json({updatedPost,msg:'post successfully updated'})
})




//DELETE POST-  api/user/post/delete?postId= &userId= '
export const deletePost =asyncHandler(async(req,res,next)=>{
const {postId,userId}= req.query

const deletedPost=await postModel.findOneAndDelete({_id:postId,createdBy:userId})
if(!deletedPost) return res.send('post not found') 

return res.json({deletedPost,msg:'post successfully deleted'})
})










