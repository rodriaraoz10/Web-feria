
SOMA — textura de fondo tipo yeso

Archivos incluidos:
- soma-yeso-texture.webp: textura principal optimizada para web.
- soma-yeso-texture-defined.webp: misma textura con contraste/definición apenas reforzada.
- soma-yeso-texture.jpg: fallback JPEG.
- soma-texture-background.css: CSS listo para aplicar en .articles-page, .numbers-page o .page-textured.

Uso recomendado:
1. Copiar soma-yeso-texture.webp en public/textures/soma-yeso-texture.webp.
2. Importar o copiar el CSS.
3. Aplicar la clase page-textured al contenedor principal de la página, o usar los selectores ya incluidos.

Nota técnica:
No intentes recrear esta textura solo con CSS gradients. Los gradientes pueden simular grano, pero no las marcas irregulares de llana/yeso. Para ese efecto conviene usar imagen real o generada como asset.
