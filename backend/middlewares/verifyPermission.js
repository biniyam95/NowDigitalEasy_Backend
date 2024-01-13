export function verifyPermission(req,res,next){
  try{
    const {userId}= req.query
    const {_id,role}=req.user
 
    if(userId!==_id && role!=='admin'){
     return res.send('not authorised for two reasons:because you trying to create someone elses post and you are not admin')
    }
    next()
  } 

  catch(err){
    console.log(err)
  }

  
}