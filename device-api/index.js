// mqtt pub -t 'readings' -h 'localhost' -m '{"id":2,"t":24.3,"h":67.8,"a":true}'
var models = require('./models');

var mqtt = require('mqtt');
const url = "mqtt://broker";
const options = {
  clientId: "device-api",
  username: "mosquitto",
  password: "",
  clean: true
}
var client = mqtt.connect(url, options);

client.on('connect', () => {
  console.log(`connected to ${url}`);
  client.subscribe('readings');
});

client.on('message', (topic, message) => {
  let data = JSON.parse(message);
  if (topic == 'readings') {
    newReading(data);
  }
});

client.on("error", (error) => {
  console.log(`connection error: ${error}`);
});

// {"n":"alfa","t":24.3,"h":67.8,"a":true}
async function newReading(data) {
  try {
    const device = await models.Device.findOne({ where: { name: data.n } });
    if (device instanceof models.Device) {
      const reading = models.Reading.build({
        deviceId: device.id,
        temperature: data.t,
        humidity: data.h,
        actuator: data.a,
        createdAt: new Date()
      })

      reading.save()
        .then(() => {
          console.log('new reading');
          return;
        })
        .catch((err) => {
          console.log(`error: ${err}`);
          return;
        })
    } else {
      console.log('device not found');
    }
  }
  catch (err) {
    console.log(`error: ${err}`);
  }
}