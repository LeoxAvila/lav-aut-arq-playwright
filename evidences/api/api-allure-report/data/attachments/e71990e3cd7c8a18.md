# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\fake-store\products-write.spec.ts >> Products Write — Fake Store API >> Caso 7: POST con payload vacío debe retornar error de validación
- Location: tests\fake-store\products-write.spec.ts:105:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201
```

# Test source

```ts
  45  |     await attachment(
  46  |       'Response',
  47  |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  48  |       'application/json'
  49  |     );
  50  | 
  51  |     // ── 5. Validaciones via ProductWriteQuestions ──────────────────────────
  52  |     const questions = new ProductWriteQuestions(status, body);
  53  |     await questions.validarProductoCreado(payload);
  54  |   });
  55  | 
  56  |   // ════════════════════════════════════════════════════════════════════════════
  57  |   // Caso 4 — PUT /products/{id} (actualización completa)
  58  |   // ════════════════════════════════════════════════════════════════════════════
  59  |   test('Caso 4: debe actualizar un producto existente y retornar los datos actualizados', { tag: ['@smoke', '@regression', '@put', '@products'] }, async ({ request }) => {
  60  |     await feature('Fake Store API');
  61  |     await story('Actualizar Producto');
  62  |     await severity('critical');
  63  |     await label('endpoint', 'PUT /products/{id}');
  64  |     await description(
  65  |       'Verifica que PUT /products/{id} con un payload válido retorna status 200 y los campos actualizados ' +
  66  |       'se reflejan en la respuesta. ' +
  67  |       'Nota: Fake Store es una API de demo — los datos no se persisten realmente.'
  68  |     );
  69  | 
  70  |     const randomProduct = products[Math.floor(Math.random() * products.length)] as ProductModel;
  71  |     const productId = randomProduct.id;
  72  |     const payload = updateProductPayload;
  73  |     const url = `/products/${productId}`;
  74  | 
  75  |     // ── 1. Enviar request ────────────────────────────────────────────────────
  76  |     const response = await request.put(url, { data: payload });
  77  | 
  78  |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  79  |     const status = response.status();
  80  |     const responseHeaders = response.headers();
  81  |     const body: ProductModel = await response.json();
  82  | 
  83  |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  84  |     await attachment(
  85  |       'Request',
  86  |       JSON.stringify({ method: 'PUT', url: `https://fakestoreapi.com${url}`, headers: { 'Content-Type': 'application/json' }, body: payload }, null, 2),
  87  |       'application/json'
  88  |     );
  89  | 
  90  |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  91  |     await attachment(
  92  |       'Response',
  93  |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  94  |       'application/json'
  95  |     );
  96  | 
  97  |     // ── 5. Validaciones via ProductWriteQuestions ──────────────────────────
  98  |     const questions = new ProductWriteQuestions(status, body);
  99  |     await questions.validarProductoActualizado(payload);
  100 |   });
  101 | 
  102 |   // ════════════════════════════════════════════════════════════════════════════
  103 |   // Caso 7 — POST /products con payload vacío (negativo)
  104 |   // ════════════════════════════════════════════════════════════════════════════
  105 |   test('Caso 7: POST con payload vacío debe retornar error de validación', { tag: ['@regression', '@post', '@products', '@negative'] }, async ({ request }) => {
  106 |     await feature('Fake Store API');
  107 |     await story('Crear Producto — Payload Inválido');
  108 |     await severity('normal');
  109 |     await label('endpoint', 'POST /products');
  110 |     await description(
  111 |       '[BUG] POST /products con payload {} debería retornar HTTP 400 con mensaje de validación. ' +
  112 |       'Comportamiento actual: Fake Store acepta el payload vacío y retorna un objeto con solo id. ' +
  113 |       'Este test falla intencionalmente para registrar el defecto.'
  114 |     );
  115 | 
  116 |     const url = '/products';
  117 | 
  118 |     // ── 1. Enviar request con payload vacío ──────────────────────────────────
  119 |     const response = await request.post(url, { data: {} });
  120 | 
  121 |     // ── 2. Capturar datos ANTES de assertions ────────────────────────────────
  122 |     const status = response.status();
  123 |     const responseHeaders = response.headers();
  124 |     const body = await response.json();
  125 | 
  126 |     // ── 3. Adjuntar request ──────────────────────────────────────────────────
  127 |     await attachment(
  128 |       'Request',
  129 |       JSON.stringify({ method: 'POST', url: `https://fakestoreapi.com${url}`, headers: { 'Content-Type': 'application/json' }, body: {} }, null, 2),
  130 |       'application/json'
  131 |     );
  132 | 
  133 |     // ── 4. Adjuntar response ─────────────────────────────────────────────────
  134 |     await attachment(
  135 |       'Response',
  136 |       JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
  137 |       'application/json'
  138 |     );
  139 | 
  140 |     // ── 5. Validaciones esperadas (BUG: Fake Store no valida el payload) ─────
  141 |     await step('[ESPERADO] Status code debe ser 400 — payload inválido', async () => {
  142 |       await parameter('Status Code recibido', String(status));
  143 |       await parameter('Status Code esperado', '400');
  144 |       // BUG: Fake Store retorna 201 en lugar de 400 para payload sin campos obligatorios
> 145 |       expect(status).toBe(400);
      |                      ^ Error: expect(received).toBe(expected) // Object.is equality
  146 |     });
  147 | 
  148 |     await step('[ESPERADO] Body debe contener mensaje de error de validación', async () => {
  149 |       await parameter('Body recibido', JSON.stringify(body));
  150 |       await parameter('Body esperado', '{ "message": "Required fields are missing" }');
  151 |       // BUG: Fake Store retorna { id: 21 } en lugar de un error descriptivo
  152 |       expect(body).toHaveProperty('message');
  153 |     });
  154 |   });
  155 | 
  156 | });
  157 | 
```