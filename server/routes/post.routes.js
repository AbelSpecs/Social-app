import express  from "express";
import userCtrl from '../controllers/user.controller';
import authController from "../controllers/auth.controller";
import postController from "../controllers/post.controller";

const router = express.Router();

router.route('/api/posts/feed/:userId')
    .get(authController.requireSignin, postController.listNewsFeed)

router.route('/api/posts/postsby/:userId')
    .get(authController.requireSignin, postController.listPostsByUser)

router.route('/apit/posts/new/:userId')
    .post(authController.requireSignin, postController.create)

router.route('/api/posts/delete/:postId')
    .delete(authController.requireSignin, postController.delete)

router.route('/api/posts/like')
    .put(authController.requireSignin, postController.like)

router.route('/api/posts/dislike')
    .put(authController.requireSignin, postController.dislike)

router.route('/api/posts/photo/:postId')
    .get(postController.photo)

router.param('postId', postController.postById);

export default router;