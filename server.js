const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const redis = require("./utils/redisClient")


dotenv.config();
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

redis.connect()

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/tickets', require('./routes/tickets'));

// Create default admin and user
const createDefaultUsers = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // You should hash this password manually
        isAdmin: true,
      });
      await admin.save();
      console.log('Default admin created: admin@example.com');
    }

    const userExists = await User.findOne({ email: 'user@example.com' });
    if (!userExists) {
      const user = new User({
        username: 'user',
        email: 'user@example.com',
        password: 'user123', // You should hash this password manually
        isAdmin: false,
      });
      await user.save();
      console.log('Default user created: user@example.com');
    }
  } catch (err) {
    console.error('Error creating default users:', err.message);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createDefaultUsers();
});
