---
name: backend-workflow
description: Guía paso a paso para desarrollar, refactorizar o mantener endpoints y lógica de negocio en el backend Node.js/Express de este proyecto, respetando las reglas de arquitectura desacoplada.
---

# Procedimiento de Desarrollo Backend

Utiliza esta habilidad cuando el usuario solicite crear nuevos endpoints, corregir lógica de negocio del servidor o modificar la API HTTP en `backend/`.

## 1. Fase de Comprensión y Contrato
1. Inspecciona los archivos afectados en `backend/`.
2. Identifica si el cambio modifica el contrato de la API HTTP (rutas, métodos, códigos de estado o formato JSON de respuesta).
3. Si afecta a consumidores existentes (frontend), verifica el impacto y documenta las diferencias.

## 2. Fase de Planificación y Arquitectura
1. Asegúrate de que la lógica de negocio se mantenga exclusivamente en el backend.
2. Comprueba que no se introducen dependencias hacia `frontend/`.
3. Si el cambio requiere acceso a datos, utiliza la capa de acceso a datos respetando la separación con `database/`.
4. Presenta el plan detallado al usuario y solicita confirmación antes de editar archivos.

## 3. Fase de Implementación
1. Utiliza `replace_file_content` o `write_to_file` respetando:
   - Sintaxis CommonJS (`require` / `module.exports`).
   - Nombres descriptivos en `camelCase`.
   - Constantes en `UPPER_SNAKE_CASE`.
   - Comentarios exclusivamente en español.
   - Sin código ofuscado ni minificado.

## 4. Fase de Verificación
1. Ejecuta los tests de backend o scripts de comprobación mediante `run_command`:
   ```powershell
   npm --prefix backend test
   ```
2. Realiza peticiones de prueba a los endpoints con herramientas del sistema o scripts de verificación.
3. Genera el informe final con los archivos modificados, pruebas ejecutadas e incidencias detectadas.