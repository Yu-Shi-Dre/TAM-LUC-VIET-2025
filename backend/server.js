const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketSetup = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

// Socket.IO
socketSetup(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));