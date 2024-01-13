import jwt from 'jsonwebtoken'

export async function verifyToken(req,res,next){
  console.log(req.cookies,'999999')
  const cookieToken=req.cookies.cookieToken
  if(!cookieToken)  return res.status(401).send('no token found')


  try{
    const decodedUser=await jwt.verify(cookieToken, process.env.JWT_SECRET)
    console.log(decodedUser,"888888")
    req.user = decodedUser.user;
    next()

  }
  catch(err){
     return res.status(401).send('token mismatch')
  }
}

