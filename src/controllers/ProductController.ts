import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { buildErrorObject } from "../utils/utils";

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, promotionalPercentage, image, category } =
      req.body;

    if (!name || !description || !price)
      return res.status(400).send({ message: "Campos não preenchidos" });

    const product = {
      name,
      description,
      price,
      promotionalPercentage,
      image,
      category,
    };

    const { response, error } = await ProductService.createProduct(product);

    if (error) {
      console.log(response);
      return res
        .status(400)
        .send({ message: "não foi possível criar o produto" });
    }

    return res.status(201).send(response);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { response, error } = await ProductService.findAllProducts();

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível pegar todas os produtos"
    );

    return res.status(400).send(errorResponse);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;

    const { response, error } = await ProductService.findOneProducts(id);

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível pegar dados do produto"
    );

    return res.status(400).send(errorResponse);
  }
}

export default new ProductController();
