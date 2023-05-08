import express  from "express";
import authController from "../controllers/auth.controller";
import aiController from "../controllers/ai.controller";

const router = express.Router();

router.route('/api/ai/cohere')
    .post(authController.requireSignin, aiController.text)

export default router;