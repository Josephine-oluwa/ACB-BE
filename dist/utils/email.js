"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLastMail = exports.sendInitialMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GOOGLE_ID = "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const url = "http://localhost:5566";
const sendInitialMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id }, "josephine");
        const passedData = {
            userName: user === null || user === void 0 ? void 0 : user.userName,
            email: user === null || user === void 0 ? void 0 : user.email,
            otp: user === null || user === void 0 ? void 0 : user.otp,
            // url: `https://giftacb-pro.web.app/register/${token}/first-process`,
            url: `${url}/${token}/first-process`,
        };
        const findFile = path_1.default.join(__dirname, "../views/firstMail.ejs");
        const readFile = yield ejs_1.default.renderFile(findFile, passedData);
        const mailer = {
            from: "GiftACB <codelabbest@gmail.com>",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: `OTP Grant`,
            html: readFile,
        };
        transporter.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendInitialMail = sendInitialMail;
const sendLastMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id }, "josephine");
        const passedData = {
            userName: user === null || user === void 0 ? void 0 : user.userName,
            email: user === null || user === void 0 ? void 0 : user.email,
            otp: user === null || user === void 0 ? void 0 : user.otp,
            url: `${url}/${token}/first-process`,
        };
        const findFile = path_1.default.join(__dirname, "../views/LastMail.ejs");
        const readFile = yield ejs_1.default.renderFile(findFile, passedData);
        const mailer = {
            from: "GiftACB <codelabbest@gmail.com>",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: `Verification Grant`,
            html: readFile,
        };
        transporter.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendLastMail = sendLastMail;
