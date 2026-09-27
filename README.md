# Portfolio — Joel Requena · QA Automation Engineer

Web de portfolio estática (HTML/CSS/JS puro, sin dependencias), bilingüe ES/EN (detecta el idioma del navegador) con tema oscuro.

## Ver en local

Abre `index.html` directamente en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Cómo editar el contenido

- **Proyectos, experiencia y skills** → [js/data.js](js/data.js). Añade un objeto al array correspondiente (con textos `es`/`en`) y aparecerá automáticamente. Un proyecto admite `status: "wip"` (en desarrollo) o `status: "planned"` (próximamente); sin `status` cuenta como terminado. Los resúmenes de cada sección (`2 passed · 1 running`, `11 passed`) se calculan solos a partir de estos datos.
- **Textos de la interfaz** (hero, sobre mí, botones) → [js/i18n.js](js/i18n.js).
- **Links de contacto** (correo, LinkedIn, GitHub) → tarjeta de contacto en `index.html`.
- **CV** → reemplaza `assets/joelrequenaCV.pdf`.
- **Colores/estilo** → variables al inicio de [css/styles.css](css/styles.css).

## La ejecución de tests

La web se comporta como una ejecución de Playwright: cada sección es un test que pasa al llegar a ella. En pantallas anchas (≥1340px) un panel lateral muestra el progreso. `contact` falla con `missing_contact` (y la barra de progreso se pone roja) hasta que el visitante copia el correo o abre LinkedIn/GitHub; entonces pasa en el reintento y el resumen muestra cuánto ha tardado.

## Publicar (cuando decidas)

- **GitHub Pages**: sube el repo a GitHub → Settings → Pages → branch `main`, carpeta `/`. Gratis y sin build.
- **Netlify/Vercel**: arrastra la carpeta o conecta el repo. También gratis.
