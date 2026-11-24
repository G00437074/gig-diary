import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import gigRoutes from './routes/gigRoutes.js';

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/gigs', gigRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Gig Diary server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error('Could not connect to MongoDB:', error.message));
