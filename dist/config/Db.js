"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// const Url = "mongodb://0.0.0.0:27017/dbs"
// const Url = "mongodb://0.0.0.1:27017/ACB"
// const Url = "mongodb+srv://josephine:josephine@cluster0.sbaqntf.mongodb.net/giftBD?retryWr`ites=true&w=major`ity" //
const Url = "mongodb+srv://josephine:josephine@cluster0.v1d2dga.mongodb.net/chatBE?retryWrites=true&w=majority";
const dataBase = () => {
    mongoose_1.default.connect(Url).then(() => {
        console.log("Database is now connected");
    });
};
exports.dataBase = dataBase;
