import { Router } from "express";
import ClientController from "../controllers/client.controller";
import authorize from "../middlewares/authorize.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import postClientValidator from "../validators/post-client.validator";

const router = Router();

const clientController = new ClientController();

router.post(
  '/client',
  authorize(['admin']),
  postClientValidator,
  validateMiddleware,
  clientController.create.bind(clientController)
);

router.get(
  '/client',
  authorize(['admin', 'guest']),
  clientController.list.bind(clientController)
);

router.get(
  '/client/:id',
  authorize(['admin', 'guest']),
  clientController.get.bind(clientController)
);

router.put(
  '/client/:id',
  authorize(['admin']),
  postClientValidator,
  validateMiddleware,
  clientController.update.bind(clientController)
);

router.delete(
  '/client/:id',
  authorize(['admin']),
  clientController.delete.bind(clientController)
);

export default router;