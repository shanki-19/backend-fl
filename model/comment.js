import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true
    },
    author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }

}, { timestamps: true});
const Comment = mongoose.model('comment',commentSchema);

export default Comment