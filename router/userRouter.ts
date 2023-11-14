import express from "express"
import { deleteUser, enterOTPUser, registerUser, signInUser, verifyUser, viewAllUsers, viewOneUser } from "../controller/userController"

const Router = express.Router()

Router.route("/register").post(registerUser)
Router.route("/:token/enter-otp").post(enterOTPUser)
Router.route("/:token/verify-user").get(verifyUser)
Router.route("/signIn-user").post(signInUser)
Router.route("/:id/view-one-user").get(viewOneUser)
Router.route("/view-all-user").get(viewAllUsers)
Router.route("/:id/delete-user").delete(deleteUser)



export default Router