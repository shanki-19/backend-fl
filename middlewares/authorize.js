import jwt from 'jsonwebtoken';

const authorize = (allowedRoles) => (req, res, next)=> {
    // const token = req.headers.authorization?.split('')[1];
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access"});
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        
        // check if the user's role is allowed
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access the resource"})
        }

        next();
    }catch (error){
        console.log("Token verification error: ", error.message);
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Token expired. Please log in again."});
        }
    }
}

export default authorize;