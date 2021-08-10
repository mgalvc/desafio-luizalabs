import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import GeneralResponser from "./responsers/general.responser";

export default class UserAction {
  constructor(
    private userRepository = new UserRepository()
  ) {}

  async create(username: string, password: string, role: string) {
    await this.userRepository.add({ username, password, role });
    return GeneralResponser.successResponse();
  }

  async list() {
    const users = await this.userRepository.list();
    return GeneralResponser.successResponse(users);
  }

  async get(id: string) {
    const user = await this.userRepository.get(id);
    return GeneralResponser.successResponse(user);
  }

  async update(id: string, data: IUser) {
    await this.userRepository.update(id, data);
    return GeneralResponser.successResponse();
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
    return GeneralResponser.successResponse();
  }
}