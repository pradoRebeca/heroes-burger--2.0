import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";
import { objectResponse } from "../utils/utils";

class AuthController {
  private jsonWebToken(username: string): objectResponse {
    const SECRET = "private";

    try {
      const token = "abc";
      //   jwt.sign({ username: username }, SECRET, {
      //     expiresIn: 200,
      //   });
      console.log(token);
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
      console.log(response);
      return res
        .status(400)
        .send({ message: "não foi possivel fazer a autenticação" });
    }

    const token = this.jsonWebToken(username);
    console.log(token);
    if (token.error)
      return res
        .status(400)
        .send({ message: "não foi possivel fazer o token" });

    return res.status(200).send(token.response);
  }
}

export default new AuthController();
