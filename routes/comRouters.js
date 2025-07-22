import e from "express";
import { createComment, del1Comment, get1comment, getAllComments, update1Comment } from "../controller/comController.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post("/:postId", authorize(["Admin", "User"]) ,createComment);

router.get("/comments", getAllComments);
router.get("/:id", get1comment);
router.delete("/:id", del1Comment);
router.put("/:id", update1Comment);

export default router;