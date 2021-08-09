import { Request, Response } from "express";
import ClientProductAction from "../actions/client-product.action";
import RequestResponser from "./responsers/request.responser";

export default class ClientProductController {
  constructor(
    private action = new ClientProductAction()
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const { clientId } = req.params;
      const result = await this.action.addToWishlist(clientId, productId);
      return RequestResponser.handleSuccess(res, result, 201);
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  } 

  async delete(req: Request, res: Response) {
    try {
      const { clientId, productId } = req.params;
      const result = await this.action.removeFromWishlist(clientId, productId);
      return RequestResponser.handleSuccess(res, result)
    } catch (error) {
      return RequestResponser.handleError(res, error);
    }
  }
}