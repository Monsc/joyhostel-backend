import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import calendarRoutes from './routes/calendarRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import icalRoutes from './routes/icalRoutes.js';
import { startICalSyncJob } from './utils/cronJobs.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/calendar', calendarRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/ical', icalRoutes);

// 数据库连接
import connectDB from './config/db.js';
connectDB();

// 定时任务
startICalSyncJob();

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
