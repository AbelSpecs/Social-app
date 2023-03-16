import express  from "express";
import userCtrl from '../controllers/user.controller';
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/defaultphoto')
    .get(userCtrl.defaultPhoto)    

router.route('/api/users/:userId')
    .get(authController.requireSignin, userCtrl.read)
    .put(authController.requireSignin, authController.hasAuthorization, userCtrl.update)
    .delete(authController.requireSignin, authController.hasAuthorization, userCtrl.remove)

router.route('/api/users/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)

router.param('userId', userCtrl.userById);

export default router;