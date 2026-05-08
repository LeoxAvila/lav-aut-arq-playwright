import { Page, expect } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';
import { TablaAmortizacionQuestions } from '../questions/TablaAmortizacionQuestions';

/**
 * Component: Validates the amortization table.
 * Screenplay layer — assertions only. Data reads delegate to TablaAmortizacionQuestions.
 * All evaluate() calls use frame.evaluate() because the table lives inside the iframe.
 */
export class TablaAmortizacionComponent {
  private readonly simuladorPage: SimuladorPage;
  private readonly actions: SimuladorActions;
  private readonly questions: TablaAmortizacionQuestions;

  constructor(page: Page) {
    this.simuladorPage = new SimuladorPage(page);
    this.actions       = new SimuladorActions(page, this.simuladorPage);
    this.questions     = new TablaAmortizacionQuestions(page);
  }

  async abrirTabla(): Promise<void> {
    await this.actions.abrirTablaAmortizacion();
  }

  async validarTablaVisible(): Promise<void> {
    const visible = await this.questions.esVisible();
    expect(visible, 'La tabla de amortización debe ser visible').toBe(true);
  }

  async validarColumnasPresentes(): Promise<void> {
    const columnas = ['Fecha de pago', 'Capital', 'Interés', 'Valor cuota', 'Saldo'];
    const frame = await this.simuladorPage.getFrame();
    for (const columna of columnas) {
      // The table is pre-rendered in the iframe DOM; check text presence (not visual visibility).
      const found = await frame.evaluate((col: string) => {
        return Array.from(document.querySelectorAll('*'))
          .some(el => (el as HTMLElement).innerText?.trim() === col);
      }, columna);
      expect(found, `Columna "${columna}" debe estar presente en la tabla`).toBe(true);
    }
  }

  async validarFilasPresentes(minimoFilas: number = 1): Promise<void> {
    const frame = await this.simuladorPage.getFrame();
    // Table is pre-rendered in the iframe DOM; count all date rows regardless of visibility.
    const count = await frame.evaluate(() => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return Array.from(document.querySelectorAll('td, [role="cell"]'))
        .filter(el => dateRegex.test((el as HTMLElement).innerText?.trim() || ''))
        .length;
    });
    expect(count, `La tabla debe tener al menos ${minimoFilas} fila(s)`).toBeGreaterThanOrEqual(minimoFilas);
  }

  async obtenerNumeroDeCuotas(): Promise<number> {
    return await this.questions.obtenerNumeroDeCuotas();
  }
}

