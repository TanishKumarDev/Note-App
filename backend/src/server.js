import 'dotenv/config';
import myCors  from 'cors';
import express from 'express';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(myCors({
  origin: 'http://localhost:5173',
}));
// Middleware
app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);

// import cors from 'cors';


// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if DB connection fails
  });
