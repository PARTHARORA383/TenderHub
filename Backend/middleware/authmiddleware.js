const jwt = require('jsonwebtoken')


const authmiddleware = (req , res , next)=>{


  const authheader = req.headers['authorization'];

  if(!authheader){
    return res.status(401).json({message :
      "  authorisation header missing"
    })
  }
  const token = authheader.split(' ')[1];
  

  if(!token){
    return res.status(401).json({
      message : "Token is missing"
    })
  }

  try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
      req.user = decoded; 
    
      console.log(req.user.userId)
      next();
    }catch(e){
        return res.status(403).json({
          message : "Invalid token"
        })
    }


}

module.exports = authmiddleware