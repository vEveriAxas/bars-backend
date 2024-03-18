const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = 443;

// =====================================   STATE   ============================================
const IS_PRODUCTION = true;

// DATABASE
const { sequelize } = require('./db_connection');

// =====================================   DB started   ============================================
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connect to postgres database');
    } catch (err) {
        throw new Error(`Failed to connect to the database  => ${err}`);
    }
})();

// =====================================   Настройка CORS   ============================================
if (IS_PRODUCTION === true) {
    app.use(cors({
        origin: "https://bars-dusky.vercel.app",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }));
} else if (IS_PRODUCTION === false) {
    app.use(cors({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }));
}

// =====================================   Получение сертификата SSL и приватного ключа   ============================================

const httpsOptions = {
    cert: fs.readFileSync(path.resolve(__dirname, './certificate/fullchain.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './certificate/privkey.pem')),
};

// =====================================   Запуск сервера   ============================================
function startedServer(isProduction) {
    if (isProduction === true) {
        // Global  (HTTPS)
        const server = https.createServer(httpsOptions, app).listen(443, () => {
            console.log(`Server is running on port http:localhost:${PORT}`);
        });
        return server;
    }
    else if (isProduction === false) {
        // local
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log(`Server has been started on http//localhost:3000`);
        });
        return server;
    }
}
const server = startedServer(IS_PRODUCTION);

// =====================================   Инициализация вебсокет сервера   ============================================
function initIO(isProduction) {
    if (isProduction === true) {
        return new Server(server, {
            cors: {
                origin: "https://bars-dusky.vercel.app",
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            }
        });
    }
    else if (isProduction === false) {
        return new Server(server, {
            cors: {
                origin: "http://localhost:8080",
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            }
        });
    }
}
const io = initIO(IS_PRODUCTION);

// =====================================   Обработчики запросов   ============================================


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




