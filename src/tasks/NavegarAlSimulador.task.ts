import { Page } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';

/**
 * Task: Navigate to the credit simulator.
 * Screenplay layer — orchestrates business flow.
 */
export class NavegarAlSimulador {
  private readonly page: Page;
  private readonly simuladorPage: SimuladorPage;
  private readonly actions: SimuladorActions;

  constructor(page: Page) {
    this.page          = page;
    this.simuladorPage = new SimuladorPage(page);
    this.actions       = new SimuladorActions(page, this.simuladorPage);
  }

  async ejecutar(): Promise<SimuladorPage> {
    await this.actions.navigateToSimulador();
    await attachment('Simulador cargado', await this.page.screenshot(), 'image/png');
    return this.simuladorPage;
  }
}
