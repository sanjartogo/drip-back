const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {
    Server
} = require("socket.io");
const http = require('http');

// defining the Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", () => {
    console.log("Connected");
})


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.post("/", (req, res) => {
    console.log(JSON.stringify(req.body));
    io.emit("order", req.body);
    res.send("Successfully received the message!");
});

server.listen(3050, () => {
    console.log("listening on port 3050");
});