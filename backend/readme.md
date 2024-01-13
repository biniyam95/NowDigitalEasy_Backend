
## Table of Contents

- User routes
- Admin routes
- Jwt token and cookie for auth
- middlewares
- packages
- pagination
- postman-.json files
- mongoose schema for posts and users


# User Routes
- [login] - /api/user/login
- [signup]- /api/user/signup
- [logout] - /api/user/logout

- [CREATE_POST]- /api/user/post/create?userId= 
- [UPDATE_POST]- /api/user/post/edit?postId= &userId=
- [DELETE_POST]-  /api/user/post/delete?postId= &userId= 

- [user's_own_all_posts] -' /api/user/post/all ?userId= 
- [user's_own_one_post] -' /api/user/post/one ?userId=  &postId=

# Admin Routes
- [all_users] - /api/admin/user/all?page= &limit=
- [all_posts] -/api/admin/post/all?page= &limit=

- [One_Post] -- /api/admin/post/one?postId=
- [one_user] - /api/admin/user/one?userId= 

- [any_user's_all_post] -' /api/admin/user/post/all ?userId=
- [any_user's_one_post] -' /api/admin/user/post/one ?userId=  &postId=


# middlewares
- [verifyToken] - verifies token
- [verifyPermission] - only admin or same user is allowed
- [verifyAdmin] - verifies for admin routes
- [multer] - handles file uploaded images and form data

# additional packages
- [asyncHandler] - does try and catch
- [Jwt] - for auth
- [cookie-parser] - for parsing cookies
 
# pagination  
- page and limit query parameters


# NOTE :- for jwt.verify
- alternatively you can also use bearer token inside req.headers.authorization.
- this token will be set into req.headers.authorization from frontend 
- in case of postman i have to directly give the bearer token in the headers.authorization for each request
- but with cookie ,it will be set in the cookie of postman and its available for all the http request. no manual setting value required 