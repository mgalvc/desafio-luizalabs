import { Request, Response } from 'express';
import AuthAction from '../actions/auth.action';
import RequestResponser from './responsers/request.responser';

export default class UserController {
  constructor(
    private authAction = new AuthAction()
  ) {}
  
  async authenticate(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await this.authAction.authenticate(username, password);
      return RequestResponser.handleSuccess(res, result)
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }
}