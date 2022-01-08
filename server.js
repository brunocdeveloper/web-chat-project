const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

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
const { getAllMessages } = require('./controllers/history');
const { createHistory } = require('./models/history');

app.get('/', getAllMessages);

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', (socket) => {
  const currentDate = getDate();
  socket.emit('greetings', '');

  socket.broadcast.emit('newConnection', 'Alguém acabou de se conectar');

  socket.on('message', async ({ chatMessage, nickname }) => {
    await createHistory(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} ${nickname}: ${chatMessage}`);
  });
});
