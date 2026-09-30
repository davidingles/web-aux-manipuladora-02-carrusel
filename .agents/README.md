# Guía de Agentes y Habilidades en Antigravity

Bienvenido al sistema de personalizaciones de **Google Antigravity** para este proyecto.

Esta carpeta `.agents/` es descubierta automáticamente por el motor de Antigravity en la raíz de tu proyecto.

---

## 1. Estructura de la carpeta `.agents/`

```text
.agents/
├── rules/                    # Reglas jerárquicas y específicas por área
│   ├── backend.md            # Reglas de desarrollo en backend/**
│   ├── database.md           # Reglas de diseño y SQL en database/**
│   ├── frontend.md           # Reglas de desarrollo e interfaz en frontend/**
│   └── pruebas.md            # Reglas para suites de tests
│
├── skills/                   # Habilidades activables bajo demanda (Progressive Disclosure)
│   ├── backend-workflow/     # Flujo para creación y mantenimiento de APIs
│   ├── frontend-workflow/    # Flujo para desarrollo web y test visual con browser
│   ├── database-workflow/    # Flujo para esquemas, migraciones y consultas
│   └── project-auditor/      # Procedimiento estricto de auditoría y QA
│
└── agents/                   # Subagentes especializados
    ├── backend.md            # Subagente enfocado en Node.js / Express
    ├── database.md           # Subagente enfocado en base de datos / SQL
    ├── frontend.md           # Subagente enfocado en frontend web y browser testing
    └── tester.md             # Subagente de solo lectura para auditorías
```

---

## 2. Cómo usar este sistema en Antigravity

### A. Conversación Directa (Agente Principal)
Cuando hablas en el chat de Antigravity, el agente principal lee automáticamente:
1. `AGENTS.md` (reglas globales del proyecto).
2. Los archivos dentro de `.agents/rules/`.
3. El catálogo de `.agents/skills/`.

### B. Invocación de Subagentes
- Puedes pedir en el chat: *"Delega al subagente tester una auditoría completa"* o *"Pide al subagente backend que implemente el endpoint /api/login"*.
- El subagente ejecuta de manera aislada y devuelve un informe estructurado al terminar.