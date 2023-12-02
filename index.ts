import express, {Application} from "express"
import { dataBase } from "./config/Db";
import { mainApp } from "./mainApp";

const app: Application = express()
const port: number = 5566
mainApp(app)

const server = app.listen(port, () => {
  dataBase();
  console.log("server is connected")
   
  });
  

process.on("uncaughtException", (error: Error) => {
    console.log(`uncaughtException: `, error);
   
  });
  
  process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
      process.exit(1);
    });
  });