import mongoose from 'mongoose';

export async function connectDb(){
    try {
        const mongoUri = process.env.MONGODB_URI;

        if(!mongoUri){
            throw new Error('MongoDB URI is missing');
        }
        const conn = await mongoose.connect(mongoUri);
        console.log('MongoDB Connected', conn.connection.host);
    }
    catch (error) {
        console.error("MongoDb Connection Error",error.message);
        process.exit(1);
    }
}