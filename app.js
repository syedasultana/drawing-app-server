const express = require("express");
const app = express();
require("express-ws")(app);

// using the library ws
const WebSocket =  require("ws");

// start new web socket *server* on port 8080 to listen for messages from the client
const wss = new WebSocket.Server({ port: 8080});

const FROM_CLIENT = "FROM CLIENT: "; // the string added to the start of a message from the client in the browser
const FROM_SERVER = "TO CLIENT: "; // the string added to the start the start a message from the server to the browser


wss.on("connection", function connection(ws) { // when a connection to port 8080(the server started in line 9) is made by the client
    ws.on("message", function incomingGuess(guess) { // for a web socket connection made to the ws server by the client
        console.log(guess)
        wss.clients.forEach((client) => { // for each client connnected via web socket
            if (client.readyState == WebSocket.OPEN) { // check that client's connection is open
                if (guess.startsWith(FROM_CLIENT)) { // make sure the client has the correct string at the beginning of the message
                    console.log("sending message to others");
                    const guessAccepted = guess.replace(FROM_CLIENT, ""); // remove start of string - we know that it's from the client now, and we don't need this showing up in the guesses
                    client.send(guessAccepted); // send the guess to the client
                }
            }
        })

    })
})

// app.ws("/", function(ws, req) {
//   ws.on("message", function(msg) {
//     console.log(msg);
//   });
//   console.log("socket", req.testing);
// });

app.listen(3000);



