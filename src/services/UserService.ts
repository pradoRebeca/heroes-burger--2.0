import User, { UserType } from "../schemas/User";
import { objectResponse } from "../utils/utils";
import { isObjectIdOrHexString, ObjectId, ObjectIdExpression} from "mongoose";

class UserService {
  public async createUser(obj: UserType): Promise<objectResponse> {
    const createResponse = await User.create(obj)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));

    return createResponse;
  }

  public async findUser(
    id: string,
    username?: string
  ): Promise<objectResponse> {
  
    const findQuery = { $or: [{ _id: id }, { username }] };
    const findResponse = await User.find(findQuery)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));
    return findResponse;
  }

  public async deleteUser(id: string): Promise<objectResponse> {
    const query = {_id: id}
    const deleteResponse = await User.deleteOne(query)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));
    return deleteResponse;
  }

  public async updateUser(obj: UserType, id: string): Promise<objectResponse> {
    const filter = {_id: id}
    const update = obj;

    const updateResponse = await User.updateOne(filter, update)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: error, response: error }));

    return updateResponse;
  }

  public async verifyUser(
    username: string,
    password: string
  ): Promise<objectResponse> {
    const query = { username, password };

    return await User.find(query)
      .then((result) => ({ response: result }))
      .catch((error) => ({ error: true, response: error }));
  }
}

export default new UserService();
