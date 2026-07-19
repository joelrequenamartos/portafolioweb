# Portfolio — Joel Requena · QA Automation Engineer

Web de portfolio estática (HTML/CSS/JS puro, sin dependencias), bilingüe ES/EN con tema oscuro.

## Ver en local

Abre `index.html` directamente en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Cómo editar el contenido

- **Proyectos, experiencia y skills** → [js/data.js](js/data.js). Añade un objeto al array correspondiente (con textos `es`/`en`) y aparecerá automáticamente.
- **Textos de la interfaz** (hero, sobre mí, botones) → [js/i18n.js](js/i18n.js).
- **Links de GitHub/LinkedIn** → busca `USERNAME` en `index.html` y `js/data.js` y sustitúyelo por tu usuario.
- **CV** → guarda tu PDF como `assets/cv.pdf`.
- **Colores/estilo** → variables al inicio de [css/styles.css](css/styles.css).

## Publicar (cuando decidas)

- **GitHub Pages**: sube el repo a GitHub → Settings → Pages → branch `main`, carpeta `/`. Gratis y sin build.
- **Netlify/Vercel**: arrastra la carpeta o conecta el repo. También gratis.
