import mongoose from "mongoose";
const image_schema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('images', image_schema)

