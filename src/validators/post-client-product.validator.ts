import { body } from "express-validator";

export default [
  body('productId').notEmpty()
];