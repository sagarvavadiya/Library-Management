const express = require('express');
const WebSocket = require('ws');

// WebSocket URL for Binance BTC/USDT trade stream
const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

// Create a WebSocket connection
const socket = new WebSocket(socketUrl);

// Event: Connection Open
socket.on('open', () => {
  console.log('Connected to Binance WebSocket');
});

// Event: Message Received
socket.on('message', (data) => {
  const tradeData = JSON.parse(data);

  // Extract the price from the trade data
  const price = tradeData.p; // 'p' is the price field in the message
  console.log(`Live BTC/USDT Price: ${price}`);
});

// Event: Error
socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Event: Connection Closed
socket.on('close', () => {
  console.log('WebSocket connection closed');
});

const app = express();

// Demo data
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

// GET API to fetch all data
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: data,
  });
});

// Simple API for fetching a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = data.find((u) => u.id === userId);

  if (user) {
    res.status(200).json({
      success: true,
      message: `User with ID ${userId} found`,
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `User with ID ${userId} not found`,
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
