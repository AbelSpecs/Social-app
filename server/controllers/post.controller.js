import User from '../models/user.model';
import Post from '../models/post.model';
import Trend from '../models/trend.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';

const listNewsFeed = async(req, res) => {
    const following = req.profile.followers;
    following.push(req.profile._id);
    try {
        const posts = await Post.find({ postedBy: {$in: following}})
                                .populate('comments.postedBy', '_id name')
                                .populate('postedBy', '_id name')
                                .sort('-created')
                                .exec()
        res.json(posts);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const listPostsByUser = async(req, res) => {
    console.log(req.profile);
    const userId = req.profile._id;
    try {
        const posts = await Post.find({ postedBy: {$in: userId}})
                                .populate('comments.postedBy', '_id name')
                                .populate('postedBy', '_id name')
                                .sort('-created')
                                .exec()
        res.json(posts);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const create = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });
        }
        let post = new Post(fields);
        post.postedBy = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.filepath);
            post.photo.contentType = files.photo.type;
        }
        try {
            await post.save();
            res.json(post);
        } catch (error) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });
        }   
    });
}

const remove = async (req, res) => {
    try {
        let post = req.post;
        let deletedPost = await post.remove();
        return res.json(deletedPost);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const photo = (req, res) => {
    if(req.post.photo.data){
        res.set("Content-Type", req.post.photo.contentType);
        return res.send(req.post.photo.data);    
    }
    return;
}

const postById = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id)
        .populate('postedBy', '_id name')
        .exec();
        if(!post){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });  
        }
        req.post = post;
        next();
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const like = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    try {
        const result = await Post.findByIdAndUpdate(postId, 
            {$push: {likes: userId}},
            {new: true});
        return res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const dislike = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    try {
        const result = await Post.findByIdAndUpdate(postId, 
            {$pull: {likes: userId}},
            {new: true});
        return res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const comments = async (req, res) => {
    let postId = req.body.postId;
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    try {
        const result = await Post.findByIdAndUpdate(postId, 
            {$push: {comments: comment}},
            {new: true})
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        return res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const deleteComments = async (req, res) => {
    let postId = req.body.postId;
    let comment = req.body.comment;
    try {
        const result = await Post.findByIdAndUpdate(postId, 
            {$pull: {comments: {_id: comment._id}}},
            {new: true})
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        return res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const createTrend = async (req, res) => {
    const trend = new Trend(req.body);
    try {
        await trend.save();
        return res.status(200).json({
            message: 'Trend Created'
        });
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const listTrends = async (req, res) => {
    try {
        const trends = await Trend.find();
        res.json(trends);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

export default {
    listNewsFeed, 
    listPostsByUser, 
    create, 
    photo, 
    postById, 
    remove, 
    like, 
    dislike, 
    comments,
    deleteComments,
    createTrend,
    listTrends
};