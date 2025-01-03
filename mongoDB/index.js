import mongoose from "mongoose";

export const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("Please define the MONGO_URI environment variable.");
    }

    if (mongoose.connection.readyState >= 1) {
        return; // Already connected, no need to reconnect
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to DB successfully');
    } catch (err) {
        console.error('Error in connecting to DB', err);
    }
};
