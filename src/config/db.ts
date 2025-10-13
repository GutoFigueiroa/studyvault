import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro: ${error.message}`);
        }
        process.exit(1); // Encerra o processo em caso de falha
    }
};

export default connectDB;