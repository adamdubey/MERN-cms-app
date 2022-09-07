import express from "express";

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";

// controllers
const {
    uploadImage
} = require("../controllers/post");

// CRUD
router.post("/upload-image", requireSignin, isAdmin, uploadImage);

export default router;