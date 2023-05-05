import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import backgroundImage from '../../client/assets/images/cherryblossom.png';

const create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const userCreated = await user.save();
        await User.findByIdAndUpdate(userCreated._id,
            {$push: {following: userCreated._id}});
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }    
}

const list = async (req, res) => {
    try {
        const users = await User.find().select('name email created updated');
        console.log(users);
        res.json(users);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

const update = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Photo Could not be uploaded'
            });
        }
        let user = req.profile;
        user = extend(user, fields);
        user.updated = Date.now();
        if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.filepath);
            user.photo.ContentType = files.photo.type;
        }
        if(files.background){
            user.background.data = fs.readFileSync(files.background.filepath);
            user.background.ContentType = files.background.type;
        }
        try {
            await user.save();
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        } catch (error) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });
        }
    });
}

const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        return res.json(deletedUser);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .select('following followers')
        .exec()
        if(!user){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });  
        }
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const userCompleteById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec()
        if(!user){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });  
        }
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const usersByName = async (req, res, next, name) => {
    try {
        const users = await User.find({name: {$regex: name}})
                                .select('name email created updated')
                                .populate('following', '_id name')
                                .populate('followers', '_id name')
                                .exec()
        if(!users){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error)
            });
        }
        res.json(users);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const photo = (req, res, next) => {
    if(req.profile.photo.data){
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next();
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + profileImage)
}

const background = (req, res, next) => {
    if(req.profile.background.data){
        res.set("Content-Type", req.profile.background.contentType)
        return res.send(req.profile.background.data)
    }
    next();
}

const defaultBackground = (req, res) => {
    return res.sendFile(process.cwd() + backgroundImage)
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            {$push: {following: req.body.followId}})
        next();
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const addFollower = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.body.followId, 
            {$push : { followers: req.body.userId }},
            {new: true})
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
            result.hashed_password = undefined;
            result.salt = undefined;
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, 
            {$pull: {following: req.body.followId}})
        next();
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const removeFollower = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.body.followId,
            {$pull: {followers: req.body.userId}},
            {new: true})
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const findPeople = async (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    try {
        const users = await User.find({_id: {$nin: following}})
                                    .select('name')
        res.json(users);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

const listFollowers = async (req, res) => {
    let userId = req.profile._id;
    try {
        const users = await User.find({following: {$in: userId}})
                                .select('name photo')
                                .limit(5);
        res.json(users);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}

export default { 
    create, 
    list, 
    read, 
    update, 
    remove, 
    userById, 
    photo, 
    defaultPhoto, 
    addFollower, 
    addFollowing, 
    removeFollower, 
    removeFollowing,
    findPeople,
    usersByName,
    listFollowers,
    background,
    defaultBackground,
    userCompleteById 
};
