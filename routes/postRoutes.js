import e from "express";
import { createPost, get1post, deletePost,  } from "../controller/postController.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post('/', authorize(["Admin","User"]), createPost);

router.get('/:id', get1post)

// router.get('/', getAllPost)

router.get('/:id', deletePost)




export default router
