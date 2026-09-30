---
name: frontend-workflow
description: Guía paso a paso para desarrollar pantallas, componentes y lógica de cliente en el frontend web, consumiendo la API HTTP y verificando visualmente en navegador con browser_subagent.
---

# Procedimiento de Desarrollo Frontend

Utiliza esta habilidad cuando el usuario solicite implementar interfaces de usuario, componentes visuales, consumo de APIs o mantenimiento en `frontend/`.

## 1. Fase de Comprensión e Inspección
1. Inspecciona la estructura en `frontend/`.
2. Revisa el contrato real de la API HTTP en `backend/` antes de consumir endpoints.
3. No dupliques lógica de negocio del backend en el cliente.

## 2. Fase de Planificación
1. Planifica la estructura manteniendo la separación de HTML, CSS y JavaScript.
2. Si existen capacidades PWA (`manifest.json`, service worker), comprueba si la tarea realmente necesita tocarlas; si no, déjalas intactas.
3. Pide confirmación al usuario antes de modificar archivos.

## 3. Fase de Implementación
1. Implementa los cambios respetando:
   - ES Modules (`import` / `export`).
   - Nombres de archivos en `kebab-case`.
   - Variables y funciones en `camelCase`.
   - Comentarios exclusivamente en español.
   - Sin utilizar Python para servir archivos web (usar `npx serve` o scripts npm).

## 4. Fase de Verificación
1. Inicia el servidor de desarrollo local o estático si no está levantado:
   ```powershell
   npx -y serve frontend -l 3000
   ```
2. Ejecuta una verificación interactiva utilizando `browser_subagent`:
   - Validar renderizado de la UI y consola limpia de errores de JavaScript.
   - Probar flujos de interacción (botones, formularios, navegación).
3. Reporta el estado de las comprobaciones realizadas.