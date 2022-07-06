import Category from "../schemas/Category";
import { buildErrorObject, objectError } from "../utils/utils";

class CategoryService {
  public async createCategory(obj: object): Promise<object | objectError> {
    const errorResponse = buildErrorObject("Não foi possível criar categoria");

    const responseCreate = await Category.create(obj)
      .then((result) => result)
      .catch((error) => errorResponse);

    return responseCreate;
  }
}

export default CategoryService;
