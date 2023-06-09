import jwt from 'jsonwebtoken';
import User from '../model/user.js'


export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
        token = req.headers.authorization.split(' ')[1];
        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next();

        } catch (error) {
            console.log(error);
            res.status(401).send('Not authorized');
        }
    }
    if(!token){
        res.status(401).send('Not authorized, No token created');
    }
}