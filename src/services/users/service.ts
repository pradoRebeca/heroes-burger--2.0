import User from '../../schemas/User'

class UserService {
  public async createUser(data: object): Promise<object> {
    const user = await User.create(data);
    console.log("--->", user);

    return user;
  }
}

export default new UserService();
