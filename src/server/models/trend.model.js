import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: 'Text is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    posts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}]
});


export default mongoose.model('Trend', TrendSchema);

