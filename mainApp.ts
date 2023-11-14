import express, {Application, Response, Request} from "express"
import cors from "cors"
import user from "./router/userRouter"
import gift from "./router/giftRouter"
import helmet from "helmet"
import morgan from "morgan"
import { AnyObject } from "mongoose"


export const mainApp = (app: Application) => {
app.use(express())
app.use(cors()).use(helmet()).use(morgan("dev")),

app.use("/api", user)
app.use("/api", gift)

app.get("/", (req: Request, res: Response) => {
    try {
        return res.status(201).json({
            message: "found the default Api"
        })
    } catch (error: any) {
        return res.status(404).json({
            message: "cannot find default Api",
            data: error.message
        })
    }
})


}