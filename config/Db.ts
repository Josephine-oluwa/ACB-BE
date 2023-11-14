import mongoose from "mongoose"

// const Url = "mongodb://0.0.0.0:27017/dbs"
const Url = "mongodb://0.0.0.0:27017/ACB"

export const dataBase = () => {
    mongoose.connect(Url).then(() => {
        console.log("Database is now connected")
    })
}