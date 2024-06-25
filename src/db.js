import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://elbuhoac:NLn68uR3jlingwKH@cucervices.36vneoy.mongodb.net/")
        console.log("DB is connected")
    }catch(error) {
        console.log("ERROR: ", error)
    }
}

export default connectDB