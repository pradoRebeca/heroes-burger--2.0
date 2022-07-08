import Product from "../schemas/Product";
import { objectResponse } from "../utils/utils";

class ProductService {
  public async createProduct(obj: object): Promise<objectResponse> {
    return await Product.create(obj)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }

  public async findAllProducts(): Promise<objectResponse> {
    return await Product.find()
      .populate("category")
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }

  public async findOneProducts(id: string): Promise<objectResponse> {
    const idProduct = { _id: id };

    return await Product.find(idProduct)
      .populate("category")
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }

  public async deleteProduct(id: string): Promise<objectResponse> {
    const idProduct = { _id: id };

    return await Product.deleteOne(idProduct)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }

  public async updateProduct(
    id: string,
    data: object
  ): Promise<objectResponse> {
    const idProduct = { _id: id };

    return await Product.updateOne(idProduct, data)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }

  public async findPromotions(): Promise<objectResponse> {
    return await Product.find({ promotionalPercentage: { $exists: true } })
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }
}

export default new ProductService();
