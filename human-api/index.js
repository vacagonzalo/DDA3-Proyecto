const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 9999;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const devices = require('./routes/devices.js');
app.use('/devices', devices);

const readings = require('./routes/readings.js');
app.use('/readings', readings);

const orders = require('./routes/orders.js');
app.use('/orders', orders);

app.listen(PORT, () => {
    console.log(`human-api on port ${PORT}`);
});