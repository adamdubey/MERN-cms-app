import express from "express";

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";

// controllers
const {
    uploadImage,
    createPost,
    posts,
} = require("../controllers/post");

// CRUD
router.post("/upload-image", requireSignin, isAdmin, uploadImage);
router.post("/create-post", requireSignin, isAdmin, createPost);
router.get("/posts", posts);

export default router;