# Reglas de base de datos

## Ámbito de aplicación
- Aplica a: `database/**`

## Tecnología

La base de datos debe mantenerse desacoplada de la interfaz.

La tecnología SQL concreta será la definida por el proyecto. No asumir PostgreSQL si el proyecto utiliza otra base de datos en una tarea concreta.

## Reglas

- Mantener el esquema claro y consistente.
- Evitar duplicación innecesaria de datos.
- Usar claves, índices y restricciones cuando estén justificadas.
- No introducir lógica de presentación en SQL.
- No almacenar secretos directamente en archivos versionados.
- Documentar cambios de esquema que afecten al backend.

## Migraciones

Si el proyecto dispone de sistema de migraciones:
- Usarlo.
- No modificar manualmente una base de datos de desarrollo como sustituto de una migración.
- Mantener las migraciones reproducibles.

Si no existe sistema de migraciones y una modificación lo hace necesario, detenerse y plantear la opción antes de crear una arquitectura nueva.

## Compatibilidad

Antes de cambiar tablas, columnas, tipos o restricciones:
1. Localizar consultas existentes.
2. Comprobar qué código las utiliza.
3. Identificar posibles incompatibilidades.
4. Explicar el impacto.

No eliminar ni renombrar estructuras utilizadas sin confirmación.

## Operaciones destructivas

`DROP`, `TRUNCATE` o `DELETE` sin condición requieren confirmación explícita del usuario antes de ejecutarse, incluso en desarrollo.

## Verificación

Después de un cambio:
- Validar el esquema.
- Ejecutar migraciones o comprobaciones disponibles.
- Comprobar las consultas afectadas.
- Revisar restricciones e índices.
- Informar de cualquier riesgo de compatibilidad.