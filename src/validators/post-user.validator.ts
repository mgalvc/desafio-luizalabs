import { body } from "express-validator";

export default [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('role').isString().notEmpty()
];