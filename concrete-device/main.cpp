// docker run rm -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto
// mqtt pub -t 'orders' -h 'localhost' -m '{"n":"esp32","a":true}'
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h> // PubSubClient by Nick O'Leary
                          // https://github.com/knolleary/pubsubclient

#include <ArduinoJson.h> // ArduinoJson by Benoit Blanchon
                         // https://github.com/bblanchon/ArduinoJson

#define LED 2
#define TIME 1000
#define BAUD_RATE 9600
#define RECONNECT_TIME 5000

#define TEMP_MAX 27
#define TEMP_MIN 22

#define HUM_MAX 70
#define HUM_MIN 50

const char *SSID = "Flia-Vaca";    // <- your WiFi
const char *PASSWORD = "ragnarok"; // <- your WiFi's password
const char *PRONT_CONNECTING = "Connecting to WiFi...";
const char *PRONT_CONNECTED = "Connected to the WiFi network";

const char *MQTT_SERVER = "192.168.0.9";
const int MQTT_PORT = 1883;
const char *CLIENT_ID = "esp32";
const char *TOPIC = "readings";
const char *S_TOPIC = "orders";

bool actuator = true;

StaticJsonDocument<256> doc;

WiFiClient MQTTclient;
PubSubClient client(MQTTclient);

void callback(char *topic, byte *payload, unsigned int length)
{
  String payload_buff;
  for (int i = 0; i < length; i++)
  {
    payload_buff = payload_buff + String((char)payload[i]);
  }
  Serial.println(payload_buff);
  DeserializationError err = deserializeJson(doc, payload_buff);
  if(err)
  {
    Serial.print("ERROR: ");
    Serial.println(err.c_str());
    return;
  }
  const char *name = doc["n"];
  bool a = doc["a"];
  String sensor_id = String(name);
  if(sensor_id.equals(CLIENT_ID))
  {
    actuator = a;
  }
}

long lastReconnectAttempt = 0;

boolean reconnect()
{
  if (client.connect(CLIENT_ID))
  {
    client.subscribe(S_TOPIC);
  }
  return client.connected();
}

void setup()
{
  pinMode(LED, OUTPUT);
  Serial.begin(BAUD_RATE);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(TIME);
    Serial.println(PRONT_CONNECTING);
  }
  Serial.println(PRONT_CONNECTED);
  client.setServer(MQTT_SERVER, MQTT_PORT);
  client.setCallback(callback);
  lastReconnectAttempt = 0;
}

void loop()
{
  if (!client.connected())
  {
    long now = millis();
    if (now - lastReconnectAttempt > RECONNECT_TIME)
    {
      lastReconnectAttempt = now;
      if (reconnect())
      {
        lastReconnectAttempt = 0;
      }
    }
  }
  else
  {
    client.loop();
    String t = String(random(TEMP_MIN, TEMP_MAX));
    String h = String(random(HUM_MIN, HUM_MAX));
    String a;
    if (actuator)
    {
      a = "true";
      digitalWrite(LED, HIGH);
    }
    else
    {
      a = "false";
      digitalWrite(LED, LOW);
    }
    String temporal = "{\"n\":\"esp32\",\"t\":";
    temporal = String(temporal + String(t) + ",\"h\":" + String(h) + ",\"a\":" + a) + "}";
    client.publish(TOPIC, temporal.c_str());
    delay(TIME);
  }
}
