![Logo Shurly](https://res.cloudinary.com/javipineyro/image/upload/v1683335526/shurly_cbaazk.jpg)
***
 <p>Shurly es un acortador de urls <strong>gratis</strong> y lo mejor es que <strong>NO NECESITAS REGISTRARTE</strong></p>


  ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![](https://img.shields.io/badge/Tailwind-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB)
  ![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


***

## :hammer:Funcionalidades del proyecto

- `📌 Acortar urls`: Ingresa un url largo y acortalo para que sea más fácil compartirlo con otros.
- `📌 Detalles del url recortado`: Muestra datos de tu link tales como:
  - ✔ Cantidad de clicks en el link
  - ✔ Fecha de creación
  - ✔ Url original
- `📌 Redireccion`: Una vez ingresado en tu link acortado, se te redirigirá a tu destino y se actualizarán los datos
- `📌 Límites`: No abuses del servidor, hay un límite de usos suficiente por hora (si lo sobrepasas se te bloquea el acceso)

## :rocket: Iniciando el proyecto

Necesitarás:
* Git
* [**Node.js v18.12.1 (Recommemnded)**](https://nodejs.org/en/blog/release/v18.12.1) o Node.js 16+

1. Clona el repositorio
```bash
# Usando la url
git clone https://github.com/JavierPineyro/shurly.git
```
```bash
# Entra en la carpeta del proyecto
cd <NombreDelProyecto>
```

2. Instala las dependencias con el administrador de paquetes que quieras
  
  ```bash
  # usando npm:
  npm install

  # usando pnpm:
  pnpm install

  # usando yarn:
  yarn install
  ```

3. Agrega un archivo `.env` en la raíz del proyecto y crea las siguientes variables de entorno con tus credenciales de MongoDb Atlas:
 - `PORT`: El puerto donde se va a ejecutar el proyecto en desarrollo
 - `BASE`: La url base de tu página, en desarrollo es `localhost:<PORT>`
 - `DB_PASS`: Contraseña de tu base de datos de MongoDb
 - `DB_USERNAME`: Nombre de usuario de tu base de datos de MongoDb
 
 4. Ve a [`client/package.json`](https://github.com/JavierPineyro/shurly/blob/main/client/package.json) y edita la propiedad *proxy* con  la url base de tu proyecto (En desarrollo cambialo a localhost y el puerto que elegiste)
 ```json
 {
   "proxy": "example.com"
 },
```

## :robot: Comandos

Todos los comandos son ejecutados de la raíz del proyecto, desde la terminal

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Instala las dependencias                         |
| `npm start`            | Levanta el proyecto para producción              |
| `npm run dev:server`   | Inicia el servidor(desarrollo) `localhost:3333`  |
| `npm run build:ui`     | Crea la build del cliente en `/client/dist/`     |
