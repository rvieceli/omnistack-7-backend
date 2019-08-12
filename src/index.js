const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Server } = require('http');
const SocketIO = require('socket.io');

const app = express();

const server = Server(app);
const io = SocketIO(server);

mongoose.connect('mongodb+srv://week:p1v3MD98xABMYA99@dbomnistack-lt0es.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/files', express.static(
  path.resolve(__dirname, '..', 'uploads', 'resized'),
));

app.use(require('./routes'));

server.listen(3333);
