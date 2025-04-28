import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error);
    process.exit(1);
  }
};

const generateCalendar = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      status: 'available'
    });
  }
  return days;
};

const seedRooms = async () => {
  try {
    await Room.deleteMany();

    const rooms = [
      {
        name: '8人混合宿舍',
        roomId: 'dorm8',
        calendar: generateCalendar()
      },
      {
        name: '3人私密间',
        roomId: 'private3',
        calendar: generateCalendar()
      }
    ];

    await Room.insertMany(rooms);
    console.log('房型初始化完成');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedRooms();
};

run();
