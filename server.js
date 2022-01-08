const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.get('/', async (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getDate } = require('./helpers/actualDate');

app.use(cors());

io.on('connection', (socket) => {
  const currentDate = getDate();
  socket.emit('greetings', 'Bem vindo ao nosso chat');

  socket.broadcast.emit('newConnection', 'Alguém acabou de se conectar');

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${currentDate} ${nickname}: ${chatMessage}`);
  });
});
