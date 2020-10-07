// docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto
// mqtt pub -t 'test' -h 'localhost' -m 'test'
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h> // PubSubClient by Nick O'Leary 
                          // https://github.com/knolleary/pubsubclient

#define LED 2
#define TIME 1000
#define BAUD_RATE 9600
#define RECONNECT_TIME 5000

const char *SSID = "Flia-Vaca";
const char *PASSWORD = "ragnarok";
const char *PRONT_CONNECTING = "Connecting to WiFi...";
const char *PRONT_CONNECTED = "Connected to the WiFi network";

const char *MQTT_SERVER = "192.168.0.9";
const int MQTT_PORT = 1883;
const char *CLIENT_ID = "esp32";
const char *TOPIC = "test";

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
}

long lastReconnectAttempt = 0;

boolean reconnect()
{
  if (client.connect(CLIENT_ID))
  {
    client.subscribe(TOPIC);
  }
  return client.connected();
}

void setup()
{
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
    client.publish(TOPIC, "echo...");
    delay(TIME);
  }
}
