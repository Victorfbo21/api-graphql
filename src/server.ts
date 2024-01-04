import dotenv from 'dotenv';

dotenv.config();
import app from './app';

const PORT: number = Number(process.env.PORT) || 4040;
app.startApolloServer(PORT);