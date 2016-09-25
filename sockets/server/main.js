var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text: "Inicio chat usando sockets",
  author: "Cristian Franco"
},{
  id: 2,
  text: "Utilizando node",
  author: "Jose"
},{
  id: 3,
  text:"Genial!",
  author: "David"
}];

app.use(express.static('public'));

app.get('/autores', function(req, res) {
  res.status(200).send("Cristian, Jose, David");
});

io.on('connection', function(socket) {
  console.log('Nuevo cliente conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(3000, function(io) {
  console.log("Servidor corriendo en http://10.131.137.212:3000");
});
