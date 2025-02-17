const express = require('express');
const server = require('http').createServer(express);
const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);
server.listen(3000, function() {
    console.log('server started on port 3000');
});

/** Begin with websocket */

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    const numberOfClients = wss.clients.size;;
    console.log('Client connected. Number of clients: ', numberOfClients);

    wss.broadcast(`Number of visitors: ${numberOfClients}`);
    
    if(ws.readyState === ws.OPEN) {
        ws.send('Welcome to the chat room');
    }

    ws.on('close', function close() {
        console.log('Client disconnected. Number of clients: ', numberOfClients);
        wss.broadcast(`Number of visitors: ${numberOfClients}`);
    })
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if(client.readyState === client.OPEN) {
            client.send(data);
        }
    });
}