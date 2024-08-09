Este es un proyecto de API para una aplicación de Restaurantes, el esquema Entidad Relación es el siguiente:
![Esquema Entidad Relacion](<./images/ENTIDAD RELACION.png>)

El funcionamiento se basa en la creación y logueo de usuarios, una vez logueados pueden crear, calificar y modificar los restaurantes, asi como hacer comentarios para cada restaurante, y agregar restaurantes o eliminarlos de su lista de favoritos.

 La estructura de Carpetas es la siguiente: 
 - **backend**: carpeta principal del proyecto
    - **config**: carpeta con archivos de conexión y configuración para usar servicios externo
      - db.js: Archivo de conexión hacia MongoDB
    - **controller**: carpeta para los archivos que manejaran las funciones de cada esquema 
      - comentariosControlador: funciones del esquema de comentarios
      - favoritosControlador: funciones para el esquema de favoritos
      - restaurantesControlador: funciones para el esquema de restaurantes
      - usuariosControlador: funciones para el esquema de usuarios
    - **middleware**: carpeta donde se incluyen archivos de manejos de errores o de autenticación
      - authMiddleware: se verifica que se cuente con un token de acceso
      - errorMiddleware: se hace el manejo de errores
      - userMiddleware: se verifica que el usuario tenga permisos de modificación
    - **models**: carpeta para archivos de los esquemas de las entidades de la BD
      - comentarioModelo: esquema basico para los documentos de comentarios
      - favoritoModelo: esquema basico para los documentos de favorito
      - restauranteModelo: esquema basico para los documentos de restaurante
      - usuarioModelo: esquema basico para los documentos de usuario
    - **routes**: carpeta para archivos de las rutas de cada endpoint y que verbo HTTP usaran
      - comentariosRutas: rutas para el esquema de comentarios
      - favoritosRutas: rutas para el esquema de favoritos
      - restaurantesRutas: rutas para el esquema de restaurantes
      - usuariosRutas: rutas para el esquema de usuarios
    - **server**: archivo principal del backend donde se configura el server y se exportan las rutas de la API
 - **images**: carpeta donde se guardan las imagenes del README

 **PARA INICIAR A TRABAJAR**
 - Ejecutar "npm i"
 - Añadir un archivo .env
 - En el archov env, añadir las siguientes variables: 
   - NODE_ENV = "el modo de desarrollo que se desea"
   - MONGO_URI =  "una uri que se obtiene de MongoDB para poder realizar la conexión"
   - JWT_SECRET = "contraseña secreta para el JWT"
 - Ejecutar "npm run server" para poder probar el proyecto en desarrollo, para saber si el proyecto funciona aparecera un mensaje en consolo como el siguiente:
 ![Prueba de conexión una vez inicializado el servidor](https://prod-files-secure.s3.us-west-2.amazonaws.com/10a51d03-5d4e-47cf-9817-0c886ba89e95/23db3c18-ae29-4770-9eb9-cdb2fa602107/Untitled.png)

**FUNCIONAMIENTO DE LOS ENDPOINTS**
Se agrega el link a swagger:
https://app.swaggerhub.com/apis/MELSAVA1207/TATTLER/1.0.0


