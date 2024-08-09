import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Quantity should be at least 1
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    status_change: {
      type: Array,
      default: [],
    },
    paymentMethod: {
      type: String,
      enum: ["TeleBirr", "Abysinia", "Bank Transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed",
    },
    deliveryAddress: {
      phone_no: {
        type: String,
        required: true,
      },
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Purchases', purchaseSchema)