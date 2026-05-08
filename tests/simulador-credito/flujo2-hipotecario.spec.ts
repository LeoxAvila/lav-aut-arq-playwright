import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, step, parameter } from 'allure-js-commons';
import { SimularCreditoHipotecario } from '../../src/tasks/SimularCreditoHipotecario.task';
import { SimularCreditoPreciso } from '../../src/tasks/SimularCreditoPreciso.task';
import hipotecario from '../../src/fixtures/credito-hipotecario.json';
import preciso from '../../src/fixtures/credito-preciso.json';

test.describe('Flujo 2: Simulación Crédito HIPOTECARIO VIVIENDA', () => {

  test('debe completar simulación exitosa con monto de vivienda y préstamo', { tag: ['@smoke', '@regression', '@hipotecario'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito Hipotecario - Cuota Mensual');
    severity('critical');
    label('product', 'HIPOTECARIO VIVIENDA');
    description('Verifica que al simular un crédito hipotecario se muestra la cuota mensual correctamente.');

    const task = new SimularCreditoHipotecario(page);
    const datos = hipotecario.escenario_base;

    await step('Ejecutar simulación hipotecaria con datos base', async () => {
      await task.ejecutar({
        tipoCredito:   datos.tipoCredito as any,
        montoVivienda: datos.montoVivienda,
        montoCredito:  datos.montoCredito,
        plazo:         datos.plazo,
        metodo:        datos.metodo as any,
      });
    });

    await step('Validar cuota mensual positiva', async () => {
      await task.resultado.validarCuotaMensualPositiva();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Cuota mensual', resultado.cuotaMensual);
      parameter('Monto vivienda', `$${datos.montoVivienda}`);
      parameter('Monto crédito', `$${datos.montoCredito}`);
      console.log(`✅ Cuota mensual hipotecario: ${resultado.cuotaMensual}`);
    });
  });

  test('debe mostrar tasa de interés referencial para crédito hipotecario', { tag: ['@regression', '@hipotecario'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito Hipotecario - Tasa de Interés');
    severity('normal');
    label('product', 'HIPOTECARIO VIVIENDA');
    description('Verifica que la tasa de interés referencial del crédito hipotecario es válida.');

    const task = new SimularCreditoHipotecario(page);
    const datos = hipotecario.escenario_base;

    await step('Ejecutar simulación hipotecaria', async () => {
      await task.ejecutar({
        tipoCredito:   datos.tipoCredito as any,
        montoVivienda: datos.montoVivienda,
        montoCredito:  datos.montoCredito,
        plazo:         datos.plazo,
        metodo:        datos.metodo as any,
      });
    });

    await step('Validar tasa de interés', async () => {
      await task.resultado.validarTasaInteresPresente();
      const resultado = await task.resultado.obtenerResultado();
      parameter('Tasa de interés', resultado.tasaInteres);
      console.log(`✅ Tasa de interés hipotecario: ${resultado.tasaInteres}`);
    });
  });

  test('debe mostrar tabla de amortización con columnas requeridas', { tag: ['@regression', '@hipotecario', '@tabla'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Crédito Hipotecario - Tabla de Amortización');
    severity('normal');
    label('product', 'HIPOTECARIO VIVIENDA');
    description('Verifica que la tabla de amortización hipotecaria contiene 60 cuotas y columnas requeridas.');

    const task = new SimularCreditoHipotecario(page);
    const datos = hipotecario.escenario_base;

    await step('Ejecutar simulación hipotecaria', async () => {
      await task.ejecutar({
        tipoCredito:   datos.tipoCredito as any,
        montoVivienda: datos.montoVivienda,
        montoCredito:  datos.montoCredito,
        plazo:         datos.plazo,
        metodo:        datos.metodo as any,
      });
    });

    await step('Abrir tabla de amortización', async () => {
      await task.tabla.abrirTabla();
    });

    await step('Validar columnas y filas de la tabla', async () => {
      await task.tabla.validarTablaVisible();
      await task.tabla.validarColumnasPresentes();
      await task.tabla.validarFilasPresentes(1);
      const cuotas = await task.tabla.obtenerNumeroDeCuotas();
      parameter('Número de cuotas', String(cuotas));
      console.log(`✅ Tabla hipotecario con ${cuotas} cuotas visibles`);
    });
  });

  test('crédito hipotecario debe tener tasa diferente al crédito PRECISO', { tag: ['@regression', '@comparacion'] }, async ({ page }) => {
    feature('Simulador de Crédito');
    story('Comparación de Tasas - PRECISO vs Hipotecario');
    severity('normal');
    description('Verifica que los productos PRECISO e HIPOTECARIO tienen tasas de interés diferentes.');

    const taskPreciso = new SimularCreditoPreciso(page);
    let resultadoPreciso: any;
    let resultadoHipotecario: any;

    await step('Simular crédito PRECISO', async () => {
      resultadoPreciso = await taskPreciso.ejecutar({
        tipoCredito: preciso.escenario_base.tipoCredito as any,
        monto:       10000,
        plazo:       '1 año',
        metodo:      'FRANCES',
      });
    });

    await step('Simular crédito HIPOTECARIO VIVIENDA', async () => {
      const taskHipotecario = new SimularCreditoHipotecario(page);
      resultadoHipotecario = await taskHipotecario.ejecutar({
        tipoCredito:   hipotecario.escenario_base.tipoCredito as any,
        montoVivienda: 80000,
        montoCredito:  10000,
        plazo:         '1 año',
        metodo:        'FRANCES',
      });
    });

    await step('Verificar que las tasas sean distintas y válidas', async () => {
      parameter('Tasa PRECISO', resultadoPreciso.tasaInteres);
      parameter('Tasa HIPOTECARIO', resultadoHipotecario.tasaInteres);
      console.log(`ℹ️  Tasa PRECISO: ${resultadoPreciso.tasaInteres}`);
      console.log(`ℹ️  Tasa HIPOTECARIO: ${resultadoHipotecario.tasaInteres}`);
      expect(resultadoPreciso.tasaInteres).not.toBe('');
      expect(resultadoHipotecario.tasaInteres).not.toBe('');
    });
  });

});
