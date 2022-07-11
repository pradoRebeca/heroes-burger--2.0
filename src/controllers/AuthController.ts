import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../schemas/User";
import UserService from "../services/UserService";
// import { objectResponse } from "../utils/utils"

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

  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send({ message: "campos não preenchidos" });

    const { response, error } = await UserService.verifyUser(
      username,
      password
    );

    if (error) {
      return res
        .status(400)
        .send({ message: "não foi possivel fazer a autenticação" });
    }

    const lengthUser = response as Array<object>;
    if (lengthUser.length == 0) {
      return res.status(404).send({ message: "User not found" });
    }

    try {
      const { _id } = lengthUser[0] as UserType;

      const token = jwt.sign({ id: _id }, "private", {
        expiresIn: '1d',
      });

      return res.status(200).send({ token });
    } catch (error) {
      console.log("catch =>", error);
      return res
        .status(400)
        .send({ message: "Não foi possivel gerar o token" });
    }
  }
}

export default new AuthController();
