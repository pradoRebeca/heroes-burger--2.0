import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../schemas/User";
import { readFileSync } from "fs";
import UserService from "../services/UserService";

interface tokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class AuthController {
  public async verifyJWT(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const token = req.headers["x-access-token"] as string;
    try {
      const { id } = jwt.verify(token, "private") as tokenPayload;
      req.userId = id;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "Usuário não autenticado" });
    }
  }

  public jwt() {
    console.log("função chamada");
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const PRIVATE_KEY = readFileSync("./config/private.key").toString();

    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send({ message: "Campos não preenchidos" });

    const { response, error } = await UserService.verifyUser(
      username,
      password
    );

    if (error) {
      return res
        .status(400)
        .send({ message: "Não foi possivel fazer a autenticação" });
    }

    const lengthUser = response as Array<object>;
    if (lengthUser.length == 0) {
      return res.status(404).send({ message: "User not found" });
    }

    try {
      const { _id } = lengthUser[0] as UserType;

      const token = jwt.sign({ id: _id }, PRIVATE_KEY);

      return res.status(200).send({ token });
    } catch (error) {
      console.log("error =>", error);
      return res
        .status(400)
        .send({ message: "Não foi possivel gerar o token" });
    }
  }
}

export default new AuthController();
