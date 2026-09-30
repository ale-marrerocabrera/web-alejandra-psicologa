# Frontend — Psicóloga Alejandra

Aplicación React creada con Vite y empaquetada con Docker. El diseño de referencia se implementará en los siguientes pasos.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

El frontend consulta por defecto la API en `http://localhost:8080`. Para cambiarla, crea un archivo `.env` con `VITE_API_URL=<url-de-la-api>` antes de iniciar Vite o construir la imagen.

## Producción con Docker

La configuración de esta rama está preparada para que el Nginx del servidor
publique el frontend y redirija `/api/` al backend bajo el mismo dominio. Por
ello, la imagen se construye con `VITE_API_URL` vacío y las peticiones se
realizan contra rutas relativas como `/api/content`.

```bash
docker compose up --build
```

El contenedor queda disponible solamente en `127.0.0.1:3000`, para que el
Nginx del servidor sea el único punto de entrada público.

La imagen construye los archivos estáticos y los sirve mediante Nginx. La configuración de Nginx también admite rutas del cliente de React.

## Contenido dinámico

Al iniciar, el frontend consulta `GET /api/content` en la URL configurada mediante `VITE_API_URL`. Si la API no está disponible o no entrega contenido, muestra un aviso de indisponibilidad y no presenta textos locales de respaldo.
