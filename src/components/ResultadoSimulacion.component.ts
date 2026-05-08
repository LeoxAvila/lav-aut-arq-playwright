import { Page, expect } from '@playwright/test';
import { ResultadoSimulacionQuestions, ResultadoSimulacion } from '../questions/ResultadoSimulacionQuestions';

// Re-export interface so existing task imports don't break
export type { ResultadoSimulacion };

/**
 * Component: Validates the simulation result section.
 * Screenplay layer — assertions only. Data reads delegate to ResultadoSimulacionQuestions.
 */
export class ResultadoSimulacionComponent {
  private readonly questions: ResultadoSimulacionQuestions;

  constructor(page: Page) {
    this.questions = new ResultadoSimulacionQuestions(page);
  }

  async obtenerResultado(): Promise<ResultadoSimulacion> {
    return await this.questions.obtenerResultado();
  }

  async validarCuotaMensualPositiva(): Promise<void> {
    const cuota = await this.questions.obtenerCuotaMensual();
    const valor = this.questions.parsearMoneda(cuota);
    expect(valor, `Cuota mensual debe ser mayor a 0, se obtuvo: ${cuota}`).toBeGreaterThan(0);
  }

  async validarTasaInteresPresente(): Promise<void> {
    const tasa = await this.questions.obtenerTasaInteres();
    expect(tasa, 'Tasa de interés debe estar presente').toMatch(/%/);
    const valorTasa = parseFloat(tasa.replace(',', '.').replace('%', ''));
    expect(valorTasa, 'Tasa de interés debe ser mayor a 0').toBeGreaterThan(0);
  }

  async validarTotalAPagarPresente(): Promise<void> {
    const total = await this.questions.obtenerTotalAPagar();
    const valor = this.questions.parsearMoneda(total);
    expect(valor, `Total a pagar debe ser mayor a 0, se obtuvo: ${total}`).toBeGreaterThan(0);
  }

  async validarFormatoMoneda(texto: string): Promise<void> {
    expect(texto, 'Formato de moneda debe comenzar con $').toMatch(/^\$/);
    expect(texto, 'Debe contener valor numérico').toMatch(/\d/);
  }

  parsearMoneda(valor: string): number {
    return this.questions.parsearMoneda(valor);
  }
}
