import express from "express"
import {  LoginPOST, LogoutUser, RegisterPOST, deleteUser, getProfile, userUpdate } from "../controllers/user.controllers.js"
import { isAuthentication } from "../middlewares/auth.middlewares.js"

const router = express.Router()


router.post("/register", RegisterPOST)
router.post("/login", LoginPOST)
router.get("/profile", isAuthentication, getProfile)
router.get("/logout",isAuthentication,LogoutUser)
router.put("/update/:id", userUpdate)
router.delete("/delete/:id",isAuthentication,deleteUser)




export default router