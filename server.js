const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); 
const server = http.createServer(app);
const PORT = 443;

const io = new Server(server, {
    cors: {
        origin: "https://bars-dusky.vercel.app",
        // origin: "http://localhost:8081",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
})


// Получение сертификата и ключа SSL
const httpsOptions = {
    cert: fs.readFileSync(path.resolve(__dirname, './certificate/fullchain.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './certificate/privkey.pem')),
};

// Настройка Cors
app.use(cors({
    origin: "https://bars-dusky.vercel.app",
    // origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.get('/', (req, res) => {
    res.send('Сервер запущен!');
});
io.on('connection', (socket) => {
    console.log('A new client connect!');
    socket.on('message', (content) => {
        console.log(content);
        io.emit('message', content)
    });
});





// Local
// server.listen(3000, () => {
//     console.log(`Server has been started on http//localhost:3000`);
// });


// Global  (HTTPS)
https.createServer(httpsOptions, app).listen(443, () => {
    console.log(`Server is running on port https:localhost:${PORT}`);
});