# QA E2E & API — Framework de Automatización

Framework de automatización de pruebas **end-to-end y de API** construido sobre **Playwright + TypeScript** con un patrón de diseño híbrido inspirado en Screenplay. Preparado para automatizar cualquier flujo web complejo o API REST, con soporte nativo de dos proyectos independientes —`e2e` y `api`— ejecutados desde un mismo runner y reporteados en Allure.

---

## Tabla de Contenidos

1. [Información General del Arquetipo](#1-información-general-del-arquetipo)
2. [Por qué Playwright para E2E y API](#2-por-qué-playwright-para-e2e-y-api)
3. [Requerimientos y Dependencias](#3-requerimientos-y-dependencias)
4. [Ejecución Local del Proyecto](#4-ejecución-local-del-proyecto)
5. [Pipeline CI/CD en Azure DevOps](#5-pipeline-cicd-en-azure-devops)
6. [Conclusiones y Hallazgos del Ejercicio](#6-conclusiones-y-hallazgos-del-ejercicio)

---

## 1. Información General del Arquetipo

### ¿Qué prueba?

El framework cubre dos dominios independientes, cada uno configurado como un proyecto separado en `playwright.config.ts`:

**Proyecto `e2e` — Simulador de Crédito de Banco Pichincha**

La suite cubre el simulador disponible en `https://www.pichincha.com/detalle-producto/simulador-de-credito`, una aplicación Angular con web components Stencil renderizados dentro de un `iframe`. Los escenarios contemplan:

| Suite | Descripción | Tests |
|---|---|---|
| `flujo1-preciso` | Crédito PRECISO — cuota, tasa, tabla de amortización, total a pagar | 4 |
| `flujo2-hipotecario` | Crédito HIPOTECARIO — cuota, tasa, tabla, comparación entre productos | 4 |
| `flujo3-validaciones` | Validaciones de formulario, UI y límites mínimos | 7 |
| `flujo4-calculos` | Cálculos financieros — cuota francesa, método alemán, proporcionalidad | 4 |

**Proyecto `api` — Fake Store API**

La suite cubre la [Fake Store API](https://fakestoreapi.com) como target REST de demostración. Los escenarios incluyen operaciones CRUD completas sobre el recurso `products`, con 4 casos positivos y 4 negativos (2 de ellos como bugs documentados intencionalmente):

| Caso | Endpoint | Tipo |
|---|---|---|
| Caso 1 | `GET /products/{id}` — estructura, tipos y rating válidos | Positivo |
| Caso 2 | `GET /products/category/electronics` — lista por categoría | Positivo |
| Caso 3 | `POST /products` — creación con payload válido | Positivo |
| Caso 4 | `PUT /products/{id}` — actualización completa | Positivo |
| Caso 5 | `GET /products/999999` — ID inexistente (BUG: retorna 200) | Negativo |
| Caso 6 | `GET /products/category/categoria-inexistente` — lista vacía | Negativo |
| Caso 7 | `POST /products` — payload vacío (BUG: retorna 201) | Negativo |
| Caso 8 | `GET /products?limit=5` — paginación por límite | Positivo |

### Stack tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| `@playwright/test` | ^1.59.1 | Test runner y automatización de browser |
| `TypeScript` | ^6.0.3 | Código de pruebas con tipado estático |
| `allure-playwright` | ^3.7.2 | Integración del reporter con Playwright |
| `allure-js-commons` | ^3.7.2 | Decoradores Allure (`feature`, `step`, `parameter`, etc.) |
| `allure-commandline` | ^2.40.0 | Generación de reportes desde la CLI |
| Browser | Chromium | Perfil Desktop Chrome, resolución 1440×900 |

### Arquitectura — Patrón híbrido

El framework aplica una arquitectura por capas que combina **Page Object Model** con los principios de **Screenplay**. La misma filosofía —separar *lo que el actor hace* de *lo que el actor observa*— se extiende a las pruebas de API: las **Questions** encapsulan las validaciones y los **modelos** TypeScript definen los contratos de datos.

Los dos dominios coexisten en el mismo repositorio compartiendo infraestructura común. La separación de ejecución se gestiona mediante **proyectos de Playwright** definidos en `playwright.config.ts`:

```typescript
projects: [
  {
    name: 'e2e',
    testDir: './tests/simulador-credito',
    use: { ...devices['Desktop Chrome'], baseURL: 'https://www.pichincha.com', ... },
  },
  {
    name: 'api',
    testDir: './tests/fake-store',
    use: { baseURL: 'https://fakestoreapi.com' },
  },
]
```

```
tests/
├── simulador-credito/              ← Proyecto e2e
│   ├── flujo1-preciso.spec.ts      ← Orquesta Tasks, lee Questions, valida con Components
│   ├── flujo2-hipotecario.spec.ts
│   ├── flujo3-validaciones.spec.ts
│   └── flujo4-calculos.spec.ts
│
└── fake-store/                     ← Proyecto api
    ├── products-get.spec.ts        ← Casos GET (1, 2, 5, 6, 8)
    └── products-write.spec.ts      ← Casos POST / PUT (3, 4, 7)

src/
├── pages/          Solo mapa de locators — sin lógica de interacción (E2E)
│   └── SimuladorPage.ts
│
├── actions/        Todas las interacciones UI — click, fill, select (E2E)
│   └── SimuladorActions.ts
│
├── questions/      Lectura y validación de estado — compartido E2E y API
│   ├── ResultadoSimulacionQuestions.ts    ← E2E
│   ├── TablaAmortizacionQuestions.ts      ← E2E
│   ├── FormularioEstadoQuestions.ts       ← E2E
│   └── fake-store/
│       ├── ProductQuestions.ts            ← API: validación producto individual
│       ├── ProductListQuestions.ts        ← API: validación lista de productos
│       └── ProductWriteQuestions.ts       ← API: validación POST / PUT
│
├── components/     Solo assertions — envuelve llamadas a expect() (E2E)
│   ├── ResultadoSimulacion.component.ts
│   ├── TablaAmortizacion.component.ts
│   └── FormularioCredito.component.ts
│
├── tasks/          Orquestación — combina acciones en escenarios reutilizables (E2E)
│   ├── SimularCreditoPreciso.task.ts
│   ├── SimularCreditoHipotecario.task.ts
│   ├── ValidarFormulario.task.ts
│   ├── ValidarCalculosFinancieros.task.ts
│   └── NavegarAlSimulador.task.ts
│
├── models/         Contratos TypeScript — interfaces de datos (API)
│   └── fake-store/product/
│       ├── product-model.ts
│       ├── create-product-model.ts
│       └── rating-model.ts
│
├── fixtures/       Datos de prueba — JSON por dominio
│   ├── credito-preciso.json               ← E2E
│   ├── credito-hipotecario.json           ← E2E
│   └── fake-store/
│       ├── products.json                  ← API: 20 productos de referencia
│       ├── create-product.json            ← API: payload para POST
│       └── update-product.json            ← API: payload para PUT
│
└── helpers/
    ├── BasePage.ts
    └── FinancialCalculator.ts
```

### Estrategia de tags

Los tags permiten ejecutar subconjuntos de pruebas en cualquier entorno, en cualquiera de los dos proyectos.

**Proyecto `e2e` — Simulador de Crédito**

| Tag | Alcance |
|---|---|
| `@smoke` | 1 test crítico por flujo — gate rápido para CI (4 tests) |
| `@regression` | Los 19 tests completos |
| `@preciso` | Escenarios de Crédito PRECISO |
| `@hipotecario` | Escenarios de Crédito HIPOTECARIO |
| `@calculos` | Validaciones de cálculos financieros |
| `@validacion` | Validaciones de formulario y límites |
| `@tabla` | Tests que abren la tabla de amortización (más lentos) |
| `@ui` | Verificaciones de elementos visuales sin simular |
| `@comparacion` | Test de comparación entre productos |

**Proyecto `api` — Fake Store API**

| Tag | Alcance |
|---|---|
| `@smoke` | Casos positivos críticos — gate rápido para CI (5 tests) |
| `@regression` | Los 8 casos completos (positivos + negativos + bugs) |
| `@get` | Operaciones de consulta (`GET`) |
| `@post` | Operaciones de creación (`POST`) |
| `@put` | Operaciones de actualización (`PUT`) |
| `@products` | Tests sobre el recurso `products` |
| `@category` | Tests de filtrado por categoría |
| `@pagination` | Tests de paginación y límites |
| `@negative` | Casos negativos y bugs documentados |

---

## 2. Por qué Playwright para E2E y API

### Para pruebas E2E

### Ventajas técnicas

**Soporte nativo de Shadow DOM e iframes**
Playwright resuelve `FrameLocator` y penetra el Shadow DOM sin configuración adicional. Esto es indispensable cuando la aplicación utiliza web components Stencil (`pichincha-dropdown`, `pichincha-input`, etc.) hidratados dentro de un `iframe.microsite-iframe`. La mayoría de los frameworks requieren workarounds o plugins adicionales para este caso.

**Auto-waiting confiable**
Playwright espera automáticamente a que los elementos sean accionables (visibles, habilitados, estables) antes de interactuar. En simuladores financieros donde los valores se actualizan de forma asíncrona —al cambiar tipo de crédito o plazo— esto elimina los `sleep` explícitos y reduce la inestabilidad de los tests.

**Intercepción de red para pruebas de API**
`page.route()` y `page.waitForResponse()` permiten interceptar llamadas a APIs financieras desde el navegador, lo que es útil para validar que los montos correctos son enviados al motor de cálculo y que las respuestas de error se manejan correctamente en la UI.

**Trace Viewer**
Cada test fallido captura un trace completo (snapshots del DOM, llamadas de red, logs de consola) visualizable con `npx playwright show-trace`. Fundamental para reproducir fallos intermitentes en flujos de cálculo financiero.

**Ejecución paralela con workers aislados**
Cada worker corre en un contexto de navegador completamente aislado. Esto previene contaminación de estado entre escenarios que involucran diferentes productos de crédito o montos.

### Ventajas de TypeScript

- **Seguridad en tiempo de compilación** — los errores en locators, fixtures o firmas de métodos se detectan antes de ejecutar un solo test.
- **IntelliSense completo** — autocompletado sobre `Page`, `Locator`, `FrameLocator` y todas las clases personalizadas del framework.
- **Strict null checks** — previene errores en tiempo de ejecución causados por valores de fixture faltantes o texto DOM undefined.
- **Contratos de interfaz** — `ResultadoSimulacion`, `CreditoData` garantizan que los datos de entrada y la salida de la página compartan la misma forma.

### Ventajas del patrón híbrido

- **Separación de responsabilidades** — cada capa tiene una única razón de cambio: si cambia un locator, solo se modifica `pages/`; si cambia una regla de negocio, solo se modifica `tasks/`.
- **Reutilización** — una `Task` puede ser llamada desde múltiples tests sin duplicar código.
- **Legibilidad** — los tests leen como casos de prueba en lenguaje de negocio, no como scripts de automatización.
- **Mantenibilidad** — agregar un nuevo producto de crédito requiere solo un nuevo fixture JSON y una nueva Task, sin tocar los tests existentes.

---

### Para pruebas de API

**Un único framework para toda la estrategia de calidad**

Usar Playwright para las pruebas de API consolida toda la automatización en un mismo ecosistema: misma configuración, mismo reporter Allure, mismo pipeline CI/CD y mismo conocimiento de equipo. No se requiere instalar ni mantener herramientas separadas como Postman, RestAssured o Supertest.

**`APIRequestContext` como cliente HTTP de primera clase**

Playwright expone `request` como una fixture nativa en los tests. El objeto `APIRequestContext` soporta GET, POST, PUT, DELETE, manejo de headers y body, con tipado TypeScript completo y sin dependencias adicionales (`axios`, `got` y `node-fetch` son innecesarios).

**Reporte unificado con Allure**

Los tests de API generan el mismo tipo de evidencia que los tests E2E: steps estructurados con `step()`, parámetros con `parameter()`, y attachments JSON del request y response completos. El equipo revisa una sola plataforma para ambos tipos de prueba.

**TypeScript con contratos de datos**

Los modelos TypeScript (`ProductModel`, `CreateProductModel`, `RatingModel`) garantizan en tiempo de compilación que los datos del response tienen la forma esperada, eliminando errores de acceso a propiedades inexistentes que solo aparecerían en ejecución.

**El patrón Questions adaptado a API**

Las clases `ProductQuestions`, `ProductListQuestions` y `ProductWriteQuestions` encapsulan las validaciones de respuesta exactamente como las Questions de E2E encapsulan la lectura del DOM. El spec solo orquesta: envía el request, adjunta la evidencia y delega las assertions. Esta separación facilita la reutilización, el mantenimiento y la legibilidad, y permite escalar la suite de API con el mismo patrón que la E2E.

---

## 3. Requerimientos y Dependencias

### Prerequisitos del sistema

| Requerimiento | Versión mínima | Notas |
|---|---|---|
| Node.js | >= 20.x LTS | Recomendado: v24.x |
| npm | >= 10.x | Incluido con Node.js |
| Java JRE | >= 8 | Requerido solo para generar reportes Allure |

> **Recomendación:** Usar [nvm for Windows](https://github.com/coreybutler/nvm-windows) para gestionar versiones de Node entre proyectos. En Linux/macOS usar [nvm](https://github.com/nvm-sh/nvm).

> El paquete `allure-commandline` se instala vía `npm install` como devDependency. Java debe estar disponible en el PATH del sistema para que los scripts `allure:generate` y `allure:open` funcionen correctamente.

> **Proyecto `api`:** No se requieren instalaciones adicionales. `@playwright/test` incluye soporte nativo de HTTP (`APIRequestContext`) sin dependencias extra. El único prerequisito adicional es conectividad de red al endpoint bajo prueba.

### Instalación

```bash
# 1. Navegar a la carpeta del proyecto
cd "e2e"

# 2. Instalar dependencias de Node
npm install

# 3. Verificar que Allure quedó instalado correctamente
npx allure --version

# 4. Instalar browsers de Playwright (solo Chromium)
npx playwright install chromium

# 5. Instalar dependencias del sistema operativo (solo Linux / agentes CI)
npx playwright install-deps chromium
```

> Si el comando `npx allure --version` falla, instalar Allure de forma global:
> ```bash
> npm install -g allure-commandline
> allure --version
> ```

---

## 4. Ejecución Local del Proyecto

### E2E — Simulador de Crédito

#### Ejecutar todos los escenarios

```bash
# Sin reporte Allure — usando el reporter de lista en consola
npx playwright test

# Con browser visible
npx playwright test --headed

# Usando el script de npm
npm test
```

```bash
# Con reporte Allure — generar y abrir después de la ejecución
npx playwright test
npm run allure:generate
npm run allure:open

# Generar y servir en un solo paso
npm run allure:serve
```

#### Ejecutar escenarios por tag

```bash
# Solo smoke (4 tests, gate rápido para CI)
npx playwright test --grep "@smoke"

# Suite de regresión completa
npx playwright test --grep "@regression"

# Regresión excluyendo tests de tabla (los más lentos)
npx playwright test --grep "@regression" --grep-invert "@tabla"

# Solo escenarios PRECISO
npx playwright test --grep "@preciso"

# Solo escenarios HIPOTECARIO
npx playwright test --grep "@hipotecario"

# Solo cálculos financieros
npx playwright test --grep "@calculos"

# Solo validaciones de UI
npx playwright test --grep "@ui"
```

Para combinar múltiples tags con lógica OR usar expresión regular:

```bash
# Tests de @preciso O @hipotecario
npx playwright test --grep "@preciso|@hipotecario"
```

#### Ejecutar enviando variables de ambiente

Playwright lee variables de entorno del proceso. Se pueden definir antes del comando:

```bash
# Windows PowerShell
$env:BASE_URL="https://www.pichincha.com"; npx playwright test

# Windows CMD
set BASE_URL=https://www.pichincha.com && npx playwright test

# Linux / macOS / CI
BASE_URL=https://www.pichincha.com npx playwright test
```

Para consumir la variable en `playwright.config.ts`:

```typescript
baseURL: process.env.BASE_URL ?? 'https://www.pichincha.com',
```

Otras variables de entorno útiles:

```bash
# Forzar modo headless (útil en CI)
$env:CI="true"; npx playwright test

# Cambiar número de reintentos en tiempo de ejecución
npx playwright test --retries=2

# Cambiar timeout en tiempo de ejecución
npx playwright test --timeout=90000

# Ejecutar un spec específico con variable de ambiente
$env:BASE_URL="https://staging.pichincha.com"; npx playwright test tests/simulador-credito/flujo1-preciso.spec.ts
```

#### Ejecutar pruebas en paralelo

La configuración base usa `workers: 1` para evitar condiciones de carrera en el ambiente compartido. Para habilitar paralelismo:

```bash
# Ejecutar con 2 workers en paralelo
npx playwright test --workers=2

# Ejecutar con 4 workers en paralelo
npx playwright test --workers=4

# Usar el máximo de CPUs disponibles
npx playwright test --workers=100%

# Paralelo solo para una suite específica
npx playwright test tests/simulador-credito/ --workers=2
```

> **Nota:** La ejecución paralela contra un ambiente live puede generar throttling o resultados financieros inconsistentes si los tests comparten sesión de usuario. Usar paralelismo solo cuando los escenarios son completamente independientes.

#### Comandos de reporte Allure

```bash
# Generar el reporte HTML desde allure-results/
npm run allure:generate

# Abrir el reporte generado en el navegador
npm run allure:open

# Generar y servir en un paso (no requiere Java para servir)
npm run allure:serve

# Reporte HTML nativo de Playwright (no requiere Java)
npm run test:report
```

---

### API — Fake Store

#### Ejecutar pruebas de API

```bash
# Ejecutar todos los casos de API (proyecto 'api')
npx playwright test --project=api

# Solo casos smoke de API
npx playwright test --project=api --grep "@smoke"

# Solo casos negativos y bugs documentados
npx playwright test --project=api --grep "@negative"

# Filtrar por método HTTP
npx playwright test --project=api --grep "@get"
npx playwright test --project=api --grep "@post"
npx playwright test --project=api --grep "@put"

# Ejecutar un spec específico
npx playwright test --project=api tests/fake-store/products-get.spec.ts
npx playwright test --project=api tests/fake-store/products-write.spec.ts
```

#### Reporte Allure limpio (ejecución desde cero)

> **Recomendación:** Limpiar los resultados de ejecuciones anteriores antes de generar el reporte para que contenga únicamente la ejecución actual.

**PowerShell (Windows):**

```powershell
Remove-Item -Recurse -Force allure-results, allure-report -ErrorAction SilentlyContinue
npx playwright test --project=api
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

**Bash (Linux / macOS / CI):**

```bash
rm -rf allure-results allure-report
npx playwright test --project=api
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 5. Pipeline CI/CD en Azure DevOps

### Descripción del pipeline

El siguiente `azure-pipelines.yml` ejecuta la suite `@smoke` en cada Pull Request y la regresión completa en cada merge a `main`.

```yaml
trigger:
  branches:
    include:
      - main

pr:
  branches:
    include:
      - '*'

pool:
  vmImage: 'ubuntu-latest'

variables:
  NODE_VERSION: '20.x'
  BASE_URL: 'https://www.pichincha.com'

stages:

  # ─── Stage 1: Smoke (en Pull Request) ────────────────────────────────────
  - stage: Smoke
    displayName: 'Smoke Tests — Gate de PR'
    condition: eq(variables['Build.Reason'], 'PullRequest')
    jobs:
      - job: smoke
        displayName: 'Ejecutar tests @smoke'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
            displayName: 'Instalar Node.js'

          - script: npm ci
            displayName: 'Instalar dependencias'

          - script: npx playwright install chromium --with-deps
            displayName: 'Instalar browsers de Playwright'

          - script: |
              npx playwright test --grep "@smoke" \
                --reporter=list,junit \
                --output=reports/artifacts
            displayName: 'Ejecutar smoke tests'
            env:
              BASE_URL: $(BASE_URL)
              CI: 'true'

          - task: PublishTestResults@2
            condition: always()
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'reports/*.xml'
              testRunTitle: 'Smoke — $(Build.SourceBranchName)'

          - task: PublishPipelineArtifact@1
            condition: always()
            inputs:
              targetPath: 'reports/artifacts'
              artifact: 'smoke-artifacts'

  # ─── Stage 2: Regresión (en merge a main) ────────────────────────────────
  - stage: Regression
    displayName: 'Suite de Regresión — Completa'
    condition: eq(variables['Build.SourceBranch'], 'refs/heads/main')
    jobs:
      - job: regression
        displayName: 'Ejecutar tests @regression'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(NODE_VERSION)
            displayName: 'Instalar Node.js'

          - script: npm ci
            displayName: 'Instalar dependencias'

          - script: npx playwright install chromium --with-deps
            displayName: 'Instalar browsers de Playwright'

          - script: |
              npx playwright test --grep "@regression" \
                --workers=2 \
                --retries=1 \
                --reporter=list,junit \
                --output=reports/artifacts
            displayName: 'Ejecutar regresión completa'
            env:
              BASE_URL: $(BASE_URL)
              CI: 'true'

          - script: npm run allure:generate
            displayName: 'Generar reporte Allure'
            condition: always()

          - task: PublishTestResults@2
            condition: always()
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'reports/*.xml'
              testRunTitle: 'Regresión — $(Build.BuildNumber)'

          - task: PublishPipelineArtifact@1
            condition: always()
            inputs:
              targetPath: 'allure-report'
              artifact: 'allure-report'

          - task: PublishPipelineArtifact@1
            condition: always()
            inputs:
              targetPath: 'reports/artifacts'
              artifact: 'regression-artifacts'
```

### Variables del pipeline en Azure DevOps

Definir como **Pipeline Variables** o en un **Variable Group** en la Library de Azure DevOps:

| Variable | Valor de ejemplo | Secreto |
|---|---|---|
| `BASE_URL` | `https://www.pichincha.com` | No |
| `CI` | `true` | No |

### Consideraciones clave para CI

- **`npm ci`** en lugar de `npm install` garantiza instalaciones reproducibles desde `package-lock.json`.
- **`--with-deps`** en `playwright install` instala las librerías del sistema operativo requeridas por Chromium en agentes Ubuntu.
- **Modo headless en CI** — agregar esta lógica en `playwright.config.ts` para que el pipeline corra siempre en headless:
  ```typescript
  headless: process.env.CI === 'true' ? true : false,
  ```
- **Artefactos siempre publicados** (`condition: always()`) — asegura que los traces, screenshots y videos de los tests fallidos estén disponibles para diagnóstico aunque el pipeline falle.
- **Reporter JUnit** (`--reporter=list,junit`) — permite que Azure DevOps muestre los resultados de tests nativamente en la pestaña **Tests** de la ejecución del pipeline.
- **Reporte Allure** — se publica como artefacto del pipeline y puede descargarse para abrirlo localmente o integrarse con una Azure Static Web App para historial persistente de ejecuciones.

---

## 6. Conclusiones y Hallazgos del Ejercicio

### Conclusiones técnicas

**Playwright fue la elección correcta para este caso de uso**

La aplicación del Simulador de Crédito combina tres retos técnicos simultáneos: un `iframe` embebido, web components Stencil con Shadow DOM, y actualizaciones asíncronas de valores financieros. Playwright resuelve los tres de forma nativa —`FrameLocator` para el iframe, Shadow DOM auto-piercing sin configuración adicional, y `waitForFunction` para esperar la hidratación de los resultados— lo que hubiera requerido plugins, workarounds y mayor complejidad en herramientas como Selenium o Cypress (este último con limitaciones históricas en iframes cross-origin).

**El patrón híbrido POM + Screenplay escala bien**

La separación en capas (Pages → Actions → Questions → Components → Tasks → Tests) resultó en un framework donde agregar un nuevo producto de crédito requiere solo un fixture JSON y una Task nueva, sin tocar los tests existentes. Esto valida el patrón para aplicaciones financieras donde los productos cambian frecuentemente pero la lógica de interacción es estable.

**TypeScript aporta valor real en frameworks de automatización**

Los contratos de interfaz (`CreditoData`, `ResultadoSimulacion`) detectaron en tiempo de compilación varios errores de acceso a propiedades de fixture que en JavaScript solo hubieran aparecido en ejecución. El tipado estricto sobre los retornos de Questions eliminó una categoría completa de errores de `undefined` en las assertions.

**Test deliberadamente fallido para validar el comportamiento ante fallos**

La suite incluye un test que falla de forma intencional con el objetivo de verificar el comportamiento del framework ante una falla real. Este test permite confirmar que la configuración `screenshot: 'only-on-failure'` funciona correctamente —el screenshot solo se genera cuando el test efectivamente falla— y que el archivo queda adjunto y visible tanto en el reporte HTML de Playwright como en el reporte Allure. Sirve como evidencia de que el mecanismo de captura ante falla está activo y operativo, y no como un escenario de negocio que deba pasar en producción.

### Hallazgos sobre la aplicación bajo prueba

**1. El simulador requiere estrategia de espera personalizada**

El resultado de la simulación (cuota mensual) no aparece al instante después de hacer click en "Simular". El componente `pichincha-typography` se renderiza con un breve delay asíncrono. Fue necesario implementar un `waitForFunction` que espera hasta que el texto del elemento coincida con el patrón `$X,XX` (formato monetario ecuatoriano), en lugar de confiar en el auto-waiting estándar de Playwright.

```typescript
// Estrategia necesaria — sin esto el test lee el valor antes de que el motor calcule
await frame.waitForFunction(() => {
  const el = document.querySelector('pichincha-typography.cuota-value');
  return el?.textContent?.match(/\$[\d,]+\.\d{2}/);
});
```

**2. La selección del tipo de crédito exige coincidencia exacta**

El dropdown de tipo de crédito contiene opciones como `"PRECISO"` y `"HIPOTECARIO VIVIENDA"`. Sin `exact: true` en el locator, la búsqueda por texto podría retornar coincidencias parciales en escenarios con opciones similares. Este es un hallazgo de configuración de locators aplicable a cualquier dropdown de la plataforma Pichincha.

**3. Inestabilidad intermitente por condiciones de red**

Durante la sesión de desarrollo se observaron fallos intermitentes en 4 tests distintos (visible en el historial de exit codes del terminal). Los fallos no son deterministas: el mismo test pasa y falla en ejecuciones consecutivas sin cambios de código. La causa raíz es que el simulador realiza llamadas a una API externa para obtener tasas de interés en tiempo real. Cuando la API responde lento o con variación en los valores, los assertions de cuota exacta fallan.

**Recomendación:** Interceptar la llamada a la API de tasas con `page.route()` y devolver una respuesta mock estable para los tests de regresión. Reservar la llamada real solo para los tests de integración.

**4. La tabla de amortización es el escenario más lento**

Los tests con tag `@tabla` toman significativamente más tiempo porque requieren un ciclo completo adicional: simular → abrir modal de tabla → esperar el render de todas las filas. El tag `@tabla` fue diseñado precisamente para poder excluirlos en gates de CI donde el tiempo es crítico:

```bash
npx playwright test --grep "@regression" --grep-invert "@tabla"
```

**5. El total a pagar siempre supera el capital**

En todos los escenarios probados (PRECISO y HIPOTECARIO, diferentes plazos y métodos), el total acumulado de las cuotas siempre fue mayor al capital solicitado, lo cual es el comportamiento correcto —refleja los intereses cobrados. La diferencia aumenta proporcionalmente con el plazo, validando que la fórmula de amortización es consistente con la teoría financiera.

**6. El método alemán (ALEMAN) produce cuotas decrecientes**

Los tests de `flujo4-calculos` verificaron que con sistema de amortización alemán, las cuotas decrecen período a período. El simulador implementa correctamente ambos métodos (francés = cuota fija, alemán = cuota decreciente), lo que representa una ventaja de producto para el usuario final al poder comparar opciones.

### Limitaciones identificadas — E2E

| Limitación | Descripción | Mitigación sugerida |
|---|---|---|
| Dependencia de red en tiempo real | Tests fallan si la API de tasas cambia valores o responde lento | Mockear la API con `page.route()` para regresión |
| `headless: false` en config base | El config actual abre browser visible, incompatible con CI sin cambio | Usar `process.env.CI` para togglear headless automáticamente |
| Un solo browser (Chromium) | No se valida comportamiento en Firefox o Safari | Agregar proyectos de Firefox/Safari en `playwright.config.ts` para regresión completa |
| Datos de fixture fijos | Los montos del fixture pueden quedar fuera de los límites si el producto cambia | Parametrizar rangos válidos desde variables de entorno o API de producto |

---

### Conclusiones y Hallazgos — Fake Store API

#### Conclusiones técnicas

**El patrón híbrido se adapta naturalmente a las pruebas de API**

La separación de responsabilidades que en E2E divide Pages → Actions → Questions → Components → Tasks se traduce en API como: Fixtures (datos) → Questions (validaciones) → Spec (orquestación). Cada clase `Questions` encapsula un conjunto de assertions reutilizables con steps Allure, de modo que el spec se convierte en una secuencia legible: enviar request → adjuntar evidencia → delegar validaciones. Agregar un nuevo endpoint requiere solo una nueva clase Questions y un fixture, sin duplicar assertions entre tests.

**Tests fallidos intencionalmente como herramienta de documentación de bugs**

Los Casos 5 y 7 fallan de forma deliberada. Esta técnica permite:
- Generar evidencia automática (status code recibido vs. esperado, body completo) lista para adjuntar a un ticket.
- Medir la regresión cuando el bug se corrija — el test pasará sin modificaciones de código.
- Comunicar el defecto al equipo de desarrollo de forma objetiva, reproducible y con contexto técnico completo.

**Un único framework para toda la estrategia de calidad**

Consolidar E2E y API en Playwright elimina la fragmentación de herramientas. El equipo mantiene un solo stack, un solo pipeline CI/CD, un solo reporte Allure y un único modelo mental. El costo de incorporar las pruebas de API al proyecto fue mínimo: sin nuevas dependencias, sin nueva configuración de CI, sin nueva curva de aprendizaje.

**El uso consciente de IA acelera la cobertura sin sacrificar criterio técnico**

La totalidad de los 8 casos de API —modelos TypeScript, clases Questions, fixtures JSON, refactorización del `playwright.config.ts`, tests de bugs documentados y reporte Allure— fue implementada en una sola sesión de trabajo asistido por IA (GitHub Copilot). La clave no fue delegar decisiones al modelo, sino usar la IA para ejecutar con velocidad lo que el criterio técnico ya había definido: qué validar, cómo estructurar el código, qué constituye un bug documentable y cómo evidenciarlo. El modelo aceleró la escritura; el QA determinó qué era correcto escribir.

#### Hallazgos sobre la Fake Store API

**1. La API no implementa HTTP 404 para recursos inexistentes (Caso 5)**

`GET /products/999999` retorna HTTP 200 con body vacío en lugar del estándar REST HTTP 404. Este comportamiento viola el contrato REST y dificulta la detección de errores del lado del cliente. Documentado como bug con test fallido intencionalmente.

**2. La API no valida el payload en operaciones de escritura (Caso 7)**

`POST /products` con payload `{}` retorna HTTP 201 y asigna un ID en lugar de rechazar la solicitud con HTTP 400. Esto permitiría crear recursos incompletos en una API real. Documentado como bug con test fallido intencionalmente.

**3. Los datos no se persisten entre requests**

Fake Store es una API de demostración: todos los POST y PUT retornan respuestas coherentes con los datos enviados, pero los cambios no se almacenan. Un GET posterior al mismo ID no refleja las modificaciones. Este comportamiento fue contemplado en el diseño de los tests.

**4. El POST retorna HTTP 201, no 200**

La creación de recursos retorna correctamente HTTP 201 (semánticamente correcto para REST), a diferencia de otros endpoints que retornan 200. Este hallazgo fue detectado por el test fallando con `Expected: 200 / Received: 201` y resuelto ajustando la aserción.

#### Limitaciones identificadas — API

| Limitación | Descripción | Mitigación sugerida |
|---|---|---|
| API de demostración | Fake Store no persiste datos ni implementa todos los estándares REST | Reemplazar por API real o servidor mock (json-server, WireMock) |
| Sin autenticación | Los endpoints no requieren auth — no se cubren flujos de autenticación | Agregar casos de auth cuando se use una API real con seguridad |
| Sin validación de schema | No se valida el schema completo contra un OpenAPI spec | Integrar validación con `ajv` o `zod` |
| Cobertura de un solo recurso | Solo se prueban endpoints de `products` | Extender a `carts`, `users`, `auth` siguiendo el mismo patrón de Questions |
