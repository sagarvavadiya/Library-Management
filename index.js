const express = require('express');
const { createEntry, readEntries, blankEntry } = require('./manageActiveTrade');
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

// Event: Connection Open
client.on('connect', connection => {
  console.log('Connected to Binance WebSocket');

  connection.on('message', message => {
    if (message.type === 'utf8') {
      // Set a new debounce timer

      try {
        const tradeData = JSON.parse(message.utf8Data);
        const livePrice = parseFloat(tradeData.p); // Extract price

        console.log(livePrice);
        const trades = readEntries('history');
        if (trades && trades.length < 100) {
          createEntry(
            {
              exitPrice: livePrice,
            },
            'history',
          );
        }

        // Check each panding trade to be active
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    }
  });

  connection.on('error', error => {
    console.error('Connection error:', error);
  });

  connection.on('close', () => {
    console.log('Connection closed');
  });
});

client.connect('wss://stream.binance.com:9443/ws/btcusdt@trade');

const app = express();

// Demo data
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

// GET API to fetch all data
app.get('/users', (req, res) => {
  console.log({ data });
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: data,
  });
});
app.get('/trades', (req, res) => {
  const trades = readEntries('history');
  console.log({trades})
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: trades,
  });
});
app.get('/rm-trades', (req, res) => {
  const trades = blankEntry('history');
  console.log({trades})
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: trades,
  });
});

// Simple API for fetching a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = data.find(u => u.id === userId);

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
