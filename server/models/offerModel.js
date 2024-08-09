import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    service_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    o_img: {
      type: String,
      required: true,
    },
    off: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Offers", offerSchema);
