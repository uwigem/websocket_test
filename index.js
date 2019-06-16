const express = require("express");
const http = require("http");
const ws = require("ws");
const port = 3000;
const app = express();
const server = http.createServer(app);

const wss = new ws.Server({ server });

let connections = [];

const echoToAllConnections = (msg) => {
    connections.forEach(connection => {
        connection.send(msg);
    })
}

wss.on("connection", (wsc) => {
    wsc.on("message", (msg) => {
        console.log("received message " + msg);
        echoToAllConnections(msg);
    });

    connections.push(wsc);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})