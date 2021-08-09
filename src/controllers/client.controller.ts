import { Request, Response } from "express";
import ClientAction from "../actions/client.action";

export default class ClientController {
  constructor(
    private clientAction = new ClientAction()
  ) {}

  async list(req: Request, res: Response) {
    const clients = await this.clientAction.list();
    return res.json(clients);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const client = await this.clientAction.get(id);
    return res.json(client)
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    try {
      const result = await this.clientAction.create(name, email);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const result = await this.clientAction.update(id, { name, email });
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.clientAction.delete(id);
    return res.status(200).json(result);
  }
}