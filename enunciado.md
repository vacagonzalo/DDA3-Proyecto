# Enunciado del Trabajo Práctico Final de la Materia Desarrollo de Aplicaciones para IoT

## Arquitectura del Sistema
Desarrollar una aplicación que integre distintos componentes para el almacenamiento, procesamiento y visualización de datos enviados al menos dos  dispositivos remotos (IoT). Debe incluirse también alguna configuración remota básica o comando a distancia. Los componentes mínimos del sistema final serán:

## Servidor MQTT
Aplicación on-line para el almacenamiento de los datos
Aplicación Web

## Detalles del Sistema
A modo de ejemplo, los componentes pueden por ejemplo ser estos:
Servidor MQTT: Se admite el servidor Mosquitto o similar. De ser local puede ser abierto. De usar un servidor remoto debe contar con TLS y autenticación, por razones obvias de seguridad.
Aplicación on-line para el almacenamiento de los datos: Puede ser node-red o aplicación ad-hoc (escrita en node.js, python, etc.). La funcionalidad mínima requerida es suscribirse al servidor MQTT para capturar los mensajes del dispositivo IoT y almacenarlos en la base de datos.
Aplicación Web: La funcionalidad mínima requerida de la aplicación Web será:
Interface para que el usuario pueda visualizar, dar de alta, dar de baja o editar la lista de dispositivos IoT.
Visualización conveniente de los datos almacenados en la base de datos.
Envío de comandos en forma remota. 

Respecto de los datos a enviar por los dispositivos IoT se podrán utilizar los componentes adquiridos para cursar la carrera (ver listado). En este caso, se proveerá en los próximos días de un programa Arduino para que adquiera los datos de los sensores de temperatura y humedad y los transmita por MQTT. Para el comando remoto alcanza con encender y apagar un led en tiempo real. A modo de ejemplo puede consultar esta página.

## Formato de Entrega
El formato de entrega será un repositorio git a elección: por ejemplo puede abrir uno en github.com o en gitlab.com. Para la entrega se requerirán subir todos los archivos fuentes, por lo que deberá contar con al menos dos directorios en el directorio raíz del repositorio:
La carpeta donde se colocarán la programación de la aplicación o servicio on-line (por ejemplo, los flows de Node-Red).
La carpeta donde se colocarán los fuentes de la aplicación Web.
Cualquier otro archivo fuente que considere necesario, se colocará en otra carpeta aparte.

Además del uso de un repositorio, el mismo deberá estar organizado según el flujo de trabajo gitflow (ver más detalles acá). Esto es, la rama main (o master) deberá estar vacía porque se usará para producción. El trabajo debe guardarse en la rama develop, y el repositorio debe contar con al menos dos ramas más de features.
Respecto de las estructuras y datos almacenados en la base de datos local, no hace falta entregarlos. 
Defensa del Trabajo
La defensa del trabajo se realizará la última clase, hasta el punto donde se haya logrado alcanzar.