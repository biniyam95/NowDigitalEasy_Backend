import asyncHandler from "express-async-handler";
import { userModel } from "../models/userModel.js";
import { postModel } from "../models/postModel.js";

//all Users- '/api/admin/user/all'
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const {page,limit}= req.query

  //pagination
  const allUsers = await userModel.find() 
                                  .skip((page-1)*limit) .limit(limit)


  if (!allUsers) res.status(200).json({ msg: "user not exist" });
  return res.json({ allUsers,page,limit });
});

//all Posts- '/api/admin/post/all'
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const {page,limit}=req.query

  const allPosts = await postModel.find() 
                                  .skip((page-1)*limit) .limit(limit)


  if (!allPosts) res.status(200).json({ msg: "no posts exist" });
  res.json({ allPosts, page,limit });
});


//one user- '/api/admin/user/one?userId= '
export const getOneUser = asyncHandler(async (req, res, next) => {
  const {userId}=req.query
  const oneUser = await userModel.findById(userId);
  if (!oneUser) res.status(200).json({ msg: "user not exist" });
  return res.json({ oneUser });
});


//onePost - '/api/admin/post/one?postId='
export const getOnePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.query;
  const onePost = await postModel.findById({ _id: postId}); 
  return res.json({onePost})
});



//one User's all posts -' /api/admin/user/post/all ?userId= '
export const getUserAllPosts = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  const userAllPosts = await userModel.findById(userId).populate('postIDs') 
  return res.json({userAllPosts})
});



//one User's one post  -   /api/admin/user/post/one ?userId= &postId='
export const getUserOnePost = asyncHandler(async (req, res, next) => {
  const { postId,userId } = req.query;
  const userOnePost = await postModel.findById({ _id: postId, createdBy:userId }); 
  return res.json({userOnePost})
});





