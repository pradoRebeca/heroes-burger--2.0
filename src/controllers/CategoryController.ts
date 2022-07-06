import { Response, Request } from "express";

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    return res.send({ message: "rota ok" });
  }
}

export default new CategoryController();
