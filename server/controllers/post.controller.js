import User from '../models/user.model';
import Post from '../models/post.model';
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

export default {listNewsFeed, listPostsByUser, create, photo, postById};