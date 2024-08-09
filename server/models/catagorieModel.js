import mongoose from "mongoose";

const catagorieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    c_img: {
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model("Catagories", catagorieSchema);