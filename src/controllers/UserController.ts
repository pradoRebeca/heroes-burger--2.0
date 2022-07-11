import { Response, Request } from "express";
import UserService from "../services/UserService";
import { buildErrorObject } from "../utils/utils";

class UserController {
  public async find(req: Request, res: Response): Promise<Response> {
    const username = req.query.username as string;
    const id = req.userId;
    console.log("username =>", username, "id=>", id);
    const { response, error } = await UserService.findUser(id, username);
    console.log(response);
    if (!error) {
      const responseLength = response as Array<object>;

      if (responseLength.length > 0) {
        return res.status(200).send(response);
      }
      return res.status(404).send({ message: "Not Found" });
    }

    console.error(error);
    const errorResponse = buildErrorObject("Não foi possível  o usuário");
    return res.status(400).send(errorResponse);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, password, username } = req.body;

    if (!name || !password || !username) {
      const errorResponse = buildErrorObject("Campos invalidos");
      return res.status(400).send(errorResponse);
    }

    const { response, error } = await UserService.createUser({
      name,
      username,
      password,
    });

    if (!error) {
      return res.status(201).send(response);
    }

    console.error(error);
    const errorResponse = buildErrorObject("Não foi possível criar o usuário");
    return res.status(400).send(errorResponse);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;
    const { name } = req.body;

    if (!id) return res.status(401).send({ message: "sem id" });

    const { error } = await UserService.deleteUser(name);

    if (!error) {
      return res.status(200).send({ message: "Usuário deletado" });
    }

    console.error(error);
    const errorResponse = buildErrorObject(
      "Não foi possível deletar o usuário"
    );
    return res.status(400).send(errorResponse);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, username, password } = req.body;
    const id = req.headers["id"] as string;

    if (!id) return res.status(401).send({ message: "sem id" });

    const { response, error } = await UserService.updateUser({
      name,
      username,
      password,
    });

    if (!error) {
      return res.status(200).send(response);
    }

    console.error(error);
    const errorResponse = buildErrorObject(
      "Não foi possível atualizar os dados do usuário"
    );
    return res.status(400).send(errorResponse);
  }
}

export default new UserController();
