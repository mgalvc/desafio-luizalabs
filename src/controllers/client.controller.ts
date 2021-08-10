import { Request, Response } from "express";
import ClientAction from "../actions/client.action";
import RequestResponser from "./responsers/request.responser";

export default class ClientController {
  constructor(
    private clientAction = new ClientAction()
  ) {}

  async list(req: Request, res: Response) {
    try {
      const result = await this.clientAction.list();
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.clientAction.get(id);
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const result = await this.clientAction.create(name, email);
      return RequestResponser.handleSuccess(res, result, 201);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const result = await this.clientAction.update(id, { name, email });
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.clientAction.delete(id);
      return RequestResponser.handleSuccess(res, result);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }
}