import { Request, Response } from "express";
import UserAction from "../actions/user.action";
import RequestResponser from "./responsers/request.responser";

export default class UserController {
  constructor(
    private userAction = new UserAction()
  ) {}

  async list(req: Request, res: Response) {
    try {
      const result = await this.userAction.list();
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.userAction.get(id);
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, password, role } = req.body;
      const result = await this.userAction.create(username, password, role);
      return RequestResponser.handleSuccess(res, result, 201);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, password, role } = req.body;
      const result = await this.userAction.update(id, { username, password, role });
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.userAction.delete(id);
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }
}