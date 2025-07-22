import mongoose from 'mongoose';
import Post from '../model/post.js'
// const Post = require('../model/post');

const createPost = async (req,res)=>{
    try {
        let {title, snippet, content} = req.body;

        const image = {
            url: req.file.path,
            filename: req.file.filename
        }

        if (!title || !snippet || !content) {
            return res.status(404).json({message:"All fields are required"})
        }

        await Post.create({
            title,
            snippet, 
            content,
            author: req.user.id
        });

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const get1post = async (req, res) => {
    let { id } = req.params;
    const onePost = await Post.findById(id).populate('author', 'fullname email');
    if (!onePost) {
        return res.status(404).json({ message: "No post found" });
    }
    res.status(200).json({
        message: "Post fetched successfully",
        post: onePost
});}


const edit1Post = async (req, res) => {
    try {
        let {id} = req.params;

        let newData = req.body;

        if (!newData){
            return res.status(404).json({message:"All fields are required"})
        }

        let post = await Post.findByIdAndUpdate(id, newData, {new: true});
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json({ message: "Post updated successfully", post });
        
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Delete post error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export {
    createPost,
    edit1Post,
    deletePost,
    get1post
}