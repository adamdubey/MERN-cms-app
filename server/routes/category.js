import express from 'express';

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from '../middlewares';

// controllers
const {
  create,
  categories,
  removeCategory,
  updateCategory,
  postsByCategory
} = require('../controllers/category');

// CRUD
router.post('/category', requireSignin, isAdmin, create);
router.get('/categories', categories);
router.put('/category/:slug', requireSignin, isAdmin, updateCategory);
router.delete('/category/:slug', requireSignin, isAdmin, removeCategory);
router.get('/posts-by-category/:slug', postsByCategory);

export default router;
