"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const giftModel = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
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
});
exports.default = mongoose_1.default.model("gift", giftModel);
