import User, { UserType } from "../../schemas/User";
import { objectResponse } from "../../utils/utils";

class UserService {
  public async createUser(obj: UserType): Promise<objectResponse> {
    const createResponse = await User.create(obj)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));

    return createResponse;
  }

  public async findUser(username: string): Promise<objectResponse> {
    const findResponse = await User.find({ username })
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));
    return findResponse;
  }

  public async deleteUser(name: string): Promise<objectResponse> {
    const deleteResponse = await User.deleteOne({ name })
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));
    return deleteResponse;
  }

  public async updateUser(obj: UserType): Promise<objectResponse> {
    const { name } = obj;

    const filter = { name: name };
    const update = obj;

    const updateResponse = await User.updateOne(filter, update)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));

    return updateResponse;
  }
}

export default new UserService();
