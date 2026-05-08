import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';

/**
 * Questions for the amortization table.
 * Screenplay layer — reads state without asserting.
 * Assertions live in TablaAmortizacionComponent.
 */
export class TablaAmortizacionQuestions {
  private readonly simuladorPage: SimuladorPage;
  private readonly actions: SimuladorActions;

  constructor(page: Page) {
    this.simuladorPage = new SimuladorPage(page);
    this.actions       = new SimuladorActions(page, this.simuladorPage);
  }

  async esVisible(): Promise<boolean> {
    return await this.actions.tablaAmortizacionEsVisible();
  }

  async obtenerNumeroDeCuotas(): Promise<number> {
    const frame = await this.simuladorPage.getFrame();
    // Table is pre-rendered in the iframe DOM; count date rows regardless of visibility.
    return await frame.evaluate(() => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return Array.from(document.querySelectorAll('td, [role="cell"]'))
        .filter(el => dateRegex.test((el as HTMLElement).innerText?.trim() || ''))
        .length;
    });
  }
}
