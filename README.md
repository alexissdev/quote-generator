# Generador de Presupuestos — Braian Costa Construcciones

Aplicación web para armar y descargar presupuestos en PDF, pensada para usarse desde el celular directamente en la obra. Corre **100% en el navegador**: no hay backend, no hay base de datos, no hay servidor propio que mantener. Todo el estado (historial de presupuestos, número de ticket) se guarda en el `localStorage` del navegador.

## Índice

- [Qué hace la app](#qué-hace-la-app)
- [Funcionalidades en detalle](#funcionalidades-en-detalle)
- [Stack tecnológico](#stack-tecnológico)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
- [Scripts disponibles](#scripts-disponibles)
- [Build de producción y deploy](#build-de-producción-y-deploy)
- [Instalar como app (PWA) y modo offline](#instalar-como-app-pwa-y-modo-offline)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y principios de diseño](#arquitectura-y-principios-de-diseño)
- [Personalización](#personalización)
- [Datos y privacidad](#datos-y-privacidad)
- [Limitaciones conocidas](#limitaciones-conocidas)

## Qué hace la app

Un contratista (o quien cargue el presupuesto) completa un formulario corto con los datos de un trabajo, ve una vista previa en vivo con el mismo diseño que va a tener el PDF final, y con un botón descarga un PDF profesional listo para mandarle al cliente — o lo comparte directo por WhatsApp sin descargar nada. Cada presupuesto generado queda en un historial local, numerado correlativamente (N° 001, N° 002, ...), que se puede buscar, duplicar como base para uno nuevo, o exportar/importar como backup.

No hace falta conexión a internet para generar presupuestos (salvo la primera carga de la página): tanto el armado del PDF como el guardado del historial ocurren enteramente en el dispositivo.

## Funcionalidades en detalle

### 1. Formulario de presupuesto

| Campo | Tipo | Detalle |
|---|---|---|
| Obra / Cliente | texto libre | Nombre de la obra o del cliente (ej: "Laprida"). Es obligatorio. |
| Título del trabajo | texto libre | Ej: "Pintura exterior e impermeabilización". |
| Alcance del trabajo | textarea | **Un ítem por renglón.** Cada línea no vacía se convierte en un ítem con viñeta en la vista previa y el PDF. |
| Materiales incluidos | checkbox | Si está tildado, agrega automáticamente "Materiales incluidos" como último ítem del alcance (no hace falta escribirlo a mano). |
| Valor ($) | numérico | Monto base del presupuesto, sin IVA. |
| + IVA | checkbox | Si está tildado, el valor final se calcula como el monto base + 21% de IVA, y tanto la vista previa como el PDF muestran el desglose **Subtotal / IVA (21%) / Total**. Si no está tildado, se muestra un único monto ("Valor total"). |
| % Anticipo | numérico (default 70) | Porcentaje que se pide de anticipo. El resto ("% de saldo") se calcula solo como `100 - anticipo` y aparece en el texto de condiciones de pago. |
| Validez (días) | numérico (default 15) | Cuántos días es válido el presupuesto desde la fecha de emisión. |

El botón **Descargar PDF** y **Compartir por WhatsApp** quedan deshabilitados hasta que el formulario sea válido (obra cargada, valor mayor a 0, % de anticipo entre 0 y 100, validez mayor a 0 días).

### 2. Vista previa en vivo

A medida que se completa el formulario, a la derecha (o abajo en mobile) se actualiza en tiempo real una vista previa con estética de "ficha de obra": logo de la empresa, número de presupuesto, título y obra, lista de ítems del alcance, caja destacada con el valor (con desglose de IVA si corresponde), condiciones de pago, validez y fecha de emisión. El PDF descargado tiene exactamente el mismo contenido y orden que esta vista previa.

### 3. Generación de PDF

Un clic en **Descargar PDF** arma un documento en tamaño A4 con:

- Logo de la empresa y número de presupuesto (N° 001, N° 002, ...).
- Título del trabajo, obra, y lista con viñetas del alcance.
- Caja destacada en rojo óxido con el valor (con desglose Subtotal / IVA / Total cuando corresponde).
- Condiciones de pago (anticipo/saldo) y validez del presupuesto.
- Línea de firma y aclaración para la empresa y para el cliente.
- Pie de página fijo en todas las hojas con teléfono, Instagram y sitio web de la empresa, y numeración "Página X de Y" si el documento ocupa más de una hoja.
- **Salto de página automático**: si el alcance tiene muchos ítems y no entra en una sola hoja, el PDF continúa en una página nueva con un mini-encabezado de continuación, sin cortar ningún ítem a la mitad.

El archivo se descarga con el nombre `Presupuesto_<obra>_Braian_Costa_Construcciones.pdf` (los espacios en el nombre de la obra se reemplazan por guiones bajos).

### 4. Compartir por WhatsApp

El botón **Compartir por WhatsApp** genera el PDF y abre la bandeja de compartir nativa del celular (Web Share API) con el archivo ya adjunto y un texto resumen — se elige WhatsApp (o cualquier otra app) y se envía el PDF real, sin pasar por la descarga manual. En navegadores que no soportan compartir archivos (por ejemplo, desktop), cae automáticamente al comportamiento anterior: abre `wa.me` con el texto del presupuesto precargado (ahí sí, sin el PDF adjunto, porque un link de WhatsApp no puede llevar un archivo).

### 5. Historial de presupuestos

Cada vez que se descarga un PDF, el presupuesto completo queda guardado en un historial local (hasta los últimos 20), mostrando número, obra, valor y fecha. Incluye:

- **Buscador por obra**: un campo de texto que filtra el historial a medida que se escribe (aparece solo si ya hay al menos un presupuesto guardado).
- **Duplicar**: cada entrada del historial tiene un botón "Duplicar" que precarga el formulario con esos mismos datos (obra, título, alcance, valor, IVA, condiciones), manteniendo el número de ticket actual (no reutiliza el número viejo) — útil para trabajos que se repiten con variantes.

### 6. Backup (exportar / importar)

Como todo vive en el `localStorage` del navegador (atado a un solo dispositivo/navegador), el panel de historial tiene:

- **Exportar backup**: descarga un archivo JSON con todo el historial y el número de ticket actual.
- **Importar backup**: permite volver a cargar ese archivo (por ejemplo, en otro celular, o después de borrar caché). Antes de importar pide confirmación porque **reemplaza** el historial y el número de ticket actuales, no los combina. El archivo se valida antes de aplicarse: si no tiene el formato esperado, se avisa con un mensaje y no se toca nada.

### 7. Botón "Nuevo presupuesto"

Limpia el formulario dejando precargados los ítems de alcance por defecto ("Provisión de materiales" y "Mano de obra"), e incrementa el número de ticket para el próximo presupuesto.

## Stack tecnológico

| Herramienta | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build tool y dev server |
| [React 19](https://react.dev/) + TypeScript (`strict: true`) | UI, tipado estricto en todo el proyecto (sin `any`) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos, con una paleta de colores propia (ver [Personalización](#personalización)) |
| [jsPDF](https://github.com/parallax/jsPDF) | Generación del PDF, 100% en el navegador |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Manifest + service worker para instalar la app y que funcione offline |
| ESLint (flat config) + Prettier | Lint y formato de código |

No hay backend, base de datos, ni dependencias de red en tiempo de uso (más allá de la carga inicial de la página y, opcionalmente, de las tipografías de Google Fonts).

## Cómo correr el proyecto

Requiere Node.js (18+) y npm.

```bash
npm install
npm run dev
```

Abrí la URL que muestra la consola (por defecto `http://localhost:5173`).

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con hot reload
npm run build     # Type-check + build de producción en dist/
npm run preview   # Sirve el build de producción localmente (con el service worker activo)
npm run lint      # ESLint sobre todo el proyecto
```

## Build de producción y deploy

```bash
npm run build
```

Genera la carpeta `dist/` con archivos 100% estáticos. Se puede:

- Subir `dist/` a cualquier hosting estático — **Vercel**, Netlify, GitHub Pages, un servidor propio, etc. No requiere configuración especial de servidor (no hay rutas dinámicas ni API).
- Abrir `dist/index.html` directamente como archivo local. En este caso el service worker **no** se activa (requiere `http`/`https`, no `file://`), así que la app funciona igual pero sin instalación como PWA ni modo offline.

Para previsualizar el build de producción localmente con el service worker activo:

```bash
npm run preview
```

### Deploy a Vercel

Al ser un proyecto Vite estándar, Vercel lo detecta automáticamente: solo hace falta conectar el repositorio. Comando de build `npm run build`, carpeta de salida `dist`. Una vez deployado, el sitio ya sirve por HTTPS, así que la instalación como PWA y el modo offline funcionan sin pasos extra.

## Instalar como app (PWA) y modo offline

Una vez que la app se sirve por `http`/`https` (con `npm run preview`, o ya deployada), abrila desde el celular: el navegador va a ofrecer "Agregar a pantalla de inicio" / "Instalar app" (Chrome/Android) o "Compartir → Agregar a pantalla de inicio" (Safari/iOS).

Una vez instalada:

- Abre como una app nativa, sin la barra de direcciones del navegador.
- **Sigue funcionando sin conexión**: el shell de la app (HTML, JS, CSS, logo) queda cacheado por el service worker, así que se puede seguir generando y descargando presupuestos aunque no haya señal en la obra. El historial vive en `localStorage`, que tampoco depende de la conexión.

## Estructura del proyecto

```
src/
  domain/              → Tipos, constantes, formateo y validaciones. Funciones puras,
                          sin dependencias de React ni del DOM.
    types.ts              Quote, ScopeItem, PaymentTerms, HistoryEntry, BackupPayload
    constants.ts           Nombre y contacto de la empresa (fijos), valores por defecto
    formatters.ts           formatMoney, formatDate, parseScopeText, buildWhatsappText, etc.
    validators.ts           Validación de campos + parseo seguro de un backup importado

  services/
    storage/QuoteRepository.ts   Interfaz + implementación en localStorage del historial
                                  y el contador de ticket (reemplazable por una API real
                                  sin tocar el resto de la app)
    pdf/                          Generación del PDF con jsPDF
      PdfGenerator.ts                Orquesta las secciones y arma el documento final
      sections/                      Cada función dibuja una parte del PDF (header, scope,
                                      pricing, footer, signature) y devuelve el Y donde
                                      sigue el contenido — agregar una sección nueva no
                                      requiere tocar las existentes
    share/ShareService.ts          Comparte el PDF vía Web Share API, con fallback a wa.me
    backup/BackupService.ts        Exporta/lee el archivo JSON de backup

  hooks/
    useQuoteForm.ts        Estado del formulario, validación, y el Quote derivado
    useQuoteHistory.ts     Lectura/escritura del historial vía QuoteRepository
    useBackup.ts            Exportar/importar backup vía BackupService + QuoteRepository

  components/
    form/            Inputs del formulario (SiteInput, ScopeTextarea, AmountFields, etc.)
    preview/         El "ticket" de vista previa (QuotePreview, LogoHeader, AmountBox, etc.)
    layout/          AppLayout, Header
    history/         HistoryPanel, HistoryItem, BackupActions

  assets/logo.ts     Logo de la empresa embebido en base64 (usado por la vista previa y el PDF)
  App.tsx            Composition root: conecta los hooks con los servicios de PDF/WhatsApp/backup
  main.tsx
  index.css          Directivas de Tailwind + paleta de colores propia

public/
  logo.png, favicon.png, pwa-*.png   Copias del logo para uso web/PWA
```

## Arquitectura y principios de diseño

El código sigue SRP y Open/Closed de forma deliberada:

- **Los componentes de React son puramente presentacionales**: reciben props y disparan callbacks; no llaman a `jsPDF`, `localStorage`, ni `wa.me` directamente.
- **Toda la lógica de negocio y el formateo viven en `domain/`**, como funciones puras sin dependencias de React — testeables de forma aislada aunque hoy no haya tests escritos.
- **Los servicios se exponen como interfaces con una implementación por defecto** (`QuoteRepository`, `PdfGenerator`, `ShareService`, `BackupService`), inyectadas con un valor por defecto en los hooks. Esto permite reemplazar, por ejemplo, `localStorage` por una API real sin tocar componentes ni hooks.
- **La generación del PDF está armada en secciones componibles** (`drawHeader`, `drawScope`, `drawPricing`, `drawFooter`, `drawSignature`), cada una una función pura que dibuja su parte y devuelve dónde debe continuar la siguiente. Agregar una sección nueva, o cambiar el orden, no requiere reescribir las existentes.

Todo el código (variables, funciones, tipos, nombres de archivo) está en inglés; el único texto en español es el que ve el usuario final: labels del formulario, botones, mensajes de error/confirmación, el contenido del PDF, y el mensaje de WhatsApp.

## Personalización

| Qué cambiar | Dónde |
|---|---|
| Nombre de la empresa | `COMPANY_NAME` en `src/domain/constants.ts` |
| Teléfono / Instagram / sitio web | `COMPANY_CONTACT` en `src/domain/constants.ts` |
| % de IVA | `TAX_PERCENTAGE` en `src/domain/formatters.ts` |
| % de anticipo y días de validez por defecto | `DEFAULT_DEPOSIT_PERCENTAGE` / `DEFAULT_VALIDITY_DAYS` en `src/domain/constants.ts` |
| Ítems de alcance precargados en "Nuevo presupuesto" | `DEFAULT_SCOPE_TEXT` en `src/domain/constants.ts` |
| Logo | Reemplazar `public/logo.png`, regenerar el base64 (`base64 -i public/logo.png`) y pegarlo en `LOGO_BASE64` (`src/assets/logo.ts`). También conviene actualizar `public/favicon.png` y los íconos `public/pwa-*.png` para que coincidan. |
| Colores (paleta petróleo/hueso/óxido) | Variables `--color-petrol-*`, `--color-bone-*`, `--color-rust-*` en `src/index.css` |
| Tipografías | `--font-display` (títulos) y `--font-mono` (montos/números) en `src/index.css` |

## Datos y privacidad

No hay servidor: el historial de presupuestos y el número de ticket se guardan únicamente en el `localStorage` del navegador donde se usa la app. Esto significa que:

- Los datos son **locales a ese navegador/dispositivo** — no se sincronizan solos entre celular y computadora, ni entre navegadores distintos en el mismo dispositivo.
- Borrar el caché/datos del sitio en el navegador borra el historial. Por eso conviene exportar un backup (JSON) de vez en cuando, especialmente antes de cambiar de celular.
- Nada de la información cargada se envía a ningún servidor de terceros (salvo, obviamente, al compartir manualmente por WhatsApp).

## Limitaciones conocidas

- El bundle de producción incluye jsPDF (con sus dependencias `html2canvas` y `dompurify`), lo que deja el chunk principal en ~770 KB sin comprimir (~320 KB con gzip). No afecta la experiencia de uso normal, pero Vite avisa sobre el tamaño en el build.
- El modo offline / instalación como PWA requiere que la app se sirva por `http`/`https`; no funciona abriendo `dist/index.html` como archivo local.
- El historial guarda como máximo los últimos 20 presupuestos; los más viejos se descartan automáticamente al agregar uno nuevo.
