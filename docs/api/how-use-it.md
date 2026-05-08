# How to Create a New API Test

This guide walks you through adding a new test to the Fake Store API suite, following the same patterns used in [`tests/fake-store/products-get.spec.ts`](../../tests/fake-store/products-get.spec.ts).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Step 1 — Create the Model (if needed)](#2-step-1--create-the-model-if-needed)
3. [Step 2 — Create the Fixture (if needed)](#3-step-2--create-the-fixture-if-needed)
4. [Step 3 — Create the Questions class (if needed)](#4-step-3--create-the-questions-class-if-needed)
5. [Step 4 — Write the test](#5-step-4--write-the-test)
6. [Step 5 — Run the test](#6-step-5--run-the-test)
7. [Anatomy of a test](#7-anatomy-of-a-test)
8. [Documenting a bug as a failing test](#8-documenting-a-bug-as-a-failing-test)
9. [Tag reference](#9-tag-reference)

---

## 1. Architecture Overview

Every API test follows this three-layer pattern:

```
Fixture (data)  →  Questions (validations)  →  Spec (orchestration)
```

| Layer | Location | Responsibility |
|---|---|---|
| **Model** | `src/models/fake-store/` | TypeScript interfaces — shape of the response body |
| **Fixture** | `src/fixtures/fake-store/` | Static JSON — request payloads and seed data |
| **Questions** | `src/questions/fake-store/` | Reusable assertions with Allure steps |
| **Spec** | `tests/fake-store/` | Sends request, attaches evidence, calls Questions |

The spec never contains raw `expect()` calls for business logic — those live in Questions.

---

## 2. Step 1 — Create the Model (if needed)

If the endpoint returns a new shape, define a TypeScript interface under `src/models/fake-store/`.

**Example — existing model for a single product:**

```typescript
// src/models/fake-store/product/product-model.ts
export interface ProductModel {
  id:          number;
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
  rating?:     RatingModel;
}
```

If the endpoint you are testing already returns a `ProductModel` or `ProductModel[]`, skip this step.

---

## 3. Step 2 — Create the Fixture (if needed)

Fixtures are static JSON files. Use them to store:

- **Seed data** — a list of known-good records (e.g., `products.json` with all 20 products)
- **Request payloads** — body for POST or PUT requests (e.g., `create-product.json`)

**Example — payload for a POST request:**

```json
// src/fixtures/fake-store/create-product.json
{
  "title":       "New Product",
  "price":       29.99,
  "description": "A test product",
  "category":    "electronics",
  "image":       "https://fakestoreapi.com/img/placeholder.jpg"
}
```

Import the fixture at the top of the spec:

```typescript
import newProduct from '../../src/fixtures/fake-store/create-product.json';
```

If the test does not need a payload (e.g., a simple GET), skip this step.

---

## 4. Step 3 — Create the Questions class (if needed)

A **Questions class** encapsulates all assertions for a specific response shape. It receives `status` and `body` in the constructor and exposes named validation methods, each wrapped in an Allure `step`.

**Example — simplified Questions for a single product:**

```typescript
// src/questions/fake-store/ProductQuestions.ts
import { expect } from '@playwright/test';
import { step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../models/fake-store/product/product-model';

export class ProductQuestions {
  private readonly status: number;
  private readonly body:   ProductModel;

  constructor(status: number, body: ProductModel) {
    this.status = status;
    this.body   = body;
  }

  // ── Individual validations ──────────────────────────────────────────────

  async validarStatusCode(expected: number = 200): Promise<void> {
    await step(`Validar status code ${expected}`, async () => {
      await parameter('Status Code', String(this.status));
      expect(this.status).toBe(expected);
    });
  }

  async validarCamposObligatorios(): Promise<void> {
    await step('Validar campos obligatorios presentes', async () => {
      expect(this.body).toHaveProperty('id');
      expect(this.body).toHaveProperty('title');
      expect(this.body).toHaveProperty('price');
    });
  }

  // ── Composite validation (calls individual ones) ────────────────────────

  async validarProductoCompleto(expectedId: number): Promise<void> {
    await this.validarStatusCode(200);
    await this.validarCamposObligatorios();
    // ... more validations
  }
}
```

**Rules for Questions:**
- One class per response shape (`ProductQuestions`, `ProductListQuestions`, `ProductWriteQuestions`).
- Methods prefixed with `validar` — they read and assert, never mutate.
- Every method is wrapped in `step()` so it appears in the Allure report.
- Use `parameter()` inside steps to surface key values in the report.
- Expose composite methods (`validarProductoCompleto`) that chain individual validations.

If the test reuses an existing Questions class, skip this step.

---

## 5. Step 4 — Write the test

Add the test inside the appropriate spec file, or create a new one under `tests/fake-store/`.

**Full example — adding a new GET test:**

```typescript
// tests/fake-store/products-get.spec.ts

import { test } from '@playwright/test';
import {
  feature, story, severity, label, description,
  attachment, step, parameter
} from 'allure-js-commons';
import type { ProductModel } from '../../src/models/fake-store/product/product-model';
import { ProductQuestions } from '../../src/questions/fake-store/ProductQuestions';

test.describe('Products GET — Fake Store API', () => {

  test(
    'Caso N: debe obtener todos los productos sin filtro',
    { tag: ['@smoke', '@regression', '@get', '@products'] },
    async ({ request }) => {

      // ── Allure metadata ──────────────────────────────────────────────────
      await feature('Fake Store API');
      await story('Obtener Todos los Productos');
      await severity('critical');
      await label('endpoint', 'GET /products');
      await description('Verifica que GET /products retorna 200 y una lista no vacía de productos.');

      const url = '/products';

      // ── 1. Send request ──────────────────────────────────────────────────
      const response = await request.get(url);

      // ── 2. Capture response data BEFORE any assertion ────────────────────
      const status          = response.status();
      const responseHeaders = response.headers();
      const body: ProductModel[] = await response.json();

      // ── 3. Attach request ────────────────────────────────────────────────
      await attachment(
        'Request',
        JSON.stringify({
          method:  'GET',
          url:     `https://fakestoreapi.com${url}`,
          headers: { Accept: 'application/json' },
        }, null, 2),
        'application/json'
      );

      // ── 4. Attach response ───────────────────────────────────────────────
      await attachment(
        'Response',
        JSON.stringify({ status, headers: responseHeaders, body }, null, 2),
        'application/json'
      );

      // ── 5. Validate via Questions ────────────────────────────────────────
      const questions = new ProductListQuestions(status, body);
      await questions.validarListaNoVacia();
      await questions.validarEstructuraDeCadaProducto();
    }
  );

});
```

**Key rules:**
- Always capture `status`, `headers`, and `body` before calling any assertion or Questions method.
- Always attach `Request` and `Response` as JSON attachments — this is the primary evidence in Allure.
- Delegate all business assertions to Questions. Keep the spec as an orchestrator.
- Tags are required. Use at minimum `@get`/`@post`/`@put` + `@products` + `@smoke` or `@regression`.

---

## 6. Step 5 — Run the test

### Run the full API suite

```bash
npx playwright test --project=api
```

### Run only your new test file

```bash
npx playwright test --project=api tests/fake-store/products-get.spec.ts
```

### Run only your new test by name

```bash
npx playwright test --project=api --grep "Caso N"
```

### Run by tag

```bash
npx playwright test --project=api --grep "@smoke"
```

### Generate a clean Allure report (recommended)

**PowerShell:**

```powershell
Remove-Item -Recurse -Force allure-results, allure-report -ErrorAction SilentlyContinue
npx playwright test --project=api
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

**Bash:**

```bash
rm -rf allure-results allure-report
npx playwright test --project=api
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

> Cleaning `allure-results` before running ensures the report contains only the current execution, with no leftovers from previous runs.

---

## 7. Anatomy of a test

```
test(
  'Caso N: <description>',          ← Human-readable name shown in the report
  { tag: ['@smoke', '@get', ...] },  ← Tags for filtering execution
  async ({ request }) => {           ← `request` is Playwright's APIRequestContext

    // Allure metadata
    await feature(...)   ← Groups tests in Allure by feature
    await story(...)     ← Groups tests by user story
    await severity(...)  ← critical | normal | minor
    await label(...)     ← Arbitrary key-value labels (e.g., endpoint name)
    await description(…) ← Long description shown in Allure

    // Request
    const response = await request.get('/path');    // or .post() .put() .delete()

    // Capture BEFORE asserting
    const status  = response.status();
    const headers = response.headers();
    const body    = await response.json();   // or response.text() for non-JSON

    // Evidence
    await attachment('Request',  JSON.stringify({...}, null, 2), 'application/json');
    await attachment('Response', JSON.stringify({...}, null, 2), 'application/json');

    // Validations
    const questions = new MyQuestions(status, body);
    await questions.validarAlgo();
  }
);
```

---

## 8. Documenting a bug as a failing test

When the API does not meet the expected contract, write a test that **asserts the correct behavior** and let it fail intentionally. Do not adjust the assertion to match the wrong behavior.

```typescript
test('Caso 5: ID inexistente debe retornar 404', { tag: ['@regression', '@get', '@negative'] }, async ({ request }) => {
  await description(
    '[BUG] GET /products/999999 debería retornar 404. ' +
    'Comportamiento actual: Fake Store retorna 200 con body vacío. ' +
    'Este test falla intencionalmente para documentar el defecto.'
  );

  const response = await request.get('/products/999999');
  const status   = response.status();
  const rawBody  = await response.text();

  // Attach evidence ...

  await step('[ESPERADO] Status debe ser 404', async () => {
    await parameter('Status recibido', String(status));
    await parameter('Status esperado', '404');
    const { expect } = await import('@playwright/test');
    expect(status).toBe(404); // ← falla intencionalmente: la API retorna 200
  });
});
```

**Why this matters:**
- The test failure generates reproducible evidence attached to a ticket.
- When the bug is fixed, the test passes without any code change.
- The description field documents root cause, expected behavior, and actual behavior in one place.

---

## 9. Tag reference

### API tags

| Tag | Scope |
|---|---|
| `@smoke` | Critical path — always run in CI |
| `@regression` | Full regression suite |
| `@get` | Tests using the GET method |
| `@post` | Tests using the POST method |
| `@put` | Tests using the PUT method |
| `@products` | Tests targeting the `/products` resource |
| `@category` | Tests filtering by category |
| `@pagination` | Tests using query params like `limit` |
| `@negative` | Expected error scenarios and bug documentation |
