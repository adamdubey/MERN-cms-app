import express from "express";

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";

// controllers
const {
  create,
} = require("../controllers/category");

router.post("/category", requireSignin, isAdmin, create);

export default router;