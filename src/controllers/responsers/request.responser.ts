import { Response } from "express";
import BadRequestError from "../../exceptions/bad-request.error";
import NotFoundError from "../../exceptions/not-found.error";
import Logger from "../../utils/logger.util";

export default class RequestResponser {
  static handleSuccess(res: Response, data: any, status?: number) {
    Logger.info('[RequestResponser] - handleSuccess', { data });

    return res.status(status || 200).json(data);
  }

  static handleError(res: Response, err: Error) {
    Logger.error('[RequestResponser] - handleError', { error: err.stack });

    const status = this.getStatusFromError(err);
    const message = status == 500 ? 'Ocorreu um erro inesperado' : err.message;
    
    return res.status(status).json({ message });
  }

  private static getStatusFromError(err: Error) {
    if(err instanceof NotFoundError) {
      return 404;
    }

    if(err instanceof BadRequestError) {
      return 400;
    }

    return 500
  }
}