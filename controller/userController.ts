import {Request, Response} from "express"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { sendInitialMail, sendLastMail } from "../utils/email";


export const registerUser = async (req: any, res: Response): Promise<Response> => {
try {
    const {userName, email, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    
    const randValue = crypto.randomBytes(10).toString("hex")
    const otp = crypto.randomBytes(3).toString("hex")

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
} catch (error: any) {
    return res.status(404).json({
        message: "Error occurred during registration",
        data: error.message
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
    } catch (error: any) {
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

    } catch (error:any) {
        return res.status(404).json({
            message: `Error verifying gift user`,
            data: error.message,
          });
    }
}

export const signInUser = async (req: Request, res: Response) => {
    try {
       const {email, password}  =  req.body 

       const user = await userModel.findOne({email})

      

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password) 
            if (checkPassword) {
                const token = jwt.sign({id: user.id }, "josephine")
                if (user.verified && user.token === "") {
                    return res.status(201).json({
                        message: "you have been verified", 
                        data: token
                    })
                } else {
                    return res.status(404).json({
                        message: "you cannot signUp"
                    })
                }
            } else {
                return res.status(404).json({
                    message: "you cannot signUp"
                })
            }
        } else {
            return res.status(404).json({
                message: "you cannot signUp"
            })
        }
        
    } catch (error: any) {
        return res.status(201).json({
            message: "successful"
        })
    }
}


export const viewOneUser = async (req: Request, res: Response) => {
    try {
     const {Id} = req.params

     const user = await userModel.findById(Id)

      return res.status(201).json({
        message: "all users viewed", 
        data: user
      })
        
    } catch (error: any ) {
        return res.status(201).json({
            message: "unsuccessful", 
            data: error.message
        })
    }
}



export const viewAllUsers = async (req: Request, res: Response) => {
    try {
      const all = await userModel.find()

      return res.status(201).json({
        message: "all users viewed", 
        data: all
      })
        
    } catch (error: any ) {
        return res.status(201).json({
            message: "unsuccessful", 
            data: error.message
        })
    }
}



export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
    const {id} = req.params;

    const user = await userModel.findByIdAndDelete(id)

    return res.status(201).json({
        message: "deleted now!",
        data: user
    })
    } catch (error: any ) {
        return res.status(201).json({
            message: "unsuccessful", 
            data: error.message
        })
    }
}