import express, {Request, Response} from "express"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { sendInitialMail, sendLastMail } from "../utils/email";
import { Error } from "mongoose";

export const registerUser = async (req: Request, res: Response) => {
try {
    const {userName, email, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    
    const randValue = await crypto.randomBytes(10).toString("hex")
    const otp = await crypto.randomBytes(3).toString("hex")

    const token = jwt.sign(randValue, "josephine")
     

    const user = await userModel.create({
        userName, email, password: hashed, token,  otp, wallet: 200
    })

    sendInitialMail(user).then(() => {
        console.log("OTP has been sent")
    })

    return res.status(201).json({
        message: "almost done with registration",
        data: user
    })
} catch (error) {
    return res.status(404).json({
        message: "Error occurred during registration"
    })
}
}

export const enterOTPUser = async (req: Request, res: Response) => {
    try {
        const {otp} = req.body
        const {token} = req.params

        jwt.verify(token, "josephine", async (err, payload: any)=> {
            if (payload) {
                const user = await userModel.findById(payload.id)

                if (user?.otp === otp) {
                    sendLastMail(user).then(() => {
                        console.log("verification mail has been sent")
                    });

                    return res.status(201).json({
                        message: "please check your verification",
                        data: user
                    })
                } else {
                    return res.status(404).json({
                        message: "error with otp"
                    })
                }
            } else {
                return err
            }
        })
        return res
    } catch (error) {
        return res.status(404).json({
            message: "Error with otp",
            data: error.message
        })
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    try { 
       const {token} = req.params;
       jwt.verify(token, "josephine", async (err, payload: any) => {
        if (err) {
            throw new Error()
        } else {
            const user = await userModel.findById(payload.id);

            if(user ){
                await userModel.findByIdAndUpdate(
                    user.id,
                    {
                        verified: true,
                        token: ""
                    }, 
                    {new: true}
                )
                return res.status(201).json({
                    message: "verification successful"
                })
            } else {
                return res.status(404).json({
                    message:" you are not authorized for this"
                })
            }
        }
        return res
       })

    } catch (error) {
        return res.status(404).json({
            message: `Error verifying gift user`,
            data: error.message,
          });
    }
}

export const signInUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
        }

        return res.status(201).json({
            message: "successful"
        })
    } catch (error) {
        return res.status(201).json({
            message: "successful"
        })
    }
}