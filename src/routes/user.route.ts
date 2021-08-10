import { Router } from "express";
import UserController from "../controllers/user.controller";
import authorize from "../middlewares/authorize.middleware";
import validateMiddleware from "../middlewares/validate.middleware";
import postUserValidator from "../validators/post-user.validator";

const router = Router();

const userController = new UserController();

router.post(
  '/user',
  authorize(['admin']),
  postUserValidator,
  validateMiddleware,
  userController.create.bind(userController)
);

router.get(
  '/user',
  authorize(['admin']),
  userController.list.bind(userController)
);

router.get(
  '/user/:id',
  authorize(['admin']),
  userController.get.bind(userController)
);

router.put(
  '/user/:id',
  authorize(['admin']),
  postUserValidator,
  validateMiddleware,
  userController.update.bind(userController)
);

router.delete(
  '/user/:id',
  authorize(['admin']),
  userController.delete.bind(userController)
);

export default router;