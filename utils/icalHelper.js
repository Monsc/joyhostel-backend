import ical from 'ical';

export const parseICal = async (icalUrl) => {
  try {
    const res = await fetch(icalUrl);
    const data = await res.text();
    const events = ical.parseICS(data);

    const bookings = [];
    for (let key in events) {
      const ev = events[key];
      if (ev.type === 'VEVENT') {
        const start = new Date(ev.start);
        const end = new Date(ev.end);

        let current = new Date(start);
        while (current < end) {
          bookings.push({
            date: current.toISOString().split('T')[0],
            status: 'booked'
          });
          current.setDate(current.getDate() + 1);
        }
      }
    }
    return bookings;
  } catch (error) {
    console.error('解析iCal失败', error);
    return [];
  }
};
