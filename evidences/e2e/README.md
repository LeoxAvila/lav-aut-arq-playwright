# Evidencias de Ejecución — Simulador de Crédito

Guía rápida para el evaluador sobre dónde encontrar los reportes y evidencias visuales.

---

## 1. Reporte de Ejecución

**Ruta:** `evidences/e2e/simulator-reports/html/index.html`

Abre este archivo directamente en el navegador (doble click). Contiene:

- Total de pruebas ejecutadas y tasa de éxito / fallo
- Tiempo de ejecución por prueba
- Videos de flujo completo por test *(ver nota abajo)*
- Screenshots automáticos en cada test fallido
- Traces descargables para debugging

> No requiere servidor ni instalación adicional — es un archivo HTML estático generado por Playwright.

### Videos de flujos completos

Los videos están embebidos directamente en el reporte HTML de Playwright. Para verlos:

1. Abre `evidences/e2e/simulator-reports/html/index.html` en el navegador
2. Haz click en cualquier test
3. En el panel lateral, sección **Videos**, se reproduce el flujo E2E completo

Esta es una funcionalidad nativa de Playwright — cada test graba automáticamente el video completo de su ejecución desde navegación hasta el resultado final.

---

## 2. Evidencias Visuales Completas — Allure Report

**Ruta:** `evidences/e2e/simulator-allure-report/index.html`

El reporte Allure centraliza todas las evidencias visuales: screenshots de pasos críticos, videos y traces.

> **Importante:** El reporte Allure debe abrirse desde un servidor HTTP local — los navegadores bloquean sus recursos si se abre directamente como archivo. Ejecuta desde la raíz del proyecto:

```bash
npx allure open evidences/e2e/simulator-allure-report
```

Una vez abierto, para ver las evidencias de un test:

1. Navega a **Suites** → selecciona el flujo → haz click en el test
2. Pestaña **Attachments** → verás los adjuntos nombrados por paso

### Qué contiene cada test en Allure

| Evidencia | Descripción |
|---|---|
| **Simulador cargado** | Screenshot del estado inicial del formulario |
| **Formulario completado** | Screenshot con todos los datos ingresados antes de simular |
| **Resultado de simulación** | Screenshot con la cuota mensual y resultado visible en pantalla |
| **Screenshot de fallo** | Capturado automáticamente si el test falla (solo en fallos) |
| **Video** `.webm` | Grabación completa del flujo |
| **Trace** `.zip` | Trace de Playwright — abre con `npx playwright show-trace <archivo>` |

---

## Resumen de la suite ejecutada

| Suite | Tests | Descripción |
|---|---|---|
| `flujo1-preciso` | 4 | Crédito PRECISO — cuota, tasa, tabla de amortización, total a pagar |
| `flujo2-hipotecario` | 4 | Crédito HIPOTECARIO — cuota, tasa, tabla, comparación entre productos |
| `flujo3-validaciones` | 7 | Validaciones de formulario, UI y límites mínimos |
| `flujo4-calculos` | 4 | Cálculos financieros — cuota francesa, método alemán, proporcionalidad |
| **Total** | **19** | |
