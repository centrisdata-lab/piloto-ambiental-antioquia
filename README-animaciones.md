# Sistema de animaciones — Piloto Ambiental Antioquia

Guardado para reaplicar cuando vuelvas con el diseño ajustado en Canva (SVG/HTML nuevo).

## Archivos

- `animations.css` — todos los estilos de hover, tablas, entrada de slide.
- `animations.js` — la lógica JS que no se puede hacer solo con CSS (zoom al clic, resplandor que sigue el mouse, detección de scroll).

## Cómo conectarlos al nuevo archivo

1. Copia `animations.css` y `animations.js` a la carpeta del nuevo proyecto.
2. En el `<head>` del nuevo HTML: `<link rel="stylesheet" href="animations.css">`
3. Antes de `</body>`: `<script src="animations.js"></script>`
4. Asegúrate de que tu `:root` tenga estas variables (ajusta los valores a tu paleta nueva si cambió, pero **no cambies los nombres**):
   `--gold-300`, `--gold-400`, `--gold-500`, `--forest-700`, `--forest-800`, `--forest-900`, `--forest-950`, `--sand-100`, `--line`, `--radius-md`, `--shadow-md`, `--shadow-lg`

## Qué clase poner en cada tipo de elemento

| Elemento | Clase(s) | Efecto |
|---|---|---|
| Contenedor de cada slide/página | `.slide` (+ `.in-view` la añade el JS solo) | Aparece con fade + slide-up al hacer scroll hasta ella |
| Contenedor que envuelve una `<img>` | `.frame` | Esquinas doradas tipo "mira de cámara" + zoom leve al hover; clic para ampliar en el mismo lugar |
| La `<img>` dentro de `.frame` | `.ph` | (siempre junto con `.frame`, no se usa sola) |
| Tarjeta de contenido (texto, cifra, cita) | `.hv` | Elevación + zoom leve + anillo dorado difuso al hover |
| Tarjeta de color sólido (sin imagen) | `.hv hv-glow` (las dos juntas) | Todo lo de `.hv` + resplandor tenue que **sigue el mouse** dentro de la tarjeta |
| Celda de un mosaico pegado (sin gap) | `.hv-tile` | Zoom + brillo + borde dorado, sin elevación (para no romper el mosaico) |
| Título o cifra grande | `.hv-text` o `.hv-num` | Cambia a dorado con resplandor al hover |
| Etiqueta/pill | `.pill` | Ya trae el hover incluido, no requiere clase extra |
| Tabla | `<table class="table-modern">` | Header con degradado, fila de hover, fila `.total` destacada en dorado |

## Notas importantes

- **El resplandor que sigue el mouse** (`.hv-glow`) necesita el JS corriendo — si solo copias el CSS no se moverá, quedará fijo en el centro.
- **El zoom al clic en fotos** también depende del JS. Sin él, el clic no hace nada (pero el hover normal de `.frame` sí funciona solo con CSS).
- **Para PDF**: el CSS ya incluye `print-color-adjust: exact`, que es necesario para que Chrome no borre los fondos de color al exportar — si haces tu propio `@media print` en el nuevo archivo, asegúrate de mantener esa línea.
- Todos los hovers respetan `prefers-reduced-motion` (accesibilidad) y se desactivan automáticamente en `@media print`.
- Los valores de intensidad (12% de zoom, elevación de tarjetas, etc.) fueron ajustados a pedido tras varias iteraciones — si algo se ve "muy sutil" o "muy exagerado" al reconectar, son los primeros números a tocar en `animations.css`.
