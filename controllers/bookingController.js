import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

export const createBooking = async (req, res) => {
  try {
    const { roomId, date, name, phone, email } = req.body;

    const booking = new Booking({ roomId, date, name, phone, email });
    await booking.save();

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: '房型不存在' });
    }

    const day = room.calendar.find(d => d.date === date);
    if (day) {
      day.status = 'booked';
    } else {
      room.calendar.push({ date, status: 'booked' });
    }
    await room.save();

    res.status(201).json({ message: '预订成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};
