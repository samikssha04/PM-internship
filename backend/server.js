const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/student', require('./src/routes/auth'));
app.use('/api/company', require('./src/routes/authCompany'));
app.use('/api/match', require('./src/routes/match'));
app.use('/api/test', require('./src/routes/test'));
app.use('/api/admin', require('./src/routes/admin'));

app.get('/', (req, res) => {
  res.json({ message: 'Intern Connect API Running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
