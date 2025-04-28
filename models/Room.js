import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: { type: String, required: true, unique: true },
  calendar: [
    {
      date: { type: String },
      status: { type: String, enum: ['available', 'booked', 'locked'], default: 'available' }
    }
  ],
  icalUrl: { type: String } // Booking.com iCal地址
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
