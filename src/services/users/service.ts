import User from "../../schemas/User";
import { objectError, buildErrorObject } from "../../utils/utils";

class UserService{
  public async createUser(data: object): Promise<objectError | object> {
    const errorResponse = buildErrorObject("Não foi possível criar o usuário");
    const createResponse = await User.create(data)
      .then((result) => result)
      .catch((error) => errorResponse);

    return createResponse;
  }

  public async findUser(name: string): Promise<object | objectError> {
    const errorResponse = buildErrorObject("Não foi possível pegar os dados");
    const findResponse = await User.find({ name })
      .then((result) => result)
      .catch((error) => errorResponse);
    return findResponse;
  }

  public async deleteUser(name: string): Promise<object | objectError> {
    const errorResponse = buildErrorObject("Não foi possível deletar usuário");
    const deleteResponse = await User.deleteOne({ name })
      .then((result) => result)
      .catch((error) => errorResponse);
    return deleteResponse;
  }
}

export default new UserService();
