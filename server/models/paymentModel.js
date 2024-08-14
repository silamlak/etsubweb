import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  referenceNo: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export default mongoose.model('Payments', paymentSchema)