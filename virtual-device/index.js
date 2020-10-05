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
  client.subscribe('orders');
});

client.on('message', (topic, message) => {
  let data = JSON.parse(message);
  if (topic == 'orders') {
    changeActuator(data);
  }
});

var actuators = [false, false, false, false];

// {id:2, a:true}
function changeActuator(data) {
  actuators[data.id - 2] = data.a;
}

const delay = 10000;

setInterval(() => {
  let id = randomInt(2, 5);
  let t = randomFloat(22, 26);
  let h = randomFloat(60, 75);
  let a = actuators[id - 2];
  let data = `{"id":${id},"t":${t},"h":${h},"a":${a}}`;
  console.log(data);
  client.publish('readings', data);

}, delay);

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function randomFloat(min, max) {
  return min + (max - min) * Math.random();
}

client.on("error", (error) => {
  console.log(`connection error: ${error}`);
});