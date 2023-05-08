import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    about: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Plase fill a valid email'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    photo: {
        data: Buffer,
        contentType: String
    },
    background: {
        data: Buffer,
        contentType: String
    },
    following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]

});

// need to change virtual to pre .save

UserSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password, this.salt);
    })

    .get(function() {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText, this.salt) === this.hashed_password;
    },

    encryptPassword: function(password, salt) {
        if(!password) 
        {
            return '';

        }
        try {
            // need to change crypto to crypto-js
            const cr = crypto.createHmac('sha1', salt) 
                        .update(password)
                        .digest('hex')

            return cr;
        } catch (error) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random()));
    }
}

UserSchema.path('hashed_password').validate(function (v) {
    if(this._password && this._password.lenght < 6) {
        this.invalidate('password', 'Password must be at least 6 characters');
    }

    if(this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

export default mongoose.model('User', UserSchema);

