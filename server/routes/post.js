import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from '../middlewares';

// controllers
const {
  uploadImage,
  uploadImageFile,
  createPost,
  posts
} = require('../controllers/post');

// CRUD
router.post('/upload-image', requireSignin, isAdmin, uploadImage);
router.post(
  '/upload-image-file',
  formidable(),
  requireSignin,
  isAdmin,
  uploadImageFile
);
router.post('/create-post', requireSignin, isAdmin, createPost);
router.get('/posts', posts);

export default router;
