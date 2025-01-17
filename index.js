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
