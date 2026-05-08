import { Page, FrameLocator, Frame } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the Credit Simulator page.
 * Pure element map: exposes only frame access and locators.
 * All interactions live in SimuladorActions.
 *
 * Target URL: /detalle-producto/simulador-de-credito
 * The simulator renders inside an iframe (class="microsite-iframe").
 *
 * Shadow DOM notes:
 *  - pichincha-dropdown, pichincha-input, pichincha-button are Stencil web components
 *  - Playwright FrameLocator + chained .locator() pierces both iframe and shadow DOM
 *  - Result values use frame.evaluate() + innerText (textContent is empty in shadow DOM)
 */
export class SimuladorPage extends BasePage {
  readonly url = '/detalle-producto/simulador-de-credito';

  // ── Frame access ──────────────────────────────────────────────────────────
  // public so SimuladorActions can use getByText() and other FrameLocator methods
  get frameLocator(): FrameLocator {
    return this.page.frameLocator('iframe.microsite-iframe');
  }

  async getFrame(): Promise<Frame> {
    const frame = this.page.frame({ url: /credit-simulator/ });
    if (!frame) throw new Error('Simulator iframe not found. Is the page fully loaded?');
    return frame;
  }

  // ── Locators — scoped to iframe via frameLocator ──────────────────────────
  readonly creditTypeDropdown      = () => this.frameLocator.locator('pichincha-dropdown[formcontrolname="creditType"]');
  readonly loanTermDropdown        = () => this.frameLocator.locator('pichincha-dropdown[formcontrolname="loanTerm"]');
  readonly loanValueInput          = () => this.frameLocator.locator('pichincha-input[formcontrolname="loanValue"]').locator('input');
  readonly assetValueInput         = () => this.frameLocator.locator('pichincha-input[formcontrolname="assetValue"]').locator('input');
  readonly metodeFrancesLabel      = () => this.frameLocator.locator('label[for="FRANCESA"]');
  readonly metodeAlemanLabel       = () => this.frameLocator.locator('label[for="ALEMANA"]');
  readonly btnSimular              = () => this.frameLocator.locator('button:has-text("Simular")');
  readonly btnVerTabla             = () => this.frameLocator.locator('button:has-text("Descargar tabla")');
  readonly btnVerTablaAmortizacion = () => this.frameLocator.locator('pichincha-link-button.hydrated');
  readonly modalTabla              = () => this.frameLocator.locator('pichincha-modal.hydrated');

  constructor(page: Page) {
    super(page);
  }

  // Expose navigate and waitForPageLoad publicly for SimuladorActions
  async navigate(path: string): Promise<void> {
    return super.navigate(path);
  }

  async waitForPageLoad(): Promise<void> {
    return super.waitForPageLoad();
  }
}


