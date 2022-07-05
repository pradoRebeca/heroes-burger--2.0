import { Response, Request } from "express";
import UserService from '../services/users/service'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, firstName, lastName } = req.body;

    if (email == "" || firstName == "" || lastName == "") {
      return res.status(400).send({ message: "Vai dar para criar o user não" });
    }

    UserService.create({ email, firstName, lastName });
    return res.status(201).send({ data: user });
  }
}

export default new UserController();
