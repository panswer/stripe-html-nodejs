# Servicio de pago con stripe (uso)

Stripe es un servicio de transferencia de pago que nos facilita el pago de diversas formas como lo es:

 - Pago por tarjeta de credito.
 - Pago por transferencia de un banco.

## Informacion de servicio.
### Carpeta server

Esta carpeta contine:

 - La carpeta config
 - La carpeta controllers
 - La carpeta helpers
 - La carpeta middlewares
 - La carpeta models
 - La carpeta routes
 - El archivo server.js
 - El archivo index.js

### Carpeta config.

Esta carpeta contiene toda configuracion del servidor.

### Carpeta controllers

Esta carpeta contiene los controladores que nos ayudan a resolver la peticion del front end.

### Carpeta helpers

Esta carpeta contiene funciones repetitivas.

### Carpeta models

Esta carpeta tiene el schema de los documentos que se utilizaran para mongoDB.

### Carpeta routes

Esta carpeta contine las rutas por las cuales se comunica el front end.

### Archivo server

Este archivo es la parte en que se configura e inicializa el servicio.

### Archivo index.js

Este es el archivo mediante el cual se da inicio el servicio en general.

# Dependencias

express, mongoose, cors, dotenv,colors, nodemon.

# Uso del stripe