import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import {
  requireSignin,
  isAdmin,
  canCreateRead,
  canUpdateDeletePost,
  canDeleteMedia
} from '../middlewares';

// controllers
const {
  uploadImage,
  uploadImageFile,
  createPost,
  posts,
  media,
  removeMedia,
  singlePost,
  removePost,
  editPost,
  postsByAuthor
} = require('../controllers/post');

// CRUD
// images
router.post('/upload-image', requireSignin, canCreateRead, uploadImage);
router.post(
  '/upload-image-file',
  formidable(),
  requireSignin,
  canCreateRead,
  uploadImageFile
);

// posts
router.post('/create-post', requireSignin, canCreateRead, createPost);
router.get('/posts', posts);
router.get('/post/:slug', singlePost);
router.get('/posts-by-author', requireSignin, postsByAuthor);
router.delete('/post/:postId', requireSignin, canUpdateDeletePost, removePost);
router.put('/edit-post/:postId', requireSignin, canUpdateDeletePost, editPost);

// media
router.get('/media', requireSignin, canCreateRead, media);
router.delete('/media/:id', requireSignin, canDeleteMedia, removeMedia);

export default router;
