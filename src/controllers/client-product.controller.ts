import { Request, Response } from "express";
import ClientProductAction from "../actions/client-product.action";

export default class ClientProductController {
  constructor(
    private action = new ClientProductAction()
  ) {}

  async create(req: Request, res: Response) {
    const { productId } = req.body;
    const { clientId } = req.params;
    const response = await this.action.addToWishlist(clientId, productId);
    return res.status(201).json(response);
  } 

  async delete(req: Request, res: Response) {
    const { clientId, productId } = req.params;
    const response = await this.action.removeFromWishlist(clientId, productId);
    return res.status(200).json(response);
  }
}