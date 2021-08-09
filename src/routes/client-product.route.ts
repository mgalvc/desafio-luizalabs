import { Router } from "express";
import ClientProductController from "../controllers/client-product.controller";
import authorize from "../middlewares/authorize.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import postClientProductValidator from "../validators/post-client-product.validator";

const router = Router();

const clientProductController = new ClientProductController();

router.post(
  '/client/:clientId/product',
  authorize(['admin']),
  postClientProductValidator,
  validateMiddleware,
  clientProductController.create.bind(clientProductController)
)

router.delete(
  '/client/:clientId/product/:productId',
  authorize(['admin']),
  clientProductController.delete.bind(clientProductController)
)

export default router;