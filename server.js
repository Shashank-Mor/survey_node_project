const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/dbConnection');
const questionRoutes = require('./routes/questionsRoutes');
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();
app.use(express.json());

// Rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit to 100 requests per window
}));

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/questions', questionRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));