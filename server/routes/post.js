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
  postsByAuthor,
  postCount,
  postsForAdmin
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
router.get('/posts/:page', posts);
router.get('/post/:slug', singlePost);
router.get('/posts-for-admin', requireSignin, isAdmin, postsForAdmin);
router.get('/posts-by-author', requireSignin, postsByAuthor);
router.delete('/post/:postId', requireSignin, canUpdateDeletePost, removePost);
router.put('/edit-post/:postId', requireSignin, canUpdateDeletePost, editPost);
router.get('/post-count', postCount);

// media
router.get('/media', requireSignin, canCreateRead, media);
router.delete('/media/:id', requireSignin, canDeleteMedia, removeMedia);

export default router;
