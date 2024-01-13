import { Router } from "express";
import { getAllPosts, getAllUsers, getOnePost, getOneUser, getUserAllPosts, getUserOnePost } from "../controllers/adminController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const adminRouter= Router()


//all Users- '/api/admin/user/all?page= &limit='
adminRouter.route('/user/allUsers').get(verifyToken, verifyAdmin, getAllUsers)  

//all Posts- '/api/admin/post/all?page= &limit='
adminRouter.route('/post/allPosts').get(verifyToken, verifyAdmin, getAllPosts)  //api/admin/post/allPosts ?page= & limit= 

//onePost - '/api/admin/post/one?postId='
adminRouter.route('/post/onePost').get(verifyToken, verifyAdmin, getOnePost)   

//one user- '/api/admin/user/one?userId= '
adminRouter.route('/user/oneUser').get(verifyToken, verifyAdmin, getOneUser)   //api/admin/user/oneUser?userId=    //req.query


//one User's all posts -' /api/admin/user/post/all ?userId= '
adminRouter.route('/user/post/allPosts').get(verifyToken, verifyAdmin, getUserAllPosts) 

//one User's one post  -  /api/admin/user/post/one ?userId= &postId='
adminRouter.route('/user/post/onePost').get(verifyToken, verifyAdmin, getUserOnePost)   









export default adminRouter