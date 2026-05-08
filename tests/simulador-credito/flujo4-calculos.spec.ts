import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, step, parameter } from 'allure-js-commons';
import { ValidarCalculosFinancieros } from '../../src/tasks/ValidarCalculosFinancieros.task';
import { FinancialCalculator } from '../../src/helpers/FinancialCalculator';
import preciso from '../../src/fixtures/credito-preciso.json';

test.describe('Flujo 4: Validación de Cálculos Financieros', () => {

  test('cuota francesa calculada debe aproximarse a la del simulador', { tag: ['@smoke', '@regression', '@calculos'] }, async ({ page }) => {
    feature('Cálculos Financieros');
    story('Fórmula Francesa - Verificación Matemática');
    severity('critical');
    label('product', 'PRECISO');
    description('Verifica que la cuota mensual calculada con la fórmula francesa se aproxima (±10%) al valor del simulador.');

    const task = new ValidarCalculosFinancieros(page);
    const datos = preciso.escenario_base;
    let resultado: any;

    await step('Simular escenario base PRECISO', async () => {
      resultado = await task.simularEscenario({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    await step('Calcular cuota francesa y comparar con el simulador', async () => {
      const tasaStr = resultado.tasaInteres;
      const tasa    = FinancialCalculator.parsearTasa(tasaStr);
      const cuotaCalculada = FinancialCalculator.cuotaMensualFrances(datos.monto, tasa, 12);
      const cuotaSimulador = task.parsearMoneda(resultado.cuotaMensual);
      const dentroTolerancia = FinancialCalculator.dentroDeTolerancia(cuotaCalculada, cuotaSimulador, 0.10);

      parameter('Tasa anual', tasaStr);
      parameter('Cuota calculada (fórmula)', `$${cuotaCalculada.toFixed(2)}`);
      parameter('Cuota simulador', resultado.cuotaMensual);
      parameter('Tolerancia', '10%');

      console.log(`ℹ️  Tasa anual: ${tasaStr} (${(tasa * 100).toFixed(2)}%)`);
      console.log(`ℹ️  Cuota calculada (fórmula): $${cuotaCalculada}`);
      console.log(`ℹ️  Cuota simulador:            $${cuotaSimulador}`);

      expect(dentroTolerancia, `Cuota calculada $${cuotaCalculada} vs simulador $${cuotaSimulador} excede 10% de tolerancia`).toBe(true);
    });
  });

  test('cuota con plazo mayor debe ser menor que con plazo corto', { tag: ['@regression', '@calculos'] }, async ({ page }) => {
    feature('Cálculos Financieros');
    story('Principio Financiero - Plazo mayor = Cuota menor');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica el principio financiero: a mayor plazo, menor cuota mensual para el mismo monto y tasa.');

    const task = new ValidarCalculosFinancieros(page);
    let resultadoCorto: any;
    let resultadoLargo: any;

    await step('Simular crédito con plazo corto (6 meses)', async () => {
      resultadoCorto = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       10000,
        plazo:       '6 meses',
        metodo:      'FRANCES',
      });
    });

    await step('Simular crédito con plazo largo (1 año)', async () => {
      resultadoLargo = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       10000,
        plazo:       '1 año',
        metodo:      'FRANCES',
      });
    });

    await step('Verificar que cuota plazo largo < cuota plazo corto', async () => {
      const cuotaCorto = task.parsearMoneda(resultadoCorto.cuotaMensual);
      const cuotaLargo = task.parsearMoneda(resultadoLargo.cuotaMensual);

      parameter('Cuota 6 meses', resultadoCorto.cuotaMensual);
      parameter('Cuota 12 meses', resultadoLargo.cuotaMensual);

      console.log(`ℹ️  Cuota 6 meses:  $${cuotaCorto}`);
      console.log(`ℹ️  Cuota 12 meses: $${cuotaLargo}`);

      expect(cuotaLargo, 'A mayor plazo, la cuota mensual debe ser menor').toBeLessThan(cuotaCorto);
    });
  });

  test('método alemán primera cuota debe ser mayor que el francés', { tag: ['@regression', '@calculos'] }, async ({ page }) => {
    feature('Cálculos Financieros');
    story('Comparación Alemán vs Francés - Primera Cuota');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica que la primera cuota del método alemán es mayor que la cuota fija del método francés.');

    const task = new ValidarCalculosFinancieros(page);
    let resultadoFrances: any;
    let resultadoAleman: any;

    await step('Simular con Método Francés', async () => {
      resultadoFrances = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       10000,
        plazo:       '1 año',
        metodo:      'FRANCES',
      });
    });

    await step('Simular con Método Alemán', async () => {
      resultadoAleman = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       10000,
        plazo:       '1 año',
        metodo:      'ALEMAN',
      });
    });

    await step('Verificar que primera cuota alemán > cuota francesa', async () => {
      const cuotaFrances = task.parsearMoneda(resultadoFrances.cuotaMensual);
      const cuotaAleman  = task.parsearMoneda(resultadoAleman.cuotaMensual);

      parameter('Cuota Francés (fija)', resultadoFrances.cuotaMensual);
      parameter('Primera cuota Alemán', resultadoAleman.cuotaMensual);

      console.log(`ℹ️  Cuota Francés (fija):       $${cuotaFrances}`);
      console.log(`ℹ️  Primera cuota Alemán (alta): $${cuotaAleman}`);

      expect(cuotaAleman, 'La primera cuota del método alemán debe ser mayor que la cuota fija francesa').toBeGreaterThan(cuotaFrances);
    });
  });

  test('a mayor monto, mayor debe ser la cuota mensual', { tag: ['@regression', '@calculos'] }, async ({ page }) => {
    feature('Cálculos Financieros');
    story('Principio Financiero - Monto mayor = Cuota mayor');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica el principio financiero: a mayor monto solicitado, mayor cuota mensual con el mismo plazo.');

    const task = new ValidarCalculosFinancieros(page);
    let resultadoBajo: any;
    let resultadoAlto: any;

    await step('Simular crédito con monto bajo ($5.000)', async () => {
      resultadoBajo = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       5000,
        plazo:       '1 año',
        metodo:      'FRANCES',
      });
    });

    await step('Simular crédito con monto alto ($20.000)', async () => {
      resultadoAlto = await task.simularEscenario({
        tipoCredito: 'PRECISO',
        monto:       20000,
        plazo:       '1 año',
        metodo:      'FRANCES',
      });
    });

    await step('Verificar que cuota monto alto > cuota monto bajo', async () => {
      const cuotaBaja = task.parsearMoneda(resultadoBajo.cuotaMensual);
      const cuotaAlta = task.parsearMoneda(resultadoAlto.cuotaMensual);

      parameter('Cuota $5.000', resultadoBajo.cuotaMensual);
      parameter('Cuota $20.000', resultadoAlto.cuotaMensual);

      console.log(`ℹ️  Cuota $5.000:  $${cuotaBaja}`);
      console.log(`ℹ️  Cuota $20.000: $${cuotaAlta}`);

      expect(cuotaAlta, 'A mayor monto, la cuota debe ser mayor').toBeGreaterThan(cuotaBaja);
    });
  });

});
