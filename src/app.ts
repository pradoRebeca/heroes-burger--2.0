import express, { application } from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import routes from "./routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares()
    this.database()
    this.listen()
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private listen(): void{
    this.express.listen(process.env.PORT, () =>
      console.log(`Server ativo na porta ${process.env.PORT}`)
    );
  }

  private database(): void {
    mongoose
      .connect("mongodb://db:27017/database")
      .then((result) => {
        console.log("MongoDB Conectado ");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public routes(): void{
    this.express.use(routes)
  }
}

export default new App