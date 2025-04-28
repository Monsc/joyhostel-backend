import express from 'express';
import { getRoomCalendar } from '../controllers/calendarController.js';
const router = express.Router();

router.get('/:roomId', getRoomCalendar);

export default router;
