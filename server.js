const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = 3000;
const cors = require('cors');

const httpsOptions = {
    cert: fs.readFileSync(path.resolve(__dirname, './certificate/fullchain.pem')),
    key: fs.readFileSync(path.resolve(__dirname, './certificate/privkey.pem')),
};

console.log(httpsOptions);

app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
}));


app.listen(PORT, () => {
    console.log(`Server is running at http://${'localhost'}:${PORT}`);
});