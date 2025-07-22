import mongoose from "mongoose";
// import authorize from "../middlewares/authorize";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    snippet: {
        type: String,
        require: true, 
    },
    content: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        filename: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);
export default Post