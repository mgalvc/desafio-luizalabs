import { Request, Response } from 'express';
import AuthAction from '../actions/auth.action';
import NotFoundError from '../exceptions/not-found.error';

export default class UserController {
  constructor(
    private authAction = new AuthAction()
  ) {}
  
  async authenticate(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const response = await this.authAction.authenticate(username, password);
      return res.json(response);
    } catch (error) {
      if(error instanceof NotFoundError) {
        return res.status(401).json(error);
      }

      return res.sendStatus(500);
    }

  }
}