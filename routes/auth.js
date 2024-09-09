import express from "express";
import {login} from "../controllers/auth.js";

//initialize router
const router = express.Router();

router.post("/login", login);


export default router;