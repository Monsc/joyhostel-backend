import express from 'express';
import { manualICalSync } from '../controllers/icalController.js';
const router = express.Router();

router.post('/sync', manualICalSync);

export default router;
