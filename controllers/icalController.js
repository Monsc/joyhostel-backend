import Room from '../models/Room.js';
import { parseICal } from '../utils/icalHelper.js';

export const manualICalSync = async (req, res) => {
  try {
    const rooms = await Room.find();
    for (const room of rooms) {
      if (room.icalUrl) {
        const externalBookings = await parseICal(room.icalUrl);

        externalBookings.forEach(ext => {
          const day = room.calendar.find(d => d.date === ext.date);
          if (day) {
            day.status = 'booked';
          } else {
            room.calendar.push({ date: ext.date, status: 'booked' });
          }
        });

        await room.save();
      }
    }
    res.json({ message: 'iCal手动同步完成' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '手动同步失败' });
  }
};
