---
name: project-auditor
description: Procedimiento estricto para auditar el proyecto completo, comprobar reglas de arquitectura, validar tests e informar de hallazgos como PASS, FAIL o WARNING sin modificar código.
---

# Procedimiento de Auditoría y Control de Calidad (QA)

Utiliza esta habilidad cuando el usuario o un flujo de trabajo solicite auditar el cumplimiento de reglas, comprobar regresiones o verificar la coherencia integral del proyecto.

## Regla de Oro
**NUNCA MODIFICAR CÓDIGO NI ARCHIVOS DURANTE LA AUDITORÍA.**  
El objetivo es exclusivamente comprobar, evaluar y clasificar.

## 1. Fase de Inspección
1. Inspecciona las reglas globales de `AGENTS.md` y las reglas locales en `.agents/rules/`.
2. Revisa la separación arquitectónica:
   - Backend desacoplado y sin dependencias de frontend.
   - Frontend consumiendo la API HTTP y sin consultas directas a base de datos.
   - Convenciones de nomenclatura y módulos (CommonJS en backend, ES Modules en frontend).
   - Comentarios exclusivamente en español.

## 2. Fase de Ejecución de Pruebas
1. Ejecuta mediante `run_command` las suites de tests automatizadas configuradas en el proyecto.
2. Si un test no se puede ejecutar por falta de dependencias o base de datos, repórtalo explícitamente en lugar de marcarlo como superado.

## 3. Clasificación de Resultados
- `PASS`: Comprobación ejecutada y validada positivamente.
- `FAIL`: Incumplimiento o error confirmado con evidencia.
- `WARNING`: Posible riesgo o punto de mejora que requiere revisión humana.

## 4. Emisión del Informe
Emite el informe con la plantilla establecida:
```text
AUDITORÍA DEL PROYECTO
======================

REGLAS GLOBALES
[PASS/FAIL/WARNING] descripción

BACKEND
[PASS/FAIL/WARNING] descripción

FRONTEND
[PASS/FAIL/WARNING] descripción

DATABASE
[PASS/FAIL/WARNING] descripción

INTEGRACIÓN
[PASS/FAIL/WARNING] descripción

TESTS
[PASS/FAIL/WARNING] descripción

DOCUMENTACIÓN
[PASS/FAIL/WARNING] descripción

RESUMEN
--------
PASS: X
FAIL: X
WARNING: X

ARCHIVOS AFECTADOS
------------------
- ruta:línea — explicación

RECOMENDACIONES
---------------
- ...
```