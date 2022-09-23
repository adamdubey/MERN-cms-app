import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

// middleware
import {
  requireSignin,
  isAdmin,
  canCreateRead,
  canUpdateDeletePost,
  canDeleteMedia,
  canUpdateDeleteComment
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
  postsForAdmin,
  createComment,
  comments,
  commentCount,
  removeComment,
  updateComment,
  userComments,
  getNumbers
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

// comment
router.post('/comment/:postId', requireSignin, createComment);
router.get('/comments/:page', requireSignin, isAdmin, comments);
router.get('/user-comments/', requireSignin, userComments);
router.get('/comment-count', commentCount);
router.delete(
  '/comment/:commentId',
  requireSignin,
  canUpdateDeleteComment,
  removeComment
);
router.put(
  '/comment/:commentId',
  requireSignin,
  canUpdateDeleteComment,
  updateComment
);

// numbers (statistics on dashboard)
router.get('/numbers', requireSignin, getNumbers);

export default router;
