import jwt from 'jsonwebtoken'
export function verifyToken(req,res,next){
    //get token
    let signedToken=req.cookies.token
    if(!signedToken){
        return res.status(401).json({message:"please login first"})
    }
    //verify
    let decodedToken=jwt.verify(signedToken,'abcdef')
    console.log("decoded token", decodedToken)
    next()
}
