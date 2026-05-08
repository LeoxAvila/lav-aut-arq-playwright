import { expect } from '@playwright/test';
import { step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../models/fake-store/product/product-model';

/**
 * Questions for Fake Store API responses that return an array of products.
 * Encapsulates list-level validation steps.
 */
export class ProductListQuestions {
  private readonly body: ProductModel[];
  private readonly status: number;

  constructor(status: number, body: ProductModel[]) {
    this.status = status;
    this.body   = body;
  }

  async validarStatusCode(expected: number = 200): Promise<void> {
    await step(`Validar status code ${expected}`, async () => {
      await parameter('Status Code', String(this.status));
      expect(this.status).toBe(expected);
    });
  }

  async validarListaNoVacia(): Promise<void> {
    await step('Validar que la lista contiene al menos un producto', async () => {
      await parameter('Total productos', String(this.body.length));
      expect(this.body.length).toBeGreaterThan(0);
    });
  }

  async validarLimiteDeLista(expectedMax: number): Promise<void> {
    await step(`Validar que la lista contiene como máximo ${expectedMax} productos`, async () => {
      await parameter('Total productos', String(this.body.length));
      await parameter('Límite esperado', String(expectedMax));
      expect(this.body.length).toBeLessThanOrEqual(expectedMax);
    });
  }

  async validarCategoriaEnTodosLosProductos(expectedCategory: string): Promise<void> {
    await step(`Validar que todos los productos tienen category="${expectedCategory}"`, async () => {
      await parameter('Categoría esperada', expectedCategory);
      for (const product of this.body) {
        expect(product.category).toBe(expectedCategory);
      }
    });
  }

  async validarEstructuraDeCadaProducto(): Promise<void> {
    await step('Validar estructura y tipos de cada producto en la lista', async () => {
      for (const product of this.body) {
        expect(typeof product.id).toBe('number');
        expect(typeof product.title).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.description).toBe('string');
        expect(typeof product.category).toBe('string');
        expect(typeof product.image).toBe('string');
        expect(product.price).toBeGreaterThan(0);
        expect(product.title.trim().length).toBeGreaterThan(0);
      }
    });
  }

  async validarListaPorCategoria(expectedCategory: string): Promise<void> {
    await this.validarStatusCode(200);
    await this.validarListaNoVacia();
    await this.validarCategoriaEnTodosLosProductos(expectedCategory);
    await this.validarEstructuraDeCadaProducto();
  }
}
