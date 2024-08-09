import mongoose from "mongoose";

const statusChangeSchema = new mongoose.Schema({
  status: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
});

export default mongoose.model("StatusChanges", statusChangeSchema);
