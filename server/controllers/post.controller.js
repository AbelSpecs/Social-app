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

// const create = async (req, res) => {
//     const user = new User(req.body);
//     const post = new Post(req.body);
//     try {
//         await user.save();
//         return res.status(200).json({
//             message: 'Successfully signed up!'
//         });
//     } catch (error) {
//         return res.status(400).json({
//             error: errorHandler.getErrorMessage(error)
//         });
//     }    
// }

export default {listNewsFeed};