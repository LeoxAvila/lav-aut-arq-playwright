import { expect } from '@playwright/test';
import { step, parameter } from 'allure-js-commons';
import type { ProductModel } from '../models/fake-store/product/product-model';
import type { CreateProductModel } from '../models/fake-store/product/create-product-model';

/**
 * Questions for Fake Store API write operation responses (POST / PUT).
 * Encapsulates validation steps for created and updated products.
 */
export class ProductWriteQuestions {
  private readonly body: ProductModel;
  private readonly status: number;

  constructor(status: number, body: ProductModel) {
    this.status = status;
    this.body   = body;
  }

  async validarStatusCode(expected: number): Promise<void> {
    await step(`Validar status code ${expected}`, async () => {
      await parameter('Status Code', String(this.status));
      expect(this.status).toBe(expected);
    });
  }

  async validarIdAsignado(): Promise<void> {
    await step('Validar que la respuesta contiene un id numérico asignado', async () => {
      await parameter('ID asignado', String(this.body.id));
      expect(this.body.id).toBeDefined();
      expect(typeof this.body.id).toBe('number');
      expect(this.body.id).toBeGreaterThan(0);
    });
  }

  async validarIdPresente(): Promise<void> {
    await step('Validar que el id del producto se mantiene en la respuesta', async () => {
      await parameter('ID en respuesta', String(this.body.id));
      expect(this.body.id).toBeDefined();
      expect(typeof this.body.id).toBe('number');
    });
  }

  async validarCamposReflejados(payload: CreateProductModel): Promise<void> {
    await step('Validar que los campos enviados se reflejan en la respuesta', async () => {
      await parameter('Title enviado', payload.title);
      await parameter('Title recibido', this.body.title);
      await parameter('Price enviado', String(payload.price));
      await parameter('Price recibido', String(this.body.price));
      expect(this.body.title).toBe(payload.title);
      expect(this.body.price).toBe(payload.price);
      expect(this.body.description).toBe(payload.description);
      expect(this.body.category).toBe(payload.category);
      expect(this.body.image).toBe(payload.image);
    });
  }

  async validarProductoCreado(payload: CreateProductModel): Promise<void> {
    await this.validarStatusCode(201);
    await this.validarIdAsignado();
    await this.validarCamposReflejados(payload);
  }

  async validarProductoActualizado(payload: CreateProductModel): Promise<void> {
    await this.validarStatusCode(200);
    await this.validarIdPresente();
    await this.validarCamposReflejados(payload);
  }
}
