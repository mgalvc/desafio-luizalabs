import { Response } from "express";
import NotFoundError from "../../exceptions/not-found.error";

export default class RequestResponser {
  static handleSuccess(res: Response, data: any, status?: number) {
    return res.status(status || 200).json(data);
  }

  static handleError(res: Response, err: Error) {
    if(err instanceof NotFoundError) {
      return res.status(401).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Um erro interno ocorreu' });
  }
}