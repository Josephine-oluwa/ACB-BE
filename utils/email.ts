import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";
import jwt from "jsonwebtoken";


const GOOGLE_ID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN});

const url:string = "http://localhost:5566";

export const sendInitialMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;


    const transporter = nodemailer.createTransport({
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

    const token = jwt.sign({ id: user?._id }, "josephine");

    const passedData = {
      userName: user?.userName,
      email: user?.email,
      otp: user?.otp,
      // url: `https://giftacb-pro.web.app/register/${token}/first-process`,
      url: `${url}/${token}/first-process`,
    };

    const findFile = path.join(__dirname, "../views/firstMail.ejs");
    const readFile = await ejs.renderFile(findFile, passedData);

    const mailer = {
      from: "GiftACB <codelabbest@gmail.com>",
      to: user?.email,
      subject: `OTP Grant`,
      html: readFile,
    };

    transporter.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};

export const sendLastMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transporter = nodemailer.createTransport({
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

    const token = jwt.sign({ id: user?._id },"josephine");

    const passedData = {
      userName: user?.userName,
      email: user?.email,
      otp: user?.otp,
      url: `${url}/${token}/first-process`,
    };

    const findFile = path.join(__dirname, "../views/LastMail.ejs");
    const readFile = await ejs.renderFile(findFile, passedData);

    const mailer = {
      from: "GiftACB <codelabbest@gmail.com>",
      to: user?.email,
      subject: `Verification Grant`,
      html: readFile,
    };

    transporter.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};
