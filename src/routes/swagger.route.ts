import { Router } from "express";
import swagger from 'swagger-ui-express';
import swaggerDoc from '../openapi.json';
import router from "./auth.route";

router.use('/api-docs', swagger.serve);
router.get('/api-docs', swagger.setup(swaggerDoc));

export default router;