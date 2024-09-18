import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

import {verifyToken} from "../middleware/auth.js";

const router = express.Router(); //initialize router

/* READ */
router.get("/:id", verifyToken, getUser); //query string that grabs user id
router.get("/:id/friends", verifyToken, getUserFriends); 

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //add or remove friend

export default router;