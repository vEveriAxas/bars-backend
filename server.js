const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running at http://${'localhost'}:${PORT}`);
});