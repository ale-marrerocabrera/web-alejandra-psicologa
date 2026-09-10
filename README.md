# Frontend — Psicóloga Alejandra

Aplicación React creada con Vite y empaquetada con Docker. El diseño de referencia se implementará en los siguientes pasos.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Producción con Docker

```bash
docker compose up --build
```

La aplicación estará disponible en `http://localhost:3000`.

La imagen construye los archivos estáticos y los sirve mediante Nginx. La configuración de Nginx también admite rutas del cliente de React.
