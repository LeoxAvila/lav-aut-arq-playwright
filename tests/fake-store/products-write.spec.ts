import { test, expect } from '@playwright/test';
import { feature, story, severity, label, description, attachment, step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../../src/models/fake-store/product/product-model';
import type { CreateProductModel } from '../../src/models/fake-store/product/create-product-model';
import { ProductWriteQuestions } from '../../src/questions/fake-store/ProductWriteQuestions';
import createProductPayload from '../../src/fixtures/fake-store/create-product.json';
import updateProductPayload from '../../src/fixtures/fake-store/update-product.json';
import products from '../../src/fixtures/fake-store/products.json';

test.describe('Products Write — Fake Store API', () => {

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 3 — POST /products (payload válido)
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 3: debe crear un producto con payload válido y retornar el recurso creado', { tag: ['@smoke', '@regression', '@post', '@products'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Crear Producto');
    await severity('critical');
    await label('endpoint', 'POST /products');
    await description(
      'Verifica que POST /products con un payload válido retorna status 200, un id numérico asignado ' +
      'y los campos enviados reflejados en la respuesta. ' +
      'Nota: Fake Store es una API de demo — los datos no se persisten realmente.'
    );

    const payload: CreateProductModel = createProductPayload;
    const url = '/products';

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.post(url, { data: payload });

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'POST', url: `https://fakestoreapi.com${url}`, headers: { 'Content-Type': 'application/json' }, body: payload }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones via ProductWriteQuestions ──────────────────────────
    const questions = new ProductWriteQuestions(status, body);
    await questions.validarProductoCreado(payload);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 4 — PUT /products/{id} (actualización completa)
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 4: debe actualizar un producto existente y retornar los datos actualizados', { tag: ['@smoke', '@regression', '@put', '@products'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Actualizar Producto');
    await severity('critical');
    await label('endpoint', 'PUT /products/{id}');
    await description(
      'Verifica que PUT /products/{id} con un payload válido retorna status 200 y los campos actualizados ' +
      'se reflejan en la respuesta. ' +
      'Nota: Fake Store es una API de demo — los datos no se persisten realmente.'
    );

    const randomProduct = products[Math.floor(Math.random() * products.length)] as ProductModel;
    const productId = randomProduct.id;
    const payload = updateProductPayload;
    const url = `/products/${productId}`;

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.put(url, { data: payload });

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'PUT', url: `https://fakestoreapi.com${url}`, headers: { 'Content-Type': 'application/json' }, body: payload }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones via ProductWriteQuestions ──────────────────────────
    const questions = new ProductWriteQuestions(status, body);
    await questions.validarProductoActualizado(payload);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 7 — POST /products con payload vacío (negativo)
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 7: POST con payload vacío debe retornar error de validación', { tag: ['@regression', '@post', '@products', '@negative'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Crear Producto — Payload Inválido');
    await severity('normal');
    await label('endpoint', 'POST /products');
    await description(
      '[BUG] POST /products con payload {} debería retornar HTTP 400 con mensaje de validación. ' +
      'Comportamiento actual: Fake Store acepta el payload vacío y retorna un objeto con solo id. ' +
      'Este test falla intencionalmente para registrar el defecto.'
    );

    const url = '/products';

    // ── 1. Enviar request con payload vacío ──────────────────────────────────
    const response = await request.post(url, { data: {} });

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'POST', url: `https://fakestoreapi.com${url}`, headers: { 'Content-Type': 'application/json' }, body: {} }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones esperadas (BUG: Fake Store no valida el payload) ─────
    await step('[ESPERADO] Status code debe ser 400 — payload inválido', async () => {
      await parameter('Status Code recibido', String(status));
      await parameter('Status Code esperado', '400');
      // BUG: Fake Store retorna 201 en lugar de 400 para payload sin campos obligatorios
      expect(status).toBe(400);
    });

    await step('[ESPERADO] Body debe contener mensaje de error de validación', async () => {
      await parameter('Body recibido', JSON.stringify(body));
      await parameter('Body esperado', '{ "message": "Required fields are missing" }');
      // BUG: Fake Store retorna { id: 21 } en lugar de un error descriptivo
      expect(body).toHaveProperty('message');
    });
  });

});
