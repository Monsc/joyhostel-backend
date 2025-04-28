// 引入模块
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import calendarRoutes from './routes/calendarRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import icalRoutes from './routes/icalRoutes.js';
import { startICalSyncJob } from './utils/cronJobs.js';

// 初始化
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 设置允许的前端来源（防止CORS问题）
const corsOptions = {
  origin: 'https://joyhostel-frontend.vercel.app', // <<== 这里改成你的前端地址
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// 基础路由（测试后端是否在线）
app.get('/', (req, res) => {
  res.send('JoyHostel Backend API is running.');
});

// API路由
app.use('/api/calendar', calendarRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/ical', icalRoutes);

// 连接MongoDB
import connectDB from './config/db.js';
connectDB();

// 定时任务
startICalSyncJob();

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ========== 防 Render 睡眠：每5分钟自唤醒自己 ==========
// Render免费版闲置15分钟后睡眠，所以自己每5分钟ping自己一次
import fetch from 'node-fetch';

setInterval(() => {
  fetch(`https://joyhostel-backend.onrender.com/`)
    .then(() => console.log('Keep-alive ping sent'))
    .catch((err) => console.error('Keep-alive ping failed:', err.message));
}, 5 * 60 * 1000); // 5分钟一次
