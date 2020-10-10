const express = require('express');
const router = express.Router();

var mqtt = require('mqtt');
const url = "mqtt://broker";
const options = {
  clientId: "virtual-device",
  username: "mosquitto",
  password: "",
  clean: true
}

var client = mqtt.connect(url, options);

client.on('connect', () => {
  console.log(`connected to ${url}`);
});

router.put('/:deviceName/:actuatorState', (req, res) => {
  let name = req.params.deviceName;
  let state = req.params.actuatorState;
  let topic = `orders/${name}`;
  let data = `{"n":"${name}","a":${state}}`;
  client.publish(topic, data);
  res.sendStatus(200);
});

module.exports = router;