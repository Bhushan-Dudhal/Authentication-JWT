import { User } from "../model/user.models.js";
import { errorHandlers } from "../utils/error.handlers.js";
import jwt from "jsonwebtoken"




export const isAuthentication = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return next(errorHandlers(400,"You have to Login First"))
        }

        const decode = jwt.verify(token, process.env.SECRETE_KEY)
        
        const user = await User.findById(decode._id)
        if (!user) {
            return next(errorHandlers(404,"Invalid Cookies id"))
        }

        req.user = user;
        next()
        
    } catch (error) {
        console.log(`Error While User Authentication ${error}`);
        
    }
}