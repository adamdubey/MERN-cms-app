import express from 'express';

const router = express.Router();

// middleware
import { requireSignin, isAdmin } from '../middlewares';

// controllers
import { contact, createPage, getPage } from '../controllers/website';

// CRUD
// contact form
router.post('/contact', contact);

// admin homepage customization
router.post('/page', requireSignin, isAdmin, createPage);
router.get('/page/:page', getPage);

export default router;
