import Comment from '../model/comment.js'

const createComment = async(req,res)=>{
     try {
        let {content} = req.body;

        if (!content) {
            return res.status(404).json({message:"All fields are required"})
        }

        await Comment.create({
            content
        })

        res.status(201).json({ message: "comment successful" });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createComment, getAllComments, deleteComment }