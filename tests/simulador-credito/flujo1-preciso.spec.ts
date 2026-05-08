import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, step, parameter } from 'allure-js-commons';
import { SimularCreditoPreciso } from '../../src/tasks/SimularCreditoPreciso.task';
import preciso from '../../src/fixtures/credito-preciso.json';

test.describe('Flujo 1: Simulación Crédito PRECISO', () => {

  test('debe completar simulación exitosa y mostrar cuota mensual', { tag: ['@smoke', '@regression', '@preciso'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito PRECISO - Cuota Mensual');
    severity('critical');
    label('product', 'PRECISO');
    description('Verifica que al simular un crédito PRECISO se muestra la cuota mensual correctamente.');

    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    await step('Ejecutar simulación con datos base PRECISO', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    await step('Validar cuota mensual positiva', async () => {
      await task.resultado.validarCuotaMensualPositiva();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Cuota mensual', resultado.cuotaMensual);
      console.log(`✅ Cuota mensual: ${resultado.cuotaMensual}`);
    });
  });

  test('debe mostrar tasa de interés referencial válida', { tag: ['@regression', '@preciso'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito PRECISO - Tasa de Interés');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica que la tasa de interés referencial del crédito PRECISO es válida y positiva.');

    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    await step('Ejecutar simulación PRECISO', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    await step('Validar tasa de interés presente y positiva', async () => {
      await task.resultado.validarTasaInteresPresente();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Tasa de interés', resultado.tasaInteres);
      console.log(`✅ Tasa de interés: ${resultado.tasaInteres}`);
    });
  });

  test('debe mostrar tabla de amortización con filas correctas', { tag: ['@regression', '@preciso', '@tabla'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito PRECISO - Tabla de Amortización');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica que la tabla de amortización se abre y contiene 12 filas para un plazo de 1 año.');

    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    await step('Ejecutar simulación PRECISO', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    await step('Abrir tabla de amortización', async () => {
      await task.tabla.abrirTabla();
    });

    await step('Validar columnas y filas de la tabla', async () => {
      await task.tabla.validarTablaVisible();
      await task.tabla.validarColumnasPresentes();
      await task.tabla.validarFilasPresentes(12);
      const cuotas = await task.tabla.obtenerNumeroDeCuotas();
      parameter('Número de cuotas', String(cuotas));
      console.log(`✅ Tabla de amortización con ${cuotas} cuotas`);
    });
  });

  test('debe mostrar total a pagar mayor que el capital solicitado', { tag: ['@regression', '@preciso'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito PRECISO - Total a Pagar');
    severity('normal');
    label('product', 'PRECISO');
    description('Verifica que el total a pagar incluye intereses y es mayor al capital solicitado.');

    const task = new SimularCreditoPreciso(page);
    const datos = preciso.escenario_base;

    await step('Ejecutar simulación PRECISO', async () => {
      await task.ejecutar({
        tipoCredito: datos.tipoCredito as any,
        monto:       datos.monto,
        plazo:       datos.plazo,
        metodo:      datos.metodo as any,
      });
    });

    await step('Validar total a pagar > capital solicitado', async () => {
      await task.resultado.validarTotalAPagarPresente();
      const resultado = await task.resultado.obtenerResultado();
      const totalNum  = task.resultado.parsearMoneda(resultado.totalAPagar);
      parameter('Total a pagar', resultado.totalAPagar);
      parameter('Capital solicitado', `$${datos.monto}`);
      expect(totalNum, 'El total a pagar debe ser mayor que el monto solicitado (incluye intereses)').toBeGreaterThan(datos.monto);
      console.log(`✅ Total a pagar: ${resultado.totalAPagar} > $${datos.monto}`);
    });
  });

});
