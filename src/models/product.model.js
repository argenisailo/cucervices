import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    pieces: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images',
        required: false
    }
},
{
    timestamps: true
})

export default mongoose.model('product', product_schema)