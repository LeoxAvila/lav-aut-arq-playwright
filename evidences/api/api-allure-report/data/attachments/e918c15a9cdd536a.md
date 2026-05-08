# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\fake-store\products-get.spec.ts >> Products GET — Fake Store API >> Caso 5: ID inexistente debe retornar null (comportamiento Fake Store)
- Location: tests\fake-store\products-get.spec.ts:91:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

# Test source

```ts
  33  |       'application/json'
  34  |     );
  35  | 
  36  |     // ── 4. Adjuntar response completo ────────────────────────────────────────
  37  |     await attachment(
  38  |       'Response',
  39  |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  40  |       'application/json'
  41  |     );
  42  | 
  43  |     // ── 5. Validaciones via ProductQuestions ─────────────────────────────────
  44  |     const questions = new ProductQuestions(status, body);
  45  |     await questions.validarProductoCompleto(productId);
  46  |   });
  47  | 
  48  |   // ════════════════════════════════════════════════════════════════════════════
  49  |   // Caso 2 — GET /products/category/electronics
  50  |   // ════════════════════════════════════════════════════════════════════════════
  51  |   test('Caso 2: debe obtener todos los productos de la categoría electronics', { tag: ['@smoke', '@regression', '@get', '@products', '@category'] }, async ({ request }) => {
  52  |     await feature('Fake Store API');
  53  |     await story('Obtener Productos por Categoría');
  54  |     await severity('critical');
  55  |     await label('endpoint', 'GET /products/category/electronics');
  56  |     await description('Verifica que GET /products/category/electronics retorna status 200, lista no vacía y todos los productos pertenecen a la categoría electronics.');
  57  | 
  58  |     const category = 'electronics';
  59  |     const url = `/products/category/${category}`;
  60  | 
  61  |     // ── 1. Enviar request ────────────────────────────────────────────────────
  62  |     const response = await request.get(url);
  63  | 
  64  |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  65  |     const status = response.status();
  66  |     const responseHeaders = response.headers();
  67  |     const body: ProductModel[] = await response.json();
  68  | 
  69  |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  70  |     await attachment(
  71  |       'Request',
  72  |       JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
  73  |       'application/json'
  74  |     );
  75  | 
  76  |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  77  |     await attachment(
  78  |       'Response',
  79  |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  80  |       'application/json'
  81  |     );
  82  | 
  83  |     // ── 5. Validaciones via ProductListQuestions ─────────────────────────────
  84  |     const questions = new ProductListQuestions(status, body);
  85  |     await questions.validarListaPorCategoria(category);
  86  |   });
  87  | 
  88  |   // ════════════════════════════════════════════════════════════════════════════
  89  |   // Caso 5 — GET /products/999999 (ID inexistente)
  90  |   // ════════════════════════════════════════════════════════════════════════════
  91  |   test('Caso 5: ID inexistente debe retornar null (comportamiento Fake Store)', { tag: ['@regression', '@get', '@products', '@negative'] }, async ({ request }) => {
  92  |     await feature('Fake Store API');
  93  |     await story('Producto No Encontrado');
  94  |     await severity('normal');
  95  |     await label('endpoint', 'GET /products/999999');
  96  |     await description(
  97  |       '[BUG] GET /products/999999 debería retornar HTTP 404 con body "Object not found". ' +
  98  |       'Comportamiento actual: Fake Store retorna HTTP 200 con body vacío. ' +
  99  |       'Este test falla intencionalmente para registrar el defecto.'
  100 |     );
  101 | 
  102 |     const url = '/products/999999';
  103 | 
  104 |     // ── 1. Enviar request ────────────────────────────────────────────────────
  105 |     const response = await request.get(url);
  106 | 
  107 |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  108 |     const status = response.status();
  109 |     const responseHeaders = response.headers();
  110 |     const rawBody = await response.text();
  111 | 
  112 |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  113 |     await attachment(
  114 |       'Request',
  115 |       JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
  116 |       'application/json'
  117 |     );
  118 | 
  119 |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  120 |     await attachment(
  121 |       'Response',
  122 |       JSON.stringify({ status, headers: responseHeaders, body: rawBody }, null, 2),
  123 |       'application/json'
  124 |     );
  125 | 
  126 |     // ── 5. Validaciones esperadas (BUG: Fake Store no cumple comportamiento REST estándar) ───
  127 |     await step('[ESPERADO] Status code debe ser 404 — producto no encontrado', async () => {
  128 |       await parameter('Status Code recibido', String(status));
  129 |       await parameter('Status Code esperado', '404');
  130 |       await parameter('ID consultado', '999999');
  131 |       const { expect } = await import('@playwright/test');
  132 |       // BUG: Fake Store retorna 200 en lugar de 404 para IDs inexistentes
> 133 |       expect(status).toBe(404);
      |                      ^ Error: expect(received).toBe(expected) // Object.is equality
  134 |     });
  135 | 
  136 |     await step('[ESPERADO] Body debe indicar que el objeto no fue encontrado', async () => {
  137 |       await parameter('Body recibido', rawBody || '(vacío)');
  138 |       await parameter('Body esperado', 'Object not found');
  139 |       const { expect } = await import('@playwright/test');
  140 |       // BUG: Fake Store retorna body vacío en lugar de mensaje de error descriptivo
  141 |       expect(rawBody).toContain('Object not found');
  142 |     });
  143 |   });
  144 | 
  145 |   // ════════════════════════════════════════════════════════════════════════════
  146 |   // Caso 6 — GET /products/category/categoria-inexistente
  147 |   // ════════════════════════════════════════════════════════════════════════════
  148 |   test('Caso 6: categoría inexistente debe retornar lista vacía', { tag: ['@regression', '@get', '@products', '@category', '@negative'] }, async ({ request }) => {
  149 |     await feature('Fake Store API');
  150 |     await story('Categoría No Encontrada');
  151 |     await severity('normal');
  152 |     await label('endpoint', 'GET /products/category/categoria-inexistente');
  153 |     await description(
  154 |       'Verifica que GET /products/category/<categoría-inexistente> retorna HTTP 200 con un array vacío [].'
  155 |     );
  156 | 
  157 |     const url = '/products/category/categoria-inexistente';
  158 | 
  159 |     // ── 1. Enviar request ────────────────────────────────────────────────────
  160 |     const response = await request.get(url);
  161 | 
  162 |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  163 |     const status = response.status();
  164 |     const responseHeaders = response.headers();
  165 |     const body: ProductModel[] = await response.json();
  166 | 
  167 |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  168 |     await attachment(
  169 |       'Request',
  170 |       JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
  171 |       'application/json'
  172 |     );
  173 | 
  174 |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  175 |     await attachment(
  176 |       'Response',
  177 |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  178 |       'application/json'
  179 |     );
  180 | 
  181 |     // ── 5. Validaciones ──────────────────────────────────────────────────────
  182 |     await step('Validar status code 200', async () => {
  183 |       await parameter('Status Code', String(status));
  184 |       const { expect } = await import('@playwright/test');
  185 |       expect(status).toBe(200);
  186 |     });
  187 | 
  188 |     await step('Validar que el body es un array vacío', async () => {
  189 |       await parameter('Total productos', String(body.length));
  190 |       const { expect } = await import('@playwright/test');
  191 |       expect(Array.isArray(body)).toBe(true);
  192 |       expect(body.length).toBe(0);
  193 |     });
  194 |   });
  195 | 
  196 |   // ════════════════════════════════════════════════════════════════════════════
  197 |   // Caso 8 — GET /products?limit=5
  198 |   // ════════════════════════════════════════════════════════════════════════════
  199 |   test('Caso 8: query param limit=5 debe retornar como máximo 5 productos', { tag: ['@smoke', '@regression', '@get', '@products', '@pagination'] }, async ({ request }) => {
  200 |     await feature('Fake Store API');
  201 |     await story('Paginación por Límite');
  202 |     await severity('normal');
  203 |     await label('endpoint', 'GET /products?limit=5');
  204 |     await description('Verifica que GET /products?limit=5 retorna status 200 y una lista con máximo 5 productos.');
  205 | 
  206 |     const limit = 5;
  207 |     const url = `/products?limit=${limit}`;
  208 | 
  209 |     // ── 1. Enviar request ────────────────────────────────────────────────────
  210 |     const response = await request.get(url);
  211 | 
  212 |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  213 |     const status = response.status();
  214 |     const responseHeaders = response.headers();
  215 |     const body: ProductModel[] = await response.json();
  216 | 
  217 |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  218 |     await attachment(
  219 |       'Request',
  220 |       JSON.stringify({ method: 'GET', url: `https://fakestoreapi.com${url}`, headers: { Accept: 'application/json' } }, null, 2),
  221 |       'application/json'
  222 |     );
  223 | 
  224 |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  225 |     await attachment(
  226 |       'Response',
  227 |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  228 |       'application/json'
  229 |     );
  230 | 
  231 |     // ── 5. Validaciones via ProductListQuestions ─────────────────────────────
  232 |     const questions = new ProductListQuestions(status, body);
  233 |     await questions.validarStatusCode(200);
```