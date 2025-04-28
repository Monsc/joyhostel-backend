// 引入模块
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// 引入自定义模块
import calendarRoutes from './routes/calendarRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import icalRoutes from './routes/icalRoutes.js';
import { startICalSyncJob } from './utils/cronJobs.js';
import connectDB from './config/db.js';

// 初始化环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 中间件
app.use(cors()); // ✅ 允许跨域请求
app.use(express.json()); // ✅ 解析 JSON 请求体

// 连接数据库
connectDB();

// 挂载路由
app.use('/api/calendar', calendarRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/ical', icalRoutes);

// 启动定时同步 iCal
startICalSyncJob();

// 获取端口
const PORT = process.env.PORT || 5000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
