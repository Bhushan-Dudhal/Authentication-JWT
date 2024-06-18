import { User } from "../model/user.models.js";
import { errorHandlers } from "../utils/error.handlers.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"




export const RegisterPOST = async (req, res, next) => {
    
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return next(errorHandlers(400, "User Already Exist"))
        }

        const hashpass = bcryptjs.hashSync(password, 10)

        await User.create({
            name, email, password: hashpass
        })

        res.status(201).json({
            success: true,
            message: "User Register Successfully"
        })
        
    } catch (error) {

        console.log(`Error While User Register ${error}`);
        
    }
}

export const LoginPOST = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandlers(404,"You have to Register First"))
        }
       
        const ismatchpass = bcryptjs.compareSync(password, validUser.password)
        if (!ismatchpass) {
            return next(errorHandlers(400,"Invalid Email or Password"))
        }

        const token = jwt.sign({ _id: validUser._id }, process.env.SECRETE_KEY)
        
        res.status(201).cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            .json({
                success: true,
                message:"User Login Successfully"
        })
        
    } catch (error) {
        console.log(`Error While USer Login ${error}`);
        
    }
}

export const getProfile = (req, res) => {
    const { user } = req;

    const { password, ...rest } = user._doc;

    res.status(201).json(rest)
}

export const LogoutUser = (req, res) => {
    
    res.status(201).clearCookie("token")
        .json({
            success: true,
            message:"User LogOut Successfully"
    })
}

 export const userUpdate = async (req, res, next) => {
    try {

        if (req.body.email) {
            const existEmail = await User.findOne({ email: req.body.email })
            if (existEmail) {
                return next(errorHandlers(400,"User Already Exist"))
            }
        }

        if (req.body.password) {
            
            req.body.password = bcryptjs.hashSync(req.body.password)
        }

        const { id } = req.params;

        const Updatesuser = await User.findByIdAndUpdate(
            id,
            {

                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password:req.body.password
                }
            },
            {new:true}
        )

        const { password, ...rest } = Updatesuser._doc;


        res.status(201).json({
            success: true,
            message: "User Updated Successfully",
            rest
        })
        
    } catch (error) {

        console.log(`Error While User Updated ${error}`);
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(errorHandlers(400,"You can delete only your Account"))
        }

        await User.findByIdAndDelete(id)

        res.clearCookie("token").status(200).json({
            success: true,
            message:"User Deleted Successfully"
        })
        
    } catch (error) {

        console.log(`Error While User Delete ${error}`);
        
    }
}