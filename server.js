const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = 443;
const cors = require('cors');

const httpsOptions = {
    cert: fs.readFileSync(path.resolve(__dirname, './certificate/fullchain.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './certificate/privkey.pem')),
};

app.get('/', (req, res) => {
    res.send('Екатерина, Вас приветствует будущий сервер крупнейщей системы общения! Сайт работает на HTTPS протоколе и полностью безопасен!');
});

app.use(cors({
    origin: ['http://localhost:8080', 'http://192.168.1.183:8080', 'https://bars-dusky.vercel.app'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
}));



https.createServer(httpsOptions, app).listen(443, () => {
    console.log(`Server is running on port https:localhost:${PORT}`);
});