import jwt from 'jsonwebtoken'
export const verifyToken = async(req, res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Not authenticated"});
    jwt.verify(token,process.env.JWT_SECRECT_TOKEN, async(err, payload)=>{
        if(err) return res.status(403).json({message:"You're not  validated "});
        req.userId = payload.id
        next()

    })

}