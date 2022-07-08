import Category from "../schemas/Category";
import { objectResponse } from "../utils/utils";

class CategoryService {
  public async createCategory(obj: object): Promise<objectResponse> {
    const responseCreate = await Category.create(obj)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));

    return responseCreate;
  }

  public async findCategory(): Promise<objectResponse> {
    const responseFind = await Category.find()
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));

    return responseFind;
  }

  public async deleteCategory(id: string): Promise<objectResponse> {
    const deleteToId = { _id: id };
    const responseDelete = await Category.deleteOne(deleteToId)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));

    return responseDelete;
  }

  public async updateCategory(
    id: string,
    name: string
  ): Promise<objectResponse> {
    const filter = { _id: id };
    const update = { name };

    const responseDelete = await Category.updateOne(filter, update)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));

    return responseDelete;
  }
}

export default new CategoryService();
