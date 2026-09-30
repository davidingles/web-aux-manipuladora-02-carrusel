# Auxiliar Manipuladora del Cartón — Web Corporativa y Catálogo

Sitio web corporativo y catálogo de productos para **Auxiliar Manipuladora del Cartón, S.L.** (envases, embalajes y soluciones de cartón corrugado), con carrusel interactivo y navegación modular.

---

## 🚀 Puesta en marcha rápida (Cómo lanzarlo)

Al estar construida con **módulos de JavaScript nativos** (`<script type="module">`), la web requiere ser servida bajo protocolo HTTP para que el navegador cargue los scripts correctamente (evitando bloqueos de seguridad por CORS si se abre con doble clic como archivo local `file://`).

Elige cualquiera de las dos opciones para ponerla en marcha:

### Opción 1: Desde la terminal con `npx serve` (Recomendada)

No requiere instalar librerías permanentes en el proyecto, solo disponer de Node.js instalado en el sistema:

1. Abre tu terminal (PowerShell) en la carpeta raíz del proyecto:
   ```powershell
   cd d:\MisDevs\web-auxiliar-manipuladora\web-aux-manipuladora-02-carrusel
   ```

2. Ejecuta el servidor estático:
   ```powershell
   npx serve .
   ```
   *(o especificando un puerto fijo, por ejemplo el 3000):*
   ```powershell
   npx serve -l 3000 .
   ```

3. Abre tu navegador web en la dirección indicada en la consola:
   - Portada principal: **`http://localhost:3000`**
   - Catálogo directo: **`http://localhost:3000/catalogo/`**

Para detener el servidor en la terminal, presiona `Ctrl + C`.

---

### Opción 2: Con Visual Studio Code (Live Server)

Si trabajas con Visual Studio Code y prefieres recarga automática en el navegador cada vez que guardes cambios:

1. Instala la extensión **Live Server** (de *Ritwick Dey*) desde el panel de Extensiones (`Ctrl + Shift + X`).
2. Haz clic derecho sobre el archivo `index.html` en el explorador de archivos de VS Code.
3. Selecciona **"Open with Live Server"** (o usa el atajo `Alt + L, Alt + O`).
4. Se abrirá automáticamente tu navegador predeterminado en `http://127.0.0.1:5500`.

---

## 📁 Estructura del proyecto

El proyecto está diseñado como una web estática pura y modular, sin herramientas de compilación pesadas:

```text
├── index.html            # Portada principal (hero, carrusel, servicios, empresa, contacto)
├── catalogo/
│   └── index.html        # Página del catálogo de productos y soluciones de cartón
├── css/                  # Estilos CSS modulares y desacoplados
│   ├── reset.css         # Normalización de estilos base de navegador
│   ├── variables.css     # Tokens de diseño (paleta de colores, tipografías, medidas)
│   ├── base.css          # Estilos globales y contenedores
│   ├── components.css    # Componentes de interfaz (botones, tarjetas, carrusel)
│   ├── responsive.css    # Media queries para móviles, tablets y escritorios
│   └── page-overrides.css# Sobrescrituras y ajustes específicos de diseño
├── js/                   # Lógica JavaScript nativa (ES Modules)
│   ├── main.js           # Punto de entrada principal y control de interactividad
│   └── catalogo.js       # Comportamiento interactivo de la página de catálogo
├── assets/               # Imágenes, logotipos vectoriales e iconos
├── fonts/                # Fuentes locales tipográficas
└── .agents/              # Reglas de arquitectura, agentes y flujos de trabajo del proyecto
```

---

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica, accesible y optimizada para SEO.
- **CSS3 Vanilla**: Sistema de diseño con variables CSS (`custom properties`), diseño adaptable con CSS Grid y Flexbox.
- **JavaScript (ES Modules)**: Interactividad nativa sin dependencias externas pesadas.

---

## 📋 Reglas de desarrollo

- **Sin empaquetador obligatorio**: No requiere `npm build` ni carpetas intermedias tipo `dist/`. Lo que editas es lo que se ejecuta.
- **Convenciones**:
  - Archivos y carpetas en minúsculas y `kebab-case`.
  - Variables y funciones en `camelCase`.
  - Constantes en `UPPER_SNAKE_CASE`.
  - Comentarios del código en español.
- **Reglas del agente**: Consulta el archivo `AGENTS.md` antes de realizar cambios de arquitectura o añadir dependencias externas.
