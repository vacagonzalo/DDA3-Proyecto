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
  client.subscribe('orders/#');
});

client.on('message', (topic, message) => {
  let data = JSON.parse(message);
  changeActuator(data);
});

var names = ['alfa', 'bravo', 'charlie', 'delta'];
var actuators = [false, false, false, false];

// {n:'alfa', a:true}
function changeActuator(data) {
  let index = names.findIndex((element) => {
    return element == data.n;
  });
  if(!!index) {
    actuators[index] = data.a;
  }
}

// '{"n":"alfa","t":24.2,"h":77.7,"a":true}'
const delay = 1000;
setInterval(() => {
  let index = randomInt(0, 3);
  let n = names[index];
  let t = randomFloat(22, 26);
  let h = randomFloat(60, 75);
  let a = actuators[index];
  let data = `{"n":"${n}","t":${t},"h":${h},"a":${a}}`;
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