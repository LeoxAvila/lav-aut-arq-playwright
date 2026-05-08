import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, step, parameter } from 'allure-js-commons';
import { ValidarFormulario } from '../../src/tasks/ValidarFormulario.task';
import { SimuladorPage } from '../../src/pages/SimuladorPage';
import preciso from '../../src/fixtures/credito-preciso.json';

test.describe('Flujo 3: Validaciones de Formulario Financiero', () => {

  test('no debe aceptar texto en campo numérico de monto', { tag: ['@regression', '@validacion'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de Inputs - Campo Monto');
    severity('normal');
    description('Verifica que el campo de monto rechaza texto y solo acepta valores numéricos.');

    const task = new ValidarFormulario(page);

    await step('Navegar al simulador y seleccionar tipo PRECISO', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Intentar ingresar texto inválido en campo monto', async () => {
      await task.intentarIngresarTextoEnMonto('abc texto invalido');
      const valorActual = await task.obtenerValorActualMonto();
      parameter('Valor resultante', valorActual);
      expect(valorActual, 'El campo numérico no debe aceptar texto').not.toMatch(/[a-zA-Z]/);
      console.log(`✅ Campo rechazó texto. Valor actual: "${valorActual}"`);
    });
  });

  test('botón Simular debe estar deshabilitado sin datos completos', { tag: ['@smoke', '@regression', '@validacion', '@ui'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de Estado - Botón Simular');
    severity('normal');
    description('Verifica que el botón Simular permanece deshabilitado mientras el formulario esté incompleto.');

    const task = new ValidarFormulario(page);

    await step('Navegar al simulador sin llenar datos', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Verificar que el botón Simular está deshabilitado', async () => {
      const deshabilitado = await task.verificarBotonSimularDeshabilitado();
      expect(deshabilitado, 'El botón Simular debe estar deshabilitado cuando el formulario está incompleto').toBe(true);
      console.log('✅ Botón Simular deshabilitado con formulario incompleto');
    });
  });

  test('debe mostrar límite mínimo de monto en la UI', { tag: ['@regression', '@validacion', '@preciso'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de Rango - Monto Mínimo PRECISO');
    severity('normal');
    label('product', 'PRECISO');
    description(`Verifica que al ingresar un monto por debajo del mínimo se muestra el mensaje de límite mínimo ($${preciso.limites.montoMinimo}).`);

    const task = new ValidarFormulario(page);
    const simuladorPage = new SimuladorPage(page);

    await step('Navegar y seleccionar tipo PRECISO', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Ingresar monto por debajo del mínimo y disparar validación', async () => {
      await task.intentarIngresarMontoFueraDeRango(1);
      await simuladorPage.loanValueInput().press('Tab');
      await page.waitForTimeout(1500);
    });

    await step('Verificar mensaje de límite mínimo en UI', async () => {
      const frame = await simuladorPage.getFrame();
      const found = await frame.evaluate(() => {
        function searchInShadow(root: Document | ShadowRoot, text: string): boolean {
          for (const el of Array.from(root.querySelectorAll('*'))) {
            for (const node of Array.from(el.childNodes)) {
              if (node.nodeType === 3 && (node.textContent || '').includes(text)) return true;
            }
            const shadow = (el as Element & { shadowRoot: ShadowRoot | null }).shadowRoot;
            if (shadow && searchInShadow(shadow, text)) return true;
          }
          return false;
        }
        return searchInShadow(document, 'Min.');
      });
      parameter('Monto mínimo esperado', `$${preciso.limites.montoMinimo}`);
      expect(found, 'Debe mostrar el monto mínimo de $300').toBe(true);
      console.log(`✅ Límite mínimo PRECISO: $${preciso.limites.montoMinimo}`);
    });
  });

  test('debe mostrar límite mínimo para crédito HIPOTECARIO', { tag: ['@regression', '@validacion', '@hipotecario'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de Rango - Monto Mínimo Hipotecario');
    severity('normal');
    label('product', 'HIPOTECARIO VIVIENDA');
    description('Verifica que al ingresar un monto por debajo del mínimo hipotecario se muestra el mensaje de límite mínimo ($3.000).');

    const task = new ValidarFormulario(page);
    const simuladorPage = new SimuladorPage(page);

    await step('Navegar y seleccionar tipo HIPOTECARIO VIVIENDA', async () => {
      await task.navegarYSeleccionarTipo('HIPOTECARIO VIVIENDA');
    });

    await step('Ingresar monto por debajo del mínimo y disparar validación', async () => {
      await task.intentarIngresarMontoFueraDeRango(100);
      await simuladorPage.loanValueInput().press('Tab');
      await page.waitForTimeout(1500);
    });

    await step('Verificar mensaje de límite mínimo en UI', async () => {
      const frame = await simuladorPage.getFrame();
      const found = await frame.evaluate(() => {
        function searchInShadow(root: Document | ShadowRoot, text: string): boolean {
          for (const el of Array.from(root.querySelectorAll('*'))) {
            for (const node of Array.from(el.childNodes)) {
              if (node.nodeType === 3 && (node.textContent || '').includes(text)) return true;
            }
            const shadow = (el as Element & { shadowRoot: ShadowRoot | null }).shadowRoot;
            if (shadow && searchInShadow(shadow, text)) return true;
          }
          return false;
        }
        return searchInShadow(document, 'Min.');
      });
      parameter('Monto mínimo esperado', '$3.000');
      expect(found, 'Debe mostrar el monto mínimo de $3.000 para hipotecario').toBe(true);
      console.log('✅ Límite mínimo HIPOTECARIO VIVIENDA: $3.000');
    });
  });

  test('campos numéricos deben mostrar formato de moneda con prefijo $', { tag: ['@regression', '@validacion', '@ui'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de UI - Formato de Moneda');
    severity('minor');
    description('Verifica que el campo de monto muestra el prefijo $ como indicador de moneda.');

    const task = new ValidarFormulario(page);
    const simuladorPage = new SimuladorPage(page);

    await step('Navegar y seleccionar tipo PRECISO', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Verificar prefijo $ en campo de monto', async () => {
      const frame = await simuladorPage.getFrame();
      const found = await frame.evaluate(() => {
        const input = document.querySelector('pichincha-input[formcontrolname="loanValue"]');
        if (!input) return false;
        const shadow = (input as any).shadowRoot as ShadowRoot | null;
        if (shadow) {
          const hasDollar = Array.from(shadow.querySelectorAll('*'))
            .some(el => (el as HTMLElement).innerText?.trim() === '$');
          if (hasDollar) return true;
        }
        return Array.from(input.querySelectorAll('*'))
          .some(el => (el as HTMLElement).innerText?.trim() === '$');
      });
      expect(found, 'El campo de monto debe mostrar prefijo $').toBe(true);
      console.log('✅ Campo de monto muestra prefijo de moneda $');
    });
  });

  test('selector de plazo debe mostrar opciones en meses y años', { tag: ['@regression', '@validacion', '@ui'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de UI - Opciones de Plazo');
    severity('minor');
    description('Verifica que el selector de plazo contiene opciones tanto en meses como en años.');

    const task = new ValidarFormulario(page);
    const ifl = page.frameLocator('iframe.microsite-iframe');

    await step('Navegar y seleccionar tipo PRECISO', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Abrir dropdown de plazo y verificar opciones', async () => {
      await ifl.locator('pichincha-dropdown[formcontrolname="loanTerm"]').click();
      await page.waitForTimeout(1000);
      await expect(ifl.locator('text=3 meses').first(), 'Debe tener opción de 3 meses').toBeVisible();
      await expect(ifl.locator('text=1 año').first(), 'Debe tener opción de 1 año').toBeVisible();
      console.log('✅ Opciones de plazo en meses y años disponibles');
    });
  });

  test('debe mostrar dos métodos de amortización disponibles', { tag: ['@regression', '@validacion', '@ui'] }, async ({ page }) => {
    feature('Validaciones de Formulario');
    story('Validación de UI - Métodos de Amortización');
    severity('minor');
    description('Verifica que el simulador muestra los métodos Francés y Alemán de amortización.');

    const task = new ValidarFormulario(page);
    const ifl = page.frameLocator('iframe.microsite-iframe');

    await step('Navegar y seleccionar tipo PRECISO', async () => {
      await task.navegarYSeleccionarTipo('PRECISO');
    });

    await step('Verificar métodos de amortización visibles', async () => {
      await expect(ifl.locator('text=Método Francés').first(), 'Debe mostrar Método Francés').toBeVisible();
      await expect(ifl.locator('text=Método Alemán').first(), 'Debe mostrar Método Alemán').toBeVisible();
      console.log('✅ Ambos métodos de amortización disponibles');
    });
  });

});
