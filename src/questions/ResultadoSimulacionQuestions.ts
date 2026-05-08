import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';

export interface ResultadoSimulacion {
  cuotaMensual: string;
  tasaInteres: string;
  totalAPagar: string;
}

/**
 * Questions for the Credit Simulator result section.
 * Screenplay layer — reads state without asserting.
 * Assertions live in ResultadoSimulacionComponent.
 */
export class ResultadoSimulacionQuestions {
  private readonly actions: SimuladorActions;

  constructor(page: Page) {
    const simuladorPage = new SimuladorPage(page);
    this.actions        = new SimuladorActions(page, simuladorPage);
  }

  async obtenerCuotaMensual(): Promise<string> {
    return await this.actions.obtenerCuotaMensualTexto();
  }

  async obtenerTasaInteres(): Promise<string> {
    return await this.actions.obtenerTasaInteres();
  }

  async obtenerTotalAPagar(): Promise<string> {
    return await this.actions.obtenerTotalAPagar();
  }

  async obtenerResultado(): Promise<ResultadoSimulacion> {
    return {
      cuotaMensual: await this.obtenerCuotaMensual(),
      tasaInteres:  await this.obtenerTasaInteres(),
      totalAPagar:  await this.obtenerTotalAPagar(),
    };
  }

  parsearMoneda(valor: string): number {
    // Input formats: "$913,42" or "$10.961,09"
    // 1. Remove $ and spaces
    // 2. Remove dot thousands separator
    // 3. Replace comma decimal separator with dot
    const limpio = valor
      .replace(/\$/g, '')
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(limpio) || 0;
  }
}
