# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flujo1-preciso.spec.ts >> Flujo 1: Simulación Crédito PRECISO >> debe completar simulación exitosa y mostrar cuota mensual
- Location: tests\flujo1-preciso.spec.ts:8:7

# Error details

```
Error: page.waitForTimeout: Test ended.
```

# Test source

```ts
  1   | import { Page } from '@playwright/test';
  2   | import { SimuladorPage } from '../pages/SimuladorPage';
  3   | 
  4   | /**
  5   |  * Actions for the Credit Simulator.
  6   |  * Contains all reusable interactions with the simulator form and results.
  7   |  * Depends on SimuladorPage for locators — SimuladorPage itself stays as a pure element map.
  8   |  */
  9   | export class SimuladorActions {
  10  |   constructor(
  11  |     private readonly page: Page,
  12  |     private readonly simuladorPage: SimuladorPage,
  13  |   ) {}
  14  | 
  15  |   async navigateToSimulador(): Promise<void> {
  16  |     await this.simuladorPage.navigate(this.simuladorPage.url);
  17  |     await this.simuladorPage.waitForPageLoad();
  18  |     await this.page.waitForSelector('iframe.microsite-iframe', { timeout: 20_000 });
  19  |     await this.simuladorPage.creditTypeDropdown().waitFor({ timeout: 30_000 });
  20  |   }
  21  | 
  22  |   async getTitle(): Promise<string> {
  23  |     return await this.page.title();
  24  |   }
  25  | 
  26  |   async seleccionarTipoCredito(tipo: string): Promise<void> {
  27  |     await this.page.evaluate(() => window.scrollTo(0, 0));
  28  |     await this.simuladorPage.creditTypeDropdown().click();
  29  |     await this.page.waitForTimeout(600);
  30  |     await this.simuladorPage.frameLocator.getByText(tipo, { exact: true }).first().click({ force: true });
  31  |     await this.page.waitForTimeout(1500);
  32  |   }
  33  | 
  34  |   async ingresarMontoCredito(monto: number): Promise<void> {
  35  |     await this.simuladorPage.loanValueInput().fill(String(monto));
> 36  |     await this.page.waitForTimeout(500);
      |                     ^ Error: page.waitForTimeout: Test ended.
  37  |   }
  38  | 
  39  |   async ingresarMontoVivienda(monto: number): Promise<void> {
  40  |     await this.simuladorPage.assetValueInput().fill(String(monto));
  41  |     await this.page.waitForTimeout(500);
  42  |   }
  43  | 
  44  |   async seleccionarPlazo(opcion: string): Promise<void> {
  45  |     await this.simuladorPage.loanTermDropdown().click();
  46  |     await this.simuladorPage.frameLocator.getByText(opcion, { exact: true }).first().click();
  47  |     await this.page.waitForTimeout(500);
  48  |   }
  49  | 
  50  |   async seleccionarMetodoFrances(): Promise<void> {
  51  |     await this.simuladorPage.metodeFrancesLabel().click();
  52  |     await this.page.waitForTimeout(300);
  53  |   }
  54  | 
  55  |   async seleccionarMetodoAleman(): Promise<void> {
  56  |     await this.simuladorPage.metodeAlemanLabel().click();
  57  |     await this.page.waitForTimeout(300);
  58  |   }
  59  | 
  60  |   async simular(): Promise<void> {
  61  |     await this.simuladorPage.btnSimular().click();
  62  |     const frame = await this.simuladorPage.getFrame();
  63  |     await frame.waitForFunction(() => {
  64  |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  65  |       return elements.some(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  66  |     }, { timeout: 20_000 });
  67  |   }
  68  | 
  69  |   async abrirTablaAmortizacion(): Promise<void> {
  70  |     await this.simuladorPage.btnVerTablaAmortizacion().waitFor({ state: 'visible', timeout: 10_000 });
  71  |     await this.simuladorPage.btnVerTablaAmortizacion().scrollIntoViewIfNeeded();
  72  |     await this.simuladorPage.btnVerTablaAmortizacion().click();
  73  |     await this.page.waitForTimeout(4000);
  74  |   }
  75  | 
  76  |   async obtenerCuotaMensualTexto(): Promise<string> {
  77  |     const frame = await this.simuladorPage.getFrame();
  78  |     return await frame.evaluate(() => {
  79  |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  80  |       const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  81  |       return dollarEls[3]?.innerText?.trim() || '';
  82  |     });
  83  |   }
  84  | 
  85  |   async obtenerTasaInteres(): Promise<string> {
  86  |     const frame = await this.simuladorPage.getFrame();
  87  |     return await frame.evaluate(() => {
  88  |       const strongs = Array.from(document.querySelectorAll('strong')) as HTMLElement[];
  89  |       const tasa = strongs.find(el => /^[0-9]+,[0-9]+%$/.test((el.innerText || '').trim()));
  90  |       return tasa?.innerText?.trim() || '';
  91  |     });
  92  |   }
  93  | 
  94  |   async obtenerTotalAPagar(): Promise<string> {
  95  |     const frame = await this.simuladorPage.getFrame();
  96  |     await frame.waitForFunction(() =>
  97  |       Array.from(document.querySelectorAll('pichincha-typography'))
  98  |         .some(el => (el as HTMLElement).innerText?.trim() === 'Total a pagar:'),
  99  |       { timeout: 15_000 },
  100 |     );
  101 |     return await frame.evaluate(() => {
  102 |       const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
  103 |       const texts = elements.map(el => (el as HTMLElement).innerText?.trim() || '');
  104 |       const idx = texts.findIndex(t => t === 'Total a pagar:');
  105 |       if (idx !== -1 && idx + 1 < texts.length) return texts[idx + 1];
  106 |       const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
  107 |       return dollarEls[dollarEls.length - 1]?.innerText?.trim() || '';
  108 |     });
  109 |   }
  110 | 
  111 |   async tablaAmortizacionEsVisible(): Promise<boolean> {
  112 |     const frame = await this.simuladorPage.getFrame();
  113 |     return await frame.evaluate(() =>
  114 |       Array.from(document.querySelectorAll('pichincha-typography'))
  115 |         .some(el => (el as HTMLElement).innerText?.includes('Fecha de pago')),
  116 |     );
  117 |   }
  118 | }
  119 | 
```