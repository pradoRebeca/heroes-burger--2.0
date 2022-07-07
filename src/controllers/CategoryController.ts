import { Response, Request } from "express";
import CategoryService from "../services/CategoryService";
import { buildErrorObject } from "../utils/utils";

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Campos obrigatórios" });
    }

    const { response, error } = await CategoryService.createCategory({ name });

    if (!error) return res.status(201).send(response);

    const errorResponse = buildErrorObject("Não possível criar a categoria");

    return res.status(400).send(errorResponse);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;

    if (!id) {
      return res.status(401).send({ message: "sem id" });
    }

    const { response, error } = await CategoryService.findCategory();

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível pegar todas as categorias"
    );

    return res.status(400).send(errorResponse);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;

    if (!id) {
      return res.status(401).send({ message: "sem id" });
    }

    const { response, error } = await CategoryService.deleteCategory(id);

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject("Não possível deletar a categoria");

    return res.status(400).send(errorResponse);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;

    if (!id) {
      return res.status(401).send({ message: "sem id" });
    }

    const { name } = req.body;
    const { response, error } = await CategoryService.updateCategory(id, name);

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível atualizar essa categoria"
    );

    return res.status(400).send(errorResponse);
  }
}

export default new CategoryController();
