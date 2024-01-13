import { Router } from "express";
import { Login, Logout, Signup ,createPost, deletePost, updatePost } from "../controllers/userController.js";
import { getUserAllPosts, getUserOnePost } from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { handleUpload } from "../middlewares/multer.js";
import { verifyPermission } from "../middlewares/verifyPermission.js";

const userRouter= Router()

//login - api/user/login
userRouter.route('/login').post(Login)

//signup-api/user/signup
userRouter.route('/signup').post(Signup)

//log out-api/user/logout
userRouter.route('/logout').post(Logout)


//CREATE POST- ' /api/user/post/create?userId= '
userRouter.route('/post/create').post(verifyToken, verifyPermission, handleUpload.single('image'),createPost) 

//' UPDATE POST-/api/user/post/edit?postId= &userId='
userRouter.route('/post/edit').patch(verifyToken,verifyPermission, handleUpload.single('image'),updatePost) 

//DELETE POST-  api/user/post/delete?postId= &userId= '
userRouter.route('/post/delete').delete(verifyToken, verifyPermission, deletePost)


//below are user's own all posts and one post- ids need to match. user can only view his own allPosts and onePost

//user's own all posts -' /api/user/post/all ?userId= '
userRouter.route('/post/all').get(verifyToken,verifyPermission, getUserAllPosts)  //api/admin/user/post/allPosts   //req.query 

//one User's one post -' /api/user/post/one ?userId= &postId='
userRouter.route('/post/one').get(verifyToken,verifyPermission,getUserOnePost)   //req.query



export default userRouter