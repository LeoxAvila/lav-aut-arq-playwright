# Evidencias de Ejecución — Fake Store API

Guía rápida para el evaluador sobre dónde encontrar los reportes y evidencias de las pruebas de API.

---

## 1. Reporte Nativo de Playwright

**Ruta:** `evidences/api/api-reports/html/index.html`

Abre este archivo directamente en el navegador (doble click). Contiene:

- Total de pruebas ejecutadas y tasa de éxito / fallo
- Tiempo de ejecución por prueba
- Detalle de cada test con su resultado
- Detalles de fallos con mensaje de error y stack trace

> No requiere servidor ni instalación adicional — es un archivo HTML estático generado por Playwright.

---

## 2. Reporte de Evidencias Completo — Allure Report ✅ Recomendado

**Ruta:** `evidences/api/api-allure-report/index.html`

Esta es la versión enriquecida del reporte. Responde directamente a los requerimientos del reto con una interfaz más amigable al evaluador.

| Requerimiento | Dónde verlo en Allure |
|---|---|
| Total de pruebas ejecutadas | Panel principal — gráfica de resultados por suite |
| Tasa de éxito / fallo | Panel principal — porcentaje passed / failed / broken |
| Tiempo de ejecución por prueba | Vista **Suites** → columna duration por test |
| Detalles de fallos con mensaje | Vista **Suites** → test fallido → pestaña **Overview** |
| Request completo (URL, method, headers) | Vista **Suites** → test → pestaña **Attachments** → adjunto **Request** |
| Response completo (status, headers, body) | Vista **Suites** → test → pestaña **Attachments** → adjunto **Response** |
| Resultado de validaciones paso a paso | Vista **Suites** → test → pestaña **Test Body** → steps expandibles |

### Cómo navegar el reporte

1. Abre el reporte (ver instrucciones abajo)
2. En el menú lateral haz click en **Suites**
3. Expande la suite **Fake Store API**
4. Haz click en cualquier test para ver su detalle completo
5. Usa las pestañas **Test Body**, **Attachments** y **Overview**

---

## ⚠️ Cómo abrir el reporte Allure

> El reporte Allure **no puede abrirse haciendo doble click** — los navegadores bloquean sus recursos estáticos cuando se carga desde el sistema de archivos directamente (`file://`).

**Debe servirse desde un servidor HTTP local.** Ejecuta desde la raíz del proyecto:

```bash
npx allure open evidences/api/api-allure-report
```

Este comando levanta un servidor local y abre el reporte automáticamente en el navegador por defecto.

---

## Resumen de la suite ejecutada

| Spec | Caso | Descripción | Método | Resultado esperado |
|---|---|---|---|---|
| `products-get.spec.ts` | Caso 1 | Obtener producto por ID — estructura y tipos válidos | GET `/products/{id}` | ✅ Pass |
| `products-get.spec.ts` | Caso 2 | Obtener productos por categoría `electronics` | GET `/products/category/electronics` | ✅ Pass |
| `products-get.spec.ts` | Caso 5 | ID inexistente debe retornar 404 **[BUG]** | GET `/products/999999` | ❌ Fail intencional |
| `products-get.spec.ts` | Caso 6 | Categoría inexistente debe retornar lista vacía | GET `/products/category/categoria-inexistente` | ✅ Pass |
| `products-get.spec.ts` | Caso 8 | Query param `limit=5` debe retornar máximo 5 productos | GET `/products?limit=5` | ✅ Pass |
| `products-write.spec.ts` | Caso 3 | Crear producto con payload válido | POST `/products` | ✅ Pass |
| `products-write.spec.ts` | Caso 4 | Actualizar producto con payload válido | PUT `/products/{id}` | ✅ Pass |
| `products-write.spec.ts` | Caso 7 | Payload vacío `{}` debe retornar 400 **[BUG]** | POST `/products` | ❌ Fail intencional |

**Total:** 8 pruebas · 6 passed · 2 failed intencionales (bugs documentados)

### Sobre los tests fallidos

Los Casos 5 y 7 fallan de forma **deliberada**. Estas pruebas aseguran el comportamiento correcto según el estándar REST — la API bajo prueba no lo cumple:

- **Caso 5:** `GET /products/999999` debería retornar HTTP 404. La API retorna HTTP 200 con body vacío.
- **Caso 7:** `POST /products` con `{}` debería retornar HTTP 400. La API retorna HTTP 201 y asigna un ID.

Cada fallo genera evidencia completa (request adjunto, response adjunto, parámetros de comparación) lista para vincular a un ticket de defecto.
