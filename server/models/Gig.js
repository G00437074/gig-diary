import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    rating: { type: Number, min: 1, max: 5 }
  },
  { timestamps: true }
);

export default mongoose.model('Gig', gigSchema);
