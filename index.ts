import express, {Application} from "express"

const app: Application = express()
const port: number = 5566

const server = app.listen(port, () => {
    // dbConfig();
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