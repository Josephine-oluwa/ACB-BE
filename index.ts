import express, {Application} from "express"
import { dataBase } from "./config/Db";
import { mainApp } from "./mainApp";

const app: Application = express()
const port: number = 5566
mainApp(app)

const server = app.listen(port, () => {
  console.log("server is connected")
    dataBase();
  });
  

process.on("uncaughtException", (error: Error) => {
    console.log(`uncaughtException: `, error);
    process.exit(1);
  });
  
  process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
      process.exit(1);
    });
  });