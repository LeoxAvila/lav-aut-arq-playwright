import { test } from '@playwright/test';
import { feature, story, severity, label, description, attachment, step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../../src/models/fake-store/product/product-model';
import { ProductQuestions } from '../../src/questions/fake-store/ProductQuestions';
import { ProductListQuestions } from '../../src/questions/fake-store/ProductListQuestions';
import products from '../../src/fixtures/fake-store/products.json';

test.describe('Products GET — Fake Store API', () => {

  test('Caso 1: debe obtener un producto específico con estructura y tipos válidos', { tag: ['@smoke', '@regression', '@get', '@products'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Obtener Producto Específico');
    await severity('critical');
    await label('endpoint', 'GET /products/{id}');
    await description('Verifica que GET /products/{id} retorna status 200 y el producto tiene estructura, tipos de datos y rating correctos.');

    const randomProduct = products[Math.floor(Math.random() * products.length)] as ProductModel;
    const productId = randomProduct.id;
    const url = `/products/${productId}`;

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.get(url);

    // ── 2. Capturar datos de la respuesta ANTES de cualquier assertion ───────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel = await response.json();

    // ── 3. Adjuntar request completo ─────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response completo ────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones via ProductQuestions ─────────────────────────────────
    const questions = new ProductQuestions(status, body);
    await questions.validarProductoCompleto(productId);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 2 — GET /products/category/electronics
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 2: debe obtener todos los productos de la categoría electronics', { tag: ['@smoke', '@regression', '@get', '@products', '@category'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Obtener Productos por Categoría');
    await severity('critical');
    await label('endpoint', 'GET /products/category/electronics');
    await description('Verifica que GET /products/category/electronics retorna status 200, lista no vacía y todos los productos pertenecen a la categoría electronics.');

    const category = 'electronics';
    const url = `/products/category/${category}`;

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.get(url);

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel[] = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones via ProductListQuestions ─────────────────────────────
    const questions = new ProductListQuestions(status, body);
    await questions.validarListaPorCategoria(category);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 5 — GET /products/999999 (ID inexistente)
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 5: ID inexistente debe retornar null (comportamiento Fake Store)', { tag: ['@regression', '@get', '@products', '@negative'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Producto No Encontrado');
    await severity('normal');
    await label('endpoint', 'GET /products/999999');
    await description(
      '[BUG] GET /products/999999 debería retornar HTTP 404 con body "Object not found". ' +
      'Comportamiento actual: Fake Store retorna HTTP 200 con body vacío. ' +
      'Este test falla intencionalmente para registrar el defecto.'
    );

    const url = '/products/999999';

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.get(url);

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const rawBody = await response.text();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body: rawBody }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones esperadas (BUG: Fake Store no cumple comportamiento REST estándar) ───
    await step('[ESPERADO] Status code debe ser 404 — producto no encontrado', async () => {
      await parameter('Status Code recibido', String(status));
      await parameter('Status Code esperado', '404');
      await parameter('ID consultado', '999999');
      const { expect } = await import('@playwright/test');
      // BUG: Fake Store retorna 200 en lugar de 404 para IDs inexistentes
      expect(status).toBe(404);
    });

    await step('[ESPERADO] Body debe indicar que el objeto no fue encontrado', async () => {
      await parameter('Body recibido', rawBody || '(vacío)');
      await parameter('Body esperado', 'Object not found');
      const { expect } = await import('@playwright/test');
      // BUG: Fake Store retorna body vacío en lugar de mensaje de error descriptivo
      expect(rawBody).toContain('Object not found');
    });
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 6 — GET /products/category/categoria-inexistente
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 6: categoría inexistente debe retornar lista vacía', { tag: ['@regression', '@get', '@products', '@category', '@negative'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Categoría No Encontrada');
    await severity('normal');
    await label('endpoint', 'GET /products/category/categoria-inexistente');
    await description(
      'Verifica que GET /products/category/<categoría-inexistente> retorna HTTP 200 con un array vacío [].'
    );

    const url = '/products/category/categoria-inexistente';

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.get(url);

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel[] = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones ──────────────────────────────────────────────────────
    await step('Validar status code 200', async () => {
      await parameter('Status Code', String(status));
      const { expect } = await import('@playwright/test');
      expect(status).toBe(200);
    });

    await step('Validar que el body es un array vacío', async () => {
      await parameter('Total productos', String(body.length));
      const { expect } = await import('@playwright/test');
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(0);
    });
  });

  // ════════════════════════════════════════════════════════════════════════════
  // Caso 8 — GET /products?limit=5
  // ════════════════════════════════════════════════════════════════════════════
  test('Caso 8: query param limit=5 debe retornar como máximo 5 productos', { tag: ['@smoke', '@regression', '@get', '@products', '@pagination'] }, async ({ request }) => {
    await feature('Fake Store API');
    await story('Paginación por Límite');
    await severity('normal');
    await label('endpoint', 'GET /products?limit=5');
    await description('Verifica que GET /products?limit=5 retorna status 200 y una lista con máximo 5 productos.');

    const limit = 5;
    const url = `/products?limit=${limit}`;

    // ── 1. Enviar request ────────────────────────────────────────────────────
    const response = await request.get(url);

    // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
    const status = response.status();
    const responseHeaders = response.headers();
    const body: ProductModel[] = await response.json();

    // ── 3. Adjuntar request ──────────────────────────────────────────────────
    await attachment(
      'Request',
      JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
      'application/json'
    );

    // ── 4. Adjuntar response ─────────────────────────────────────────────────
    await attachment(
      'Response',
      JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
      'application/json'
    );

    // ── 5. Validaciones via ProductListQuestions ─────────────────────────────
    const questions = new ProductListQuestions(status, body);
    await questions.validarStatusCode(200);
    await questions.validarListaNoVacia();
    await questions.validarLimiteDeLista(limit);
    await questions.validarEstructuraDeCadaProducto();
  });

});
