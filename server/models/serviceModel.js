import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    s_img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      //   required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      // required: true,
      default: 0,
    },
    is_open: {
      type: Boolean,
      default: true,
    },
    rate: {
      type: Array,
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Services", serviceSchema);
