import express from 'express';

const router = express.Router();

// controllers
import { contact } from '../controllers/website';

router.post('/contact', contact);

export default router;
