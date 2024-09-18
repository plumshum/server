import express from "express.js";
import { getFeedPosts, getUserPosts, likePosts} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// grab user feed when on the homepage
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts)

/* UPDATE */
// like or unlike Posts
router.patch("/:id/like", verifyToken, likePosts);