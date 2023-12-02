import mongoose from "mongoose"

// const Url = "mongodb://0.0.0.0:27017/dbs"
// const Url = "mongodb://0.0.0.1:27017/ACB"
// const Url = "mongodb+srv://josephine:josephine@cluster0.sbaqntf.mongodb.net/giftBD?retryWr`ites=true&w=major`ity" //
const Url =  "mongodb+srv://josephine:josephine@cluster0.v1d2dga.mongodb.net/chatBE?retryWrites=true&w=majority";

export const dataBase = () => {
    mongoose.connect(Url).then(() => {
        console.log("Database is now connected")
    })
}

