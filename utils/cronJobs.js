import cron from 'node-cron';
import Room from '../models/Room.js';
import { parseICal } from './icalHelper.js';

export const startICalSyncJob = () => {
  cron.schedule('0 * * * *', async () => { // 每小时整点执行
    console.log('开始同步iCal...');
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
          console.log(`房型 ${room.name} 同步完成`);
        }
      }
    } catch (error) {
      console.error('iCal同步失败', error);
    }
  });
};
