/* Importar as configuracoes do servidor */
const app = require('./config/server');

/** Parametrizar a porta de escuta */
var server = app.listen(80, () => {
    console.log('Servidor ON');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexao por websocket */
io.on('connection', (socket) => {
    console.log('Usuario conectou');

    socket.on('disconnect', () => {
        console.log('Usuario desconectou.')
    });

    /* dIALOgo */
    socket.on('msgParaServidor', (data) => {
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        /* Participantes   */
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );
        }
    });

});