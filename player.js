const titleDisplay = document.getElementById('title-display');
const infoDisplay = document.getElementById('info-display');
const canvas = document.getElementById('pixel-board');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-btn');

const gridSize = 16;
const canvasSize = 256;
const pixelSize = canvasSize / gridSize;
let board = Array.from({ length: gridSize }, () => Array(gridSize).fill('#000'));

let clientId = null;
let clientCount = 0;

const webRoomsWebSocketServerAddr = 'wss://nosch.uber.space/web-rooms/';
const socket = new WebSocket(webRoomsWebSocketServerAddr);

// Draw the board on the canvas
function drawBoard() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = board[y][x];
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

// Send a message through the WebSocket connection
function sendRequest(...message) {
  socket.send(JSON.stringify(message));
}

// Handle user clicking on the canvas to draw
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize);
  const y = Math.floor((e.clientY - rect.top) / pixelSize);

  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    const color = colorPicker.value;
    board[y][x] = color;
    drawBoard();
    sendRequest('*broadcast-message*', ['draw', x, y, color]);
  }
});

// Clear the board
clearBtn.addEventListener('click', () => {
  board = Array.from({ length: gridSize }, () => Array(gridSize).fill('#000'));
  drawBoard();
  sendRequest('*broadcast-message*', ['clear-board']);
});

// Handle incoming WebSocket messages
socket.addEventListener('open', () => {
  sendRequest('*enter-room*', 'touch-touch');
  sendRequest('*subscribe-client-count*');
  setInterval(() => socket.send(''), 30000); // Keep connection alive
});

socket.addEventListener('close', () => {
  clientId = null;
  document.body.classList.add('disconnected');
});

socket.addEventListener('message', (event) => {
  if (!event.data) return;

  const incoming = JSON.parse(event.data);
  const selector = incoming[0];

  switch (selector) {
    case '*client-id*':
      clientId = incoming[1];
      if (infoDisplay) {
        infoDisplay.innerHTML = `${clientCount} clients connected`;
      }
      break;

    case '*client-count*':
      clientCount = incoming[1];
      if (infoDisplay) {
        infoDisplay.innerHTML = `${clientCount} clients connected`;
      }
      break;
    case 'draw':
      const [_, x, y, color] = incoming;
      board[y][x] = color;
      drawBoard();
      break;

    case 'clear-board':
      board = Array.from({ length: gridSize }, () => Array(gridSize).fill('#000'));
      drawBoard();
      break;

    case '*error*':
      console.warn('Server error:', ...incoming[1]);
      break;
  }
});

// Initial board drawing
drawBoard();
