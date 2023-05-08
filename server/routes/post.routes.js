import express  from "express";
import userCtrl from '../controllers/user.controller';
import authController from "../controllers/auth.controller";
import postController from "../controllers/post.controller";

const router = express.Router();


router.route('/api/posts/feed/:userId')
.get(authController.requireSignin, postController.listNewsFeed)

router.route('/api/posts/postsby/:userId')
.get(authController.requireSignin, postController.listPostsByUser)

router.route('/api/posts/new/:userId')
.post(authController.requireSignin, postController.create)

router.param('userId', userCtrl.userById);

router.route('/api/posts/photo/:postId')
    .get(postController.photo)

router.route('/api/posts/delete/:postId')
    .delete(authController.requireSignin, postController.remove)

router.param('postId', postController.postById);

router.route('/api/posts/like')
    .put(authController.requireSignin, postController.like)

router.route('/api/posts/dislike')
    .put(authController.requireSignin, postController.dislike)

router.route('/api/posts/comments')
    .put(authController.requireSignin, postController.comments)

router.route('/api/posts/deletecomment')
    .put(authController.requireSignin, postController.deleteComments)

router.route('/api/posts/createtrend')
    .post(authController.requireSignin, postController.createTrend)

router.route('/api/posts/listtrends')
    .get(authController.requireSignin, postController.listTrends)

export default router;