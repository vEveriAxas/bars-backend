const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = 443;
const cors = require('cors');

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
    res.send('Екатерина, Вас приветствует будущий сервер крупнейщей системы общения! Сайт работает на HTTPS протоколе и полностью безопасен!');
});

app.get('/hello', (req, res) => {
    console.log(req.headers, req.ip);
    res.send('Hello!!!');
});


// Local
// app.listen(3000, () => {
//     console.log(`Server has been started on http//localhost:3000`);
// });


// Global  (HTTPS)
https.createServer(httpsOptions, app).listen(443, () => {
    console.log(`Server is running on port https:localhost:${PORT}`);
});