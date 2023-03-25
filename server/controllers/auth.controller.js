import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import {expressjwt} from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log('jwt',process.env.JWT_SECRET);
        console.log('user', user);
        if(!user)
            return res.status(401).json({ error: "User not found" });

        if(!user.authenticate(req.body.password))
            return res.status(401).json({ error: "Credentials do not match" });

        const token = jwt.sign({ _id: user._id}, config.jwtSecret);
        console.log(token);

        res.cookie('divineMole', token, { expire: new Date(Date.now + 9999 )});

        console.log('res',res);

        return res.json({
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Could not sign in" });
    }


}
const signout = (req, res) => {
    res.clearCookie("divineMole");
    return res.status(200).json({
        message: "signed out"
    });
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ["HS256"]
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!(authorized)){
        return res.status(403).json({
            error: "User is not authorized"
        }); 
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization }



