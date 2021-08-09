import UserRepository from "../repositories/user.repository";
import { sign } from 'jsonwebtoken';
import configs from "../configs/configs";
import NotFoundError from "../exceptions/not-found.error";
import AuthResponser from "./responsers/auth.responser";

export default class AuthAction {
  public constructor(
    private userRepository = new UserRepository()
  ) {}

  async authenticate(username: string, sentPassword: string) {
    const { role, id, password } = await this.userRepository.get(username);

    if(password !== sentPassword) {
      throw new NotFoundError('Invalid credentials');
    }

    const token = sign(
      { role, id }, 
      configs.jwtSecret(), 
      { expiresIn: configs.jwtTtl() }
    );
    
    return AuthResponser.successResponse(token);
  }
}