// import jwt  from "jsonwebtoken";

// const isAuthenticated=async (req,res,next)=>{
//     try{
//         const token=req.cookies.access_token;
//         if(!token){
//             return res.status(401).json({
//                 message: "User not Authenticated"
//             })
//         }
//         const decode=await jwt.verify(token,process.env.JWT)
//         if(!decode){
//             return res.status(401).json({message: "Invalid Token"})
//         }
//         req.id=decode.userId;
//         next();
//     }catch(error){
//         console.log(error)
//     }
// }

// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        message: "User not Authenticated"
      });
    }
    const decode = await jwt.verify(token, process.env.JWT);
    if (!decode) {
      console.log("Token verification failed");
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = decode.userId || decode.id; // Adjusted line
    next();
  } catch (error) {
    console.log("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuthenticated;

