import mongoose from "mongoose";
const DB_URL = process.env.DB_URL || '';
console.log('DB_URL:', DB_URL);
if (!DB_URL) {
    console.error('Missing DB_URL');
}

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://root:gugu2002@talkr-db:27017/');
        console.log('Connected to the database');
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;