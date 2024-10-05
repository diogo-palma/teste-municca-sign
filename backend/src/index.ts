import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

dotenv.config();

import userRoutes from './routes/user';
import documentRoutes from './routes/document';
import authRoutes from './routes/auth';



const app = express();
app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/users/:id/documents', documentRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});