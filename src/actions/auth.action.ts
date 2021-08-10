import UserRepository from "../repositories/user.repository";
import { sign } from 'jsonwebtoken';
import configs from "../configs/configs";
import BadRequestError from "../exceptions/bad-request.error";
import AuthResponser from "./responsers/auth.responser";
import NotFoundError from "../exceptions/not-found.error";

export default class AuthAction {
  public constructor(
    private userRepository = new UserRepository()
  ) {}

  async authenticate(username: string, sentPassword: string) {
    try {
      const { password, role } = await this.userRepository.get(username, true);
  
      if(password !== sentPassword) {
        throw new BadRequestError('Credenciais inválidas');
      }
  
      const token = sign(
        { role, username }, 
        configs.jwtSecret(), 
        { expiresIn: configs.jwtTtl() }
      );
      
      return AuthResponser.successResponse(token);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestError('Credenciais inválidas');
      }

      throw error;
    }
  }
}