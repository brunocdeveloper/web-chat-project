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

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

const users = {};

io.on('connection', (socket) => {
  const currentDate = getDate();
  users[socket.id] = socket.id.substr(0, 16);

  socket.emit('firstNameUser', users[socket.id]);

  io.emit('onlineUser', users);
  
  socket.on('disconnect', () => {
    delete users[socket.id];

    io.emit('onlineUser', users);
  });

  socket.broadcast.emit('newConnection', 'Alguém acabou de se conectar');
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await createHistory(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} ${nickname}: ${chatMessage}`);
  });

  socket.on('attNickName', (newName) => {
    users[socket.id] = newName;
    io.emit('onlineUser', users);
  });
});

app.get('/', getAllMessages);
