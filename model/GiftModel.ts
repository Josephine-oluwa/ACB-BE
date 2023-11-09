import mongoose from "mongoose"

interface iGift{
    giftName: string,
    giftPrice: number,
    giftDescription: string,
    userID: string,
    user: {},
    purchased: boolean,
    giftID: string;
    gift: String;
}

interface giftData extends iGift, mongoose.Document{}

const giftModel = new mongoose.Schema<giftData>(
   {
    giftName: {
        type: String,
        required: true
    },
    giftPrice: {
        type: Number,
    },
    giftDescription: {
        type: String
    },
    userID: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "gift-users"
    },
    purchased: {
        type: Boolean,
        default: false
    },
    giftID: {
        type: String,

    },
    gift: String
   }
)

export default mongoose.model<giftData>("gift", giftModel)