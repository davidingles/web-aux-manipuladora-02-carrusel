---
name: database-workflow
description: Guía paso a paso para diseñar esquemas, consultas SQL, migraciones y optimizaciones de base de datos garantizando el desacoplamiento y la integridad de los datos.
---

# Procedimiento de Gestión de Base de Datos

Utiliza esta habilidad cuando el usuario solicite crear o modificar esquemas, tablas, índices, consultas SQL o migraciones en `database/`.

## 1. Fase de Comprensión y Compatibilidad
1. Analiza el esquema actual y las consultas existentes.
2. Comprueba cómo el backend consume estas tablas o consultas para evitar roturas de compatibilidad.
3. Si la operación implica cambios destructivos (`DROP`, `TRUNCATE`, `DELETE` sin condición), requiere autorización expresa del usuario antes de proceder.

## 2. Fase de Planificación
1. Si el proyecto cuenta con sistema de migraciones, planifica la nueva migración en lugar de modificar esquemas manualmente.
2. Si no hay sistema de migraciones y la complejidad lo amerita, expón las alternativas al usuario.
3. Presenta el plan y pide confirmación previa.

## 3. Fase de Implementación
1. Escribe scripts SQL claros, reproducibles y comentados exclusivamente en español.
2. Evita introducir lógica de presentación o secretos en los scripts de base de datos.

## 4. Fase de Verificación
1. Valida la sintaxis de las consultas y migraciones.
2. Comprueba que las restricciones e índices necesarios estén correctamente declarados.
3. Emite el informe de salida con el esquema afectado y las incidencias detectadas.