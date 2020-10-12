# Proyecto final DDA3
Ing. Gonzalo Nahuel Vaca

## Descripción
El proyecto es una maqueta de un sistema de monitoreo y control de dispositivos IoT. Solo tiene fines educativos, dentro del contexto de la carrera de Especialización en Internet de las Cosas del laboratorio de sistemas embebidos de la Universidad de Buenos Aires.

El sistema cuenta de:
* Un broker MQTT Mosquitto.
* Una base de datos PostgreSQL.
* Un servidor Nodejs que hace de api entre el broker y la base de datos.
* Un servidor Nodejs que simula un punto de agregación de dispositivos IoT.
* Un Frontend realizado en Angular.
* Un servidor Nodejs que hace de api entre el frontend y la base de datos.
* Un proyecto para ESP32 realizado en platformio con framework arduino.
* Un sistema de orquestación basado en docker.

## Requisitos
* Docker.
* Docker Compose.
* Nodejs.
* Angular cli.
* Sistema que pueda correr scripts de bash.
* Puertos 1883, 5432, 9001 y 9999  libres.

## Instrucciones
* Verificar y cumplir los requisitos.
* Clonar/descargar este repositorio.
* Dar permisos de ejecución al script iniciar.sh que se encuentra en la raíz.
* Ejecutar el script iniciar.sh
* Para finalizar ejecute el script destruir.sh que se encuentra en la raíz.