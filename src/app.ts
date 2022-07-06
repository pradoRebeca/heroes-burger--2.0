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
    const port = process.env.PORT || 5006
    this.express.listen(port, () =>
      console.log(`Server ativo na porta ${port}`)
    );
  }

  private database(): void {
    const stringConnection = process.env.CONNECTION_DB || "mongodb://localhost:27017/database"
    console.log('stringConnection =>',stringConnection)

    mongoose
      .connect(stringConnection)
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