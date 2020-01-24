const socketio = require('socket.io');

exports.setupWebsocket = server => {
  const io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.id);
    // parâmetros enviados pelo front
    console.log(socket.handshake.query);

    // backend enviando info pro front sem o front ter feito uma req
    setTimeout(() => {
      socket.emit('message', 'ola');
    }, 3000);
  });
};
