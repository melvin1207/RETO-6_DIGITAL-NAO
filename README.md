Este es un proyecto de API para una aplicación de Restaurantes, el esquema Entidad Relación es el siguiente:
![Esquema Entidad Relacion](<./images/ENTIDAD RELACION.png>)

El funcionamiento se basa en la creación y logueo de usuarios, una vez logueados pueden crear, calificar y modificar los restaurantes, asi como hacer comentarios para cada restaurante, y agregar restaurantes o eliminarlos de su lista de favoritos.

 La estructura de Carpetas es la siguiente: 
 - **backend**: carpeta principal del proyecto
    - **config**: carpeta con archivos de conexión y configuración para usar servicios externo
    - **controller**: carpeta para los archivos que manejaran las funciones de cada esquema 
    - **middleware**: carpeta donde se incluyen archivos de manejos de errores o de autenticación
    - **models**: carpeta para archivos de los esquemas de las entidades de la BD
    - **routes**: carpeta para archivos de las rutas de cada endpoint y que verbo HTTP usaran
    - **server**: archivo principal del backend donde se configura el server y se exportan las rutas de la API
 - **images**: carpeta donde se guardan las imagenes del README

 Para poder probarlo se debe instalar nodemon como dependencia de desarrollo y ejectuar 
 "npm run server" para correr el sript de desarrrollo
