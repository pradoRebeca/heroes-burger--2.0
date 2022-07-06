import { Response, Request } from "express";
import UserService from "../services/users/service";
import { buildErrorObject, existErrorObject } from "../utils/utils";

class UserController {
  public async find(req: Request, res: Response): Promise<Response> {
    // const {name} = req.query
    const name = "prado";
    const responseService = await UserService.findUser(name);

    if (!existErrorObject(responseService)) {
      console.info(responseService);
      return res.status(200).send(responseService);
    }

    console.error(responseService);
    return res.status(400).send(responseService);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;

    if (!name || !password) {
      const errorResponse = buildErrorObject("Campos invalidos");
      return res.status(400).send(errorResponse);
    }

    const responseService = await UserService.createUser({
      name,
      password,
    });

    if (!existErrorObject(responseService)) {
      console.info(responseService);
      return res.status(201).send(responseService);
    }

    console.error(responseService);
    return res.status(400).send(responseService);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const responseService = await UserService.deleteUser(name);

    if (!existErrorObject(responseService)) {
      return res.status(200).send(responseService);
    }

    return res.status(200).send(responseService);
  }
}

export default new UserController();
