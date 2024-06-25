import mongoose from "mongoose"
const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    verified: {
        type: Boolean,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images',
        required: false
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    tel: {
        type: String,
        required: false
    },
    social: {
        type: String,
        required: false
    }
},
{
    timestamps: true
})

export default mongoose.model('user', user_schema)