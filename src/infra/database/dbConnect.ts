import mongoose, { MongooseOptions } from "mongoose";



export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        } as MongooseOptions)
            .then(() => console.log('Conectado ao Banco de Dados'))
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}