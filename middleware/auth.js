import jwt from 'jsonwebtoken';

//next: have the function continue
export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization"); //get the token from the header

        if(!token){
            return res.status(403)
.send("Access Denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(500).json({error: "Token is not valid"});
    }
}