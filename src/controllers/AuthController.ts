import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../schemas/User";
import UserService from "../services/UserService";
import { objectResponse } from "../utils/utils";

class AuthController {
  public async jsonWebToken(username: string): Promise<objectResponse> {
    const SECRET = "private";

    try {
      const token = "abc";
      jwt.sign({ username: username }, SECRET, {
        expiresIn: 200,
      });

      return { response: token };
    } catch (error) {
      return { error: true, response: error };
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
      console.log();
      return res
        .status(400)
        .send({ message: "não foi possivel fazer a autenticação" });
    }

    // const token = await this.jsonWebToken(username);
    // console.log(token);
    // if (token.error)
    //   return res
    //     .status(400)
    //     .send({ message: "não foi possivel fazer o token" });

    const lengthUser = response as Array<object>;

    if (lengthUser.length == 0) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200);
  }
}

export default new AuthController();
