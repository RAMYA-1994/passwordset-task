const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User'); // Define a User model schema
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://user1:ramyapraba@cluster0.bnxxvoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ramyarrr2016@gmail.com',
    pass: 'Ramya@kittu7',
  },
});

// Register route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,11);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json('Registration successful!');
});

// Request password reset route
app.post('/api/request-password-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json('User not found');
  }

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  const resetLink = `http://localhost:5175/reset-password/${token}`;

  await transporter.sendMail({
    from: 'ramyarrr2016@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  res.json('Password reset email sent.');
});

// Reset password route
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
    res.json('Password reset successful!');
  } catch (err) {
    res.status(400).json('Invalid or expired token');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
