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
  posts,
  media,
  removeMedia,
  singlePost,
  removePost
} = require('../controllers/post');

// CRUD
// images
router.post('/upload-image', requireSignin, isAdmin, uploadImage);
router.post(
  '/upload-image-file',
  formidable(),
  requireSignin,
  isAdmin,
  uploadImageFile
);

// posts
router.post('/create-post', requireSignin, isAdmin, createPost);
router.get('/posts', posts);
router.get('/post/:slug', singlePost);
router.delete('/post/:postId', requireSignin, isAdmin, removePost);

// media
router.get('/media', requireSignin, isAdmin, media);
router.delete('/media/:id', requireSignin, isAdmin, removeMedia);

export default router;
