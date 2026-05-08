import { expect } from '@playwright/test';
import { step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../models/fake-store/product/product-model';

/**
 * Questions for the Fake Store Product API responses.
 * Encapsulates validation steps — reads and asserts API response state.
 */
export class ProductQuestions {
  private readonly body: ProductModel;
  private readonly status: number;

  constructor(status: number, body: ProductModel) {
    this.status = status;
    this.body   = body;
  }

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
      expect(this.body).toHaveProperty('description');
      expect(this.body).toHaveProperty('category');
      expect(this.body).toHaveProperty('image');
      expect(this.body).toHaveProperty('rating');
    });
  }

  async validarTiposDeDatos(): Promise<void> {
    await step('Validar tipos de datos', async () => {
      expect(typeof this.body.id).toBe('number');
      expect(typeof this.body.title).toBe('string');
      expect(typeof this.body.price).toBe('number');
      expect(typeof this.body.description).toBe('string');
      expect(typeof this.body.category).toBe('string');
      expect(typeof this.body.image).toBe('string');
    });
  }

  async validarEstructuraRating(): Promise<void> {
    await step('Validar estructura del objeto rating', async () => {
      expect(this.body.rating).toBeDefined();
      expect(this.body.rating).toHaveProperty('rate');
      expect(this.body.rating).toHaveProperty('count');
      expect(typeof this.body.rating!.rate).toBe('number');
      expect(typeof this.body.rating!.count).toBe('number');
    });
  }

  async validarValoresDeNegocio(expectedId: number): Promise<void> {
    await step('Validar valores de negocio', async () => {
      expect(this.body.id).toBe(expectedId);
      expect(this.body.price).toBeGreaterThan(0);
      expect(this.body.title.trim().length).toBeGreaterThan(0);
      expect(this.body.rating!.rate).toBeGreaterThanOrEqual(0);
      expect(this.body.rating!.rate).toBeLessThanOrEqual(5);
      expect(this.body.rating!.count).toBeGreaterThan(0);

      await parameter('Product ID', String(this.body.id));
      await parameter('Title', this.body.title);
      await parameter('Price', String(this.body.price));
      await parameter('Rating', `${this.body.rating!.rate} (${this.body.rating!.count} reviews)`);
    });
  }

  async validarProductoCompleto(expectedId: number): Promise<void> {
    await this.validarStatusCode(200);
    await this.validarCamposObligatorios();
    await this.validarTiposDeDatos();
    await this.validarEstructuraRating();
    await this.validarValoresDeNegocio(expectedId);
  }
}
