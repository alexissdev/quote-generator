# Generador de Presupuestos — Braian Costa Construcciones

App web para armar y descargar presupuestos en PDF, pensada para usarse desde el celular en la obra. Corre 100% en el navegador (sin backend); el historial y el número de ticket se guardan en `localStorage`.

Además de generar el PDF, permite: compartir el presupuesto por WhatsApp con el texto ya armado, duplicar un presupuesto anterior del historial como punto de partida, buscar en el historial por obra, y exportar/importar un backup en JSON del historial y el contador de ticket. Se puede instalar como app (PWA) y sigue funcionando sin conexión.

## Stack

- Vite + React + TypeScript (`strict: true`)
- Tailwind CSS
- jsPDF (generación de PDF client-side)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrí la URL que muestra la consola (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos estáticos. Se puede:

- Subir `dist/` a cualquier hosting estático (Netlify, Vercel, GitHub Pages, un servidor propio, etc.), o
- Abrir `dist/index.html` directamente en el navegador (en este caso el service worker no se activa —requiere `http`/`https`—, así que la app funciona igual pero sin instalación ni modo offline).

Para previsualizar el build de producción localmente (con el service worker activo):

```bash
npm run preview
```

## Instalar como app (PWA)

Serví el build de producción por `http`/`https` (`npm run preview` o el hosting elegido) y abrilo desde el celular: el navegador va a ofrecer "Agregar a pantalla de inicio" / "Instalar app". Una vez instalada, sigue funcionando sin conexión (el shell de la app queda cacheado por el service worker), algo pensado para usarla en obras sin buena señal.

## Otros scripts

```bash
npm run lint    # ESLint sobre todo el proyecto
```

## Logo

El logo se guarda embebido en base64 en `src/assets/logo.ts` (así lo usan tanto la vista previa web como el PDF, sin depender de una carga de red). También hay una copia en `public/logo.png` y un recorte cuadrado en `public/favicon.png` para el ícono de pestaña. Para actualizarlo: reemplazá `public/logo.png`, y regenerá el base64 con `base64 -i public/logo.png` (o el comando equivalente) pegándolo en `LOGO_BASE64`.

## Estructura del código

- `src/domain/` — tipos, formateo y validaciones (funciones puras, sin dependencias de React).
- `src/services/storage/` — persistencia del historial y del N° de ticket (hoy en `localStorage`, reemplazable por una API sin tocar el resto de la app).
- `src/services/pdf/` — generación del PDF con jsPDF, armada en secciones componibles.
- `src/services/share/` — compartir el presupuesto por WhatsApp (`wa.me`).
- `src/services/backup/` — exportar/importar el backup del historial en JSON.
- `src/hooks/` — estado del formulario, del historial y del backup, conectado a los servicios de arriba.
- `src/components/` — componentes de presentación (`form/`, `preview/`, `layout/`, `history/`).
