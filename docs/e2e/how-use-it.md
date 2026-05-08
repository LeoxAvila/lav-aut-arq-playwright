# Manual de Uso del Framework

Guía práctica para QAs automatizadores que quieran agregar nuevos tests al arquetipo. No se requiere experiencia avanzada en TypeScript — con conocimiento básico del lenguaje y leer este documento es suficiente para empezar.

---

## Tabla de Contenidos

1. [Cómo está organizado el código](#1-cómo-está-organizado-el-código)
2. [Flujo de datos entre capas](#2-flujo-de-datos-entre-capas)
3. [Entender el reto: iframe + Shadow DOM](#3-entender-el-reto-iframe--shadow-dom)
4. [Crear un nuevo test paso a paso](#4-crear-un-nuevo-test-paso-a-paso)
5. [Crear un nuevo escenario de datos en fixture](#5-crear-un-nuevo-escenario-de-datos-en-fixture)
6. [Crear un nuevo locator en Pages](#6-crear-un-nuevo-locator-en-pages)
7. [Crear una nueva Action](#7-crear-una-nueva-action)
8. [Crear una nueva Question](#8-crear-una-nueva-question)
9. [Crear una nueva Task](#9-crear-una-nueva-task)
10. [Agregar tags a un test](#10-agregar-tags-a-un-test)
11. [Errores comunes y cómo resolverlos](#11-errores-comunes-y-cómo-resolverlos)
12. [Screenshots y evidencias visuales en Allure](#12-screenshots-y-evidencias-visuales-en-allure)

---

## 1. Cómo está organizado el código

Cada carpeta en `src/` tiene una responsabilidad única. Nunca mezcles responsabilidades entre capas.

```
src/
├── pages/       → ¿DÓNDE está el elemento?   (solo locators)
├── actions/     → ¿QUÉ hace el usuario?      (clicks, fills, selects)
├── questions/   → ¿QUÉ devuelve la pantalla? (leer texto, estados, sin assert)
├── components/  → ¿QUÉ se valida?            (solo expect())
├── tasks/       → ¿QUÉ flujo completo hace?  (orquestación del escenario)
└── fixtures/    → ¿CON QUÉ datos?            (JSON por producto)
```

**Regla de oro:** si un método tiene `expect()`, va en `components/`. Si solo lee un valor, va en `questions/`. Si hace click o fill, va en `actions/`. Si coordina varios pasos, va en `tasks/`.

---

## 2. Flujo de datos entre capas

Este es el recorrido que sigue un test de principio a fin:

```
Test (.spec.ts)
  └─ llama a ──► Task
                  └─ usa ──► Actions  ──► Pages (locators)
                  └─ usa ──► Components
                               └─ usa ──► Questions ──► Actions ──► Pages
```

Ejemplo con `flujo1-preciso.spec.ts`:

```typescript
// El test instancia la Task
const task = new SimularCreditoPreciso(page);

// La Task orquesta el flujo completo internamente
await task.ejecutar({ tipoCredito: 'PRECISO', monto: 10000, plazo: '1 año', metodo: 'FRANCES' });

// El test valida usando el Component que expone la Task
await task.resultado.validarCuotaMensualPositiva();

// O lee el valor bruto usando el Component
const resultado = await task.resultado.obtenerResultado();
console.log(resultado.cuotaMensual); // "$913,42"
```

El test **no sabe** cómo funciona el iframe, cómo se hace click en el dropdown, ni cómo se parsea el texto. Solo orquesta y valida.

---

## 3. Entender el reto: iframe + Shadow DOM

Esta es la parte más importante de este framework. La aplicación tiene dos capas de encapsulamiento:

### Capa 1 — El iframe

El simulador no corre en la página principal, sino dentro de un `<iframe class="microsite-iframe">`. Playwright no puede encontrar elementos dentro de un iframe con un `.locator()` normal — necesita un `FrameLocator`.

```typescript
// ❌ Esto no funciona — busca en la página principal, no dentro del iframe
this.page.locator('pichincha-dropdown')

// ✅ Esto sí funciona — entra al iframe primero
this.page.frameLocator('iframe.microsite-iframe').locator('pichincha-dropdown')
```

El `FrameLocator` está centralizado en `SimuladorPage` como un getter:

```typescript
// src/pages/SimuladorPage.ts
get frameLocator(): FrameLocator {
  return this.page.frameLocator('iframe.microsite-iframe');
}
```

Todos los locators de esta página usan ese getter como punto de partida:

```typescript
readonly creditTypeDropdown = () => this.frameLocator.locator('pichincha-dropdown[formcontrolname="creditType"]');
readonly loanValueInput     = () => this.frameLocator.locator('pichincha-input[formcontrolname="loanValue"]').locator('input');
```

### Capa 2 — El Shadow DOM

Los componentes `pichincha-dropdown`, `pichincha-input`, `pichincha-button`, etc. son web components de Stencil. Internamente tienen su propio árbol DOM (Shadow DOM) que está aislado del DOM principal.

**La buena noticia:** Playwright penetra el Shadow DOM automáticamente cuando usas `locator()`. No necesitas hacer nada especial para hacer click en un elemento dentro de un shadow root.

```typescript
// Playwright encuentra el <input> que vive DENTRO del Shadow DOM de <pichincha-input>
this.frameLocator.locator('pichincha-input[formcontrolname="loanValue"]').locator('input')
```

**El caso especial — leer texto:**
`textContent` no funciona en elementos Stencil porque el texto está dentro del shadow root. Hay que usar `innerText` con `frame.evaluate()`:

```typescript
// ❌ Esto retorna string vacío en componentes Stencil
await element.textContent()

// ✅ Esto funciona — ejecuta JS dentro del frame para leer innerText
const frame = await this.simuladorPage.getFrame();
const texto = await frame.evaluate(() => {
  const el = document.querySelector('pichincha-typography') as HTMLElement;
  return el?.innerText ?? '';
});
```

### Obtener el Frame como objeto nativo

Para usar `frame.evaluate()` se necesita el objeto `Frame` de Playwright, que es diferente al `FrameLocator`. El método `getFrame()` en `SimuladorPage` lo resuelve:

```typescript
// src/pages/SimuladorPage.ts
async getFrame(): Promise<Frame> {
  const frame = this.page.frame({ url: /credit-simulator/ });
  if (!frame) throw new Error('Simulator iframe not found. Is the page fully loaded?');
  return frame;
}
```

Cuando necesites leer texto de un componente Stencil, usa siempre `getFrame()` + `frame.evaluate()`.

---

## 4. Crear un nuevo test paso a paso

Tomando `flujo1-preciso.spec.ts` como referencia, así se crea un nuevo test:

### Estructura base de un spec file

```typescript
import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, step, parameter } from 'allure-js-commons';
import { SimularCreditoPreciso } from '../../src/tasks/SimularCreditoPreciso.task';
import preciso from '../../src/fixtures/credito-preciso.json';

test.describe('Flujo X: Nombre del flujo', () => {

  test('descripción del escenario', { tag: ['@smoke', '@regression', '@preciso'] }, async ({ page }) => {

    // 1. Metadata para el reporte Allure
    feature('Simulador de Crédito');
    story('Nombre de la historia');
    severity('critical'); // critical | normal | minor
    label('product', 'PRECISO');
    description('Descripción detallada de qué verifica este test.');

    // 2. Instanciar la Task
    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    // 3. Ejecutar el flujo usando steps de Allure
    await step('Nombre del paso 1', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    // 4. Validar y registrar parámetros en el reporte
    await step('Nombre del paso 2 — validación', async () => {
      await task.resultado.validarCuotaMensualPositiva();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Cuota mensual', resultado.cuotaMensual); // aparece en el reporte Allure
      console.log(`✅ Cuota mensual: ${resultado.cuotaMensual}`);
    });

  });

});
```

### Ejemplo real: agregar un quinto test a flujo1

Supongamos que quieres verificar que el método francés muestra una cuota fija (todas iguales). Agrega el test al final del `describe`, antes del `});` de cierre:

```typescript
  test('cuota mensual método francés debe ser fija en todos los períodos', { tag: ['@regression', '@preciso', '@calculos'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito PRECISO - Método Francés');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica que el método francés produce una cuota constante.');

    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    await step('Ejecutar simulación método francés', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      'FRANCES' as any,
      });
    });

    await step('Validar que la cuota mensual es un valor positivo', async () => {
      await task.resultado.validarCuotaMensualPositiva();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Cuota mensual', resultado.cuotaMensual);
    });
  });
```

> **Tip:** Siempre envuelve los pasos en `await step(...)`. Allure los muestra como pasos expandibles en el reporte, lo que facilita el diagnóstico cuando un test falla.

---

## 5. Crear un nuevo escenario de datos en fixture

Los fixtures son archivos JSON que contienen los datos de prueba. Están en `src/fixtures/`.

### Agregar un escenario nuevo al fixture existente

Edita `src/fixtures/credito-preciso.json` y agrega una nueva clave:

```json
{
  "escenario_base": { ... },
  "escenario_corto": { ... },
  "escenario_aleman": { ... },
  "escenario_monto_alto": {
    "tipoCredito": "PRECISO",
    "monto": 50000,
    "plazo": "5 años",
    "metodo": "FRANCES",
    "descripcion": "Simulación con monto alto para validar límite superior"
  }
}
```

Y en el test accede al nuevo escenario:

```typescript
import preciso from '../../src/fixtures/credito-preciso.json';

const datos = preciso.escenario_monto_alto; // ← nuevo escenario
```

### Crear un fixture para un producto nuevo

Si el producto es completamente nuevo, crea un archivo JSON en `src/fixtures/`:

```json
// src/fixtures/credito-automotriz.json
{
  "escenario_base": {
    "tipoCredito": "AUTOMOTRIZ",
    "monto": 15000,
    "plazo": "3 años",
    "metodo": "FRANCES",
    "descripcion": "Simulación crédito automotriz base"
  }
}
```

E impórtalo en el spec:

```typescript
import automotriz from '../../src/fixtures/credito-automotriz.json';
```

---

## 6. Crear un nuevo locator en Pages

Si necesitas interactuar con un elemento nuevo de la pantalla, primero agrégalo en `SimuladorPage.ts`.

### Reglas para agregar locators

- Un locator por elemento — nunca combinas dos elementos en un solo locator.
- Siempre usa `this.frameLocator` como base (el simulador está dentro del iframe).
- Los locators son funciones `() => ...` para que Playwright los evalúe en el momento del uso, no en la construcción del objeto.

```typescript
// src/pages/SimuladorPage.ts — agregar al bloque de locators existente

// Ejemplo: un campo de email que aparece en algún flujo nuevo
readonly emailInput = () => this.frameLocator.locator('pichincha-input[formcontrolname="email"]').locator('input');

// Ejemplo: un mensaje de confirmación
readonly mensajeExito = () => this.frameLocator.locator('pichincha-typography.success-message');

// Ejemplo: un botón por texto cuando no tiene atributo único
readonly btnDescargar = () => this.frameLocator.locator('button:has-text("Descargar")');
```

### Cómo encontrar el selector correcto

1. Abre las DevTools del navegador (F12).
2. Entra al iframe: en la consola, haz click en el selector de contexto y selecciona el frame `microsite-iframe`.
3. Usa el inspector para identificar el tag y los atributos del elemento.
4. Prioriza atributos de negocio sobre clases CSS: `formcontrolname`, `name`, `id`, `data-*`.

---

## 7. Crear una nueva Action

Las actions son los métodos que interactúan con la UI. Viven en `src/actions/SimuladorActions.ts`.

### Estructura de una action

```typescript
// src/actions/SimuladorActions.ts — agregar dentro de la clase SimuladorActions

async ingresarEmail(email: string): Promise<void> {
  await this.simuladorPage.emailInput().fill(email);
  await this.page.waitForTimeout(300); // pequeña pausa para que la app procese
}

async obtenerMensajeExito(): Promise<string> {
  const frame = await this.simuladorPage.getFrame();
  return await frame.evaluate(() => {
    const el = document.querySelector('pichincha-typography.success-message') as HTMLElement;
    return el?.innerText ?? '';
  });
}
```

### Cuándo usar `page.waitForTimeout()`

Los `waitForTimeout` son necesarios en esta app porque los componentes Stencil necesitan un momento para procesar eventos. Úsalos solo después de interacciones que disparan cambios en la UI (clicks en dropdowns, fills). No los uses para "esperar a que cargue" — para eso usa `waitFor()` o `waitForFunction()`.

```typescript
// ✅ Correcto: esperar a que un elemento sea visible antes de continuar
await this.simuladorPage.modalTabla().waitFor({ state: 'visible', timeout: 10_000 });

// ✅ Correcto: pequeña pausa después de una interacción con un web component
await this.simuladorPage.creditTypeDropdown().click();
await this.page.waitForTimeout(600); // el dropdown necesita tiempo para renderizar opciones

// ❌ Incorrecto: nunca uses esto para esperar cargas de página
await this.page.waitForTimeout(5000);
```

---

## 8. Crear una nueva Question

Las Questions leen el estado de la pantalla y retornan un valor. **Nunca hacen assertions**. Viven en `src/questions/`.

### Ejemplo: crear una Question para un nuevo elemento

```typescript
// src/questions/NuevoElementoQuestions.ts
import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';

export class NuevoElementoQuestions {
  private readonly actions: SimuladorActions;
  private readonly simuladorPage: SimuladorPage;

  constructor(page: Page) {
    this.simuladorPage = new SimuladorPage(page);
    this.actions       = new SimuladorActions(page, this.simuladorPage);
  }

  // Retorna string — sin assert, sin expect()
  async obtenerMensajeExito(): Promise<string> {
    return await this.actions.obtenerMensajeExito();
  }

  // Retorna boolean — sin assert
  async campoEmailEsRequerido(): Promise<boolean> {
    return await this.simuladorPage.emailInput().getAttribute('required') !== null;
  }
}
```

---

## 9. Crear una nueva Task

Una Task orquesta un flujo completo de negocio. Es lo que el test instancia. Vive en `src/tasks/`.

### Ejemplo: Task para un flujo nuevo

```typescript
// src/tasks/SimularCreditoAutomotriz.task.ts
import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';
import { ResultadoSimulacionComponent, ResultadoSimulacion } from '../components/ResultadoSimulacion.component';

export interface DatosAutomotriz {
  tipoCredito: string;
  monto: number;
  plazo: string;
  metodo: 'FRANCES' | 'ALEMAN';
}

export class SimularCreditoAutomotriz {
  private readonly actions: SimuladorActions;
  readonly resultado: ResultadoSimulacionComponent;

  constructor(page: Page) {
    const simuladorPage = new SimuladorPage(page);
    this.actions        = new SimuladorActions(page, simuladorPage);
    this.resultado      = new ResultadoSimulacionComponent(page);
  }

  async ejecutar(datos: DatosAutomotriz): Promise<ResultadoSimulacion> {
    // 1. Navegar
    await this.actions.navigateToSimulador();

    // 2. Llenar formulario
    await this.actions.seleccionarTipoCredito(datos.tipoCredito);
    await this.actions.ingresarMontoCredito(datos.monto);
    await this.actions.seleccionarPlazo(datos.plazo);

    if (datos.metodo === 'FRANCES') {
      await this.actions.seleccionarMetodoFrances();
    } else {
      await this.actions.seleccionarMetodoAleman();
    }

    // 3. Ejecutar simulación
    await this.actions.simular();

    // 4. Retornar resultado
    return await this.resultado.obtenerResultado();
  }
}
```

Y en el test:

```typescript
import { SimularCreditoAutomotriz } from '../../src/tasks/SimularCreditoAutomotriz.task';

const task = new SimularCreditoAutomotriz(page);
await task.ejecutar({ tipoCredito: 'AUTOMOTRIZ', monto: 15000, plazo: '3 años', metodo: 'FRANCES' });
await task.resultado.validarCuotaMensualPositiva();
```

---

## 10. Agregar tags a un test

Los tags van como segundo argumento en la función `test()`, dentro de un objeto con la clave `tag`:

```typescript
test('nombre del test', { tag: ['@smoke', '@regression', '@preciso'] }, async ({ page }) => {
  // ...
});
```

### Tags disponibles y cuándo usarlos

| Tag | Cuándo usarlo |
|---|---|
| `@smoke` | Solo para el test más crítico del flujo. Máximo 1 por `describe`. |
| `@regression` | En **todos** los tests sin excepción. |
| `@preciso` | Tests del producto PRECISO. |
| `@hipotecario` | Tests del producto HIPOTECARIO. |
| `@calculos` | Tests que validan cálculos financieros. |
| `@validacion` | Tests que verifican validaciones del formulario. |
| `@tabla` | Tests que abren la tabla de amortización (son los más lentos). |
| `@ui` | Tests que verifican elementos visuales sin simular. |
| `@comparacion` | Tests que comparan dos productos entre sí. |

### Ejecutar por tag

```bash
npx playwright test --grep "@smoke"
npx playwright test --grep "@preciso"
npx playwright test --grep "@regression" --grep-invert "@tabla"
```

---

## 11. Errores comunes y cómo resolverlos

### El test no encuentra el elemento dentro del iframe

**Síntoma:** `Timeout waiting for locator to be visible`

**Causa:** Estás usando `this.page.locator()` en lugar de `this.frameLocator.locator()`.

```typescript
// ❌ Busca en la página principal — el elemento no está ahí
this.page.locator('pichincha-dropdown')

// ✅ Busca dentro del iframe
this.simuladorPage.frameLocator.locator('pichincha-dropdown')
```

---

### `textContent()` retorna string vacío en componentes Stencil

**Síntoma:** La variable queda en `""` aunque visualmente hay texto en pantalla.

**Causa:** Los componentes Stencil renderizan el texto dentro del Shadow DOM. `textContent()` no lo penetra.

```typescript
// ❌ Retorna vacío
const texto = await element.textContent();

// ✅ Usa frame.evaluate() con innerText
const frame = await this.simuladorPage.getFrame();
const texto = await frame.evaluate(() => {
  const el = document.querySelector('pichincha-typography') as HTMLElement;
  return el?.innerText ?? '';
});
```

---

### El dropdown no selecciona la opción correcta

**Síntoma:** El dropdown se abre pero no hace click en la opción, o selecciona la opción equivocada.

**Causa:** El texto de la opción tiene espacios extras o hay coincidencia parcial con otra opción.

```typescript
// ❌ Puede hacer match con "HIPOTECARIO VIVIENDA NUEVA" cuando quieres "HIPOTECARIO VIVIENDA"
await this.frameLocator.getByText(tipo).click();

// ✅ Usa exact: true para evitar coincidencias parciales
await this.frameLocator.getByText(tipo, { exact: true }).first().click({ force: true });
```

---

### El iframe no carga a tiempo

**Síntoma:** `Error: Simulator iframe not found`

**Causa:** La página no terminó de cargar antes de intentar acceder al iframe.

La action `navigateToSimulador()` ya maneja esto con waits apropiados. Si el error persiste, puede ser un problema de red o disponibilidad del ambiente. El `retries: 1` en `playwright.config.ts` reintenta el test automáticamente.

---

### TypeScript marca error en el tipo del fixture

**Síntoma:** `Argument of type 'string' is not assignable to parameter of type '"FRANCES" | "ALEMAN"'`

**Causa:** TypeScript infiere el tipo del JSON como `string` genérico, pero el método espera un union type específico.

```typescript
// ❌ Error de TypeScript
metodo: datos.metodo

// ✅ Usa 'as any' para indicarle a TypeScript que confíe en el valor del fixture
metodo: datos.metodo as any
```

---

## 12. Screenshots y evidencias visuales en Allure

### Comportamiento automático — solo en fallos

`playwright.config.ts` tiene configurado `screenshot: 'only-on-failure'`. Esto significa que Playwright captura automáticamente el estado de la pantalla **solo cuando un test falla**, sin generar imágenes innecesarias en los tests que pasan.

El screenshot automático de fallo siempre está adjunto en el reporte Allure y en el reporte HTML de Playwright, sin que tengas que escribir ningún código adicional.

### Screenshots manuales en pasos críticos

Para capturar el estado en puntos clave del flujo (independientemente de si el test pasa o falla), las Tasks usan `attachment()` de `allure-js-commons` junto con `page.screenshot()`:

```typescript
import { attachment } from 'allure-js-commons';

// Dentro de un método de Task
await this.actions.navigateToSimulador();
await attachment('Simulador cargado', await this.page.screenshot(), 'image/png');

await this.formulario.llenarFormularioPreciso(datos);
await attachment('Formulario completado', await this.page.screenshot(), 'image/png');

await this.formulario.ejecutarSimulacion();
const resultado = await this.resultado.obtenerResultado();
await attachment('Resultado de simulación', await this.page.screenshot(), 'image/png');
```

Cada llamada a `attachment()` agrega una imagen nombrada en la pestaña **Attachments** del test en el reporte Allure.

### Pasos críticos capturados por defecto

Las Tasks del proyecto ya incluyen screenshots en los siguientes momentos:

| Task | Screenshot capturado |
|---|---|
| `SimularCreditoPreciso` | Simulador cargado, Formulario completado, Resultado de simulación |
| `SimularCreditoHipotecario` | Simulador cargado, Formulario completado, Resultado de simulación |
| `ValidarCalculosFinancieros` | Simulador cargado, Formulario completado, Resultado de simulación |
| `ValidarFormulario` | Tipo de crédito seleccionado |
| `NavegarAlSimulador` | Simulador cargado |

### Agregar un screenshot en una Task nueva

Cuando crees una Task nueva, sigue el mismo patrón:

```typescript
import { Page } from '@playwright/test';
import { attachment } from 'allure-js-commons'; // ← importar

export class MiNuevaTask {
  private readonly page: Page; // ← guardar referencia a page
  // ...

  constructor(page: Page) {
    this.page = page; // ← asignar en el constructor
    // ...
  }

  async ejecutar(datos: MisDatos): Promise<void> {
    await this.actions.navigateToSimulador();
    await attachment('Paso crítico 1', await this.page.screenshot(), 'image/png');

    // ... más pasos ...
    await attachment('Paso crítico 2', await this.page.screenshot(), 'image/png');
  }
}
```

> **Regla:** Captura screenshots al finalizar cada paso significativo del negocio, no en cada interacción individual. Tres imágenes bien elegidas (estado inicial, formulario lleno, resultado) aportan más valor que diez capturas de cada click.
