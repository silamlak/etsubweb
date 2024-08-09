import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating value
    max: 5, // Maximum rating value
  },
  review: {
    type: String,
    required: false,
    trim: true,
  },
}, {timestamps: true});

export default mongoose.model('Rates', rateSchema)