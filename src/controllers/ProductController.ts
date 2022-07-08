import { request, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { buildErrorObject } from "../utils/utils";

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, promotionalPercentage, image, category } =
      req.body;

    if (!name || !description || !price || !category)
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

  public async find(req: Request, res: Response): Promise<Response> {
    const id = req.query.id as string;

    if (id) {
      const { response, error } = await ProductService.findOneProducts(id);
      if (!error) return res.status(200).send(response);
      const errorResponse = buildErrorObject(
        "Não possível pegar dados do produto"
      );

      return res.status(400).send(errorResponse);
    }

    const { response, error } = await ProductService.findAllProducts();
    if (!error) return res.status(200).send(response);
    const errorResponse = buildErrorObject(
      "Não possível pegar todas os produtos"
    );
    return res.status(400).send(errorResponse);
  }

  public async findPromotions(req: Request, res: Response): Promise<Response> {
    const { response, error } = await ProductService.findPromotions();

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível pegar os produtos em promoções"
    );

    return res.status(400).send(errorResponse);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;

    const { response, error } = await ProductService.deleteProduct(id);

    if (!error) return res.status(200).send(response);

    const errorResponse = buildErrorObject(
      "Não possível deletar os dados do produto"
    );

    console.log("response service =>", response);
    return res.status(400).send(errorResponse);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.headers["id"] as string;
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

    const { response, error } = await ProductService.updateProduct(id, product);

    if (error) {
      console.log(response);
      return res
        .status(400)
        .send({ message: "não foi possível atualizar o produto" });
    }

    return res.status(200).send(response);
  }
}

export default new ProductController();
