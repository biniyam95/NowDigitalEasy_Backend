export function verifyAdmin(req,res,next){
  
   const user = req.user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden. Admins only.' });
  }
  next();
}