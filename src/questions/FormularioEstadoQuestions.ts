import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';

/**
 * Questions for the credit form state.
 * Screenplay layer — reads state without asserting.
 * Assertions live in ValidarFormulario task.
 */
export class FormularioEstadoQuestions {
  private readonly simuladorPage: SimuladorPage;
  private readonly page: Page;

  constructor(page: Page) {
    this.page          = page;
    this.simuladorPage = new SimuladorPage(page);
  }

  async obtenerValorMonto(): Promise<string> {
    return await this.simuladorPage.loanValueInput().inputValue();
  }

  async botonSimularEstaDeshabilitado(): Promise<boolean> {
    return await this.simuladorPage.btnSimular().isDisabled();
  }

  async obtenerMensajeError(): Promise<string | null> {
    const errorLocator = this.page.locator('.error-message, [class*="error"], pichincha-input [class*="error"]');
    const visible = await errorLocator.isVisible().catch(() => false);
    if (visible) return await errorLocator.innerText();
    return null;
  }
}
