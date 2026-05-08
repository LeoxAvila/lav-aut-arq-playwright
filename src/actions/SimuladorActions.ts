import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';

/**
 * Actions for the Credit Simulator.
 * Contains all reusable interactions with the simulator form and results.
 * Depends on SimuladorPage for locators — SimuladorPage itself stays as a pure element map.
 */
export class SimuladorActions {
  constructor(
    private readonly page: Page,
    private readonly simuladorPage: SimuladorPage,
  ) {}

  async navigateToSimulador(): Promise<void> {
    await this.simuladorPage.navigate(this.simuladorPage.url);
    await this.simuladorPage.waitForPageLoad();
    await this.page.waitForSelector('iframe.microsite-iframe', { timeout: 20_000 });
    await this.simuladorPage.creditTypeDropdown().waitFor({ timeout: 30_000 });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async seleccionarTipoCredito(tipo: string): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.simuladorPage.creditTypeDropdown().click();
    await this.page.waitForTimeout(600);
    await this.simuladorPage.frameLocator.getByText(tipo, { exact: true }).first().click({ force: true });
    await this.page.waitForTimeout(1500);
  }

  async ingresarMontoCredito(monto: number): Promise<void> {
    await this.simuladorPage.loanValueInput().fill(String(monto));
    await this.page.waitForTimeout(500);
  }

  async ingresarMontoVivienda(monto: number): Promise<void> {
    await this.simuladorPage.assetValueInput().fill(String(monto));
    await this.page.waitForTimeout(500);
  }

  async seleccionarPlazo(opcion: string): Promise<void> {
    await this.simuladorPage.loanTermDropdown().click();
    await this.simuladorPage.frameLocator.getByText(opcion, { exact: true }).first().click();
    await this.page.waitForTimeout(500);
  }

  async seleccionarMetodoFrances(): Promise<void> {
    await this.simuladorPage.metodeFrancesLabel().click();
    await this.page.waitForTimeout(300);
  }

  async seleccionarMetodoAleman(): Promise<void> {
    await this.simuladorPage.metodeAlemanLabel().click();
    await this.page.waitForTimeout(300);
  }

  async simular(): Promise<void> {
    await this.simuladorPage.btnSimular().click();
    const frame = await this.simuladorPage.getFrame();
    await frame.waitForFunction(() => {
      const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
      return elements.some(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
    }, { timeout: 20_000 });
  }

  async abrirTablaAmortizacion(): Promise<void> {
    await this.simuladorPage.btnVerTablaAmortizacion().waitFor({ state: 'visible', timeout: 10_000 });
    await this.simuladorPage.btnVerTablaAmortizacion().scrollIntoViewIfNeeded();
    await this.simuladorPage.btnVerTablaAmortizacion().click();
    await this.page.waitForTimeout(4000);
  }

  async obtenerCuotaMensualTexto(): Promise<string> {
    const frame = await this.simuladorPage.getFrame();
    return await frame.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
      const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
      return dollarEls[3]?.innerText?.trim() || '';
    });
  }

  async obtenerTasaInteres(): Promise<string> {
    const frame = await this.simuladorPage.getFrame();
    return await frame.evaluate(() => {
      const strongs = Array.from(document.querySelectorAll('strong')) as HTMLElement[];
      const tasa = strongs.find(el => /^[0-9]+,[0-9]+%$/.test((el.innerText || '').trim()));
      return tasa?.innerText?.trim() || '';
    });
  }

  async obtenerTotalAPagar(): Promise<string> {
    const frame = await this.simuladorPage.getFrame();
    await frame.waitForFunction(() =>
      Array.from(document.querySelectorAll('pichincha-typography'))
        .some(el => (el as HTMLElement).innerText?.trim() === 'Total a pagar:'),
      { timeout: 15_000 },
    );
    return await frame.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('pichincha-typography')) as HTMLElement[];
      const texts = elements.map(el => (el as HTMLElement).innerText?.trim() || '');
      const idx = texts.findIndex(t => t === 'Total a pagar:');
      if (idx !== -1 && idx + 1 < texts.length) return texts[idx + 1];
      const dollarEls = elements.filter(el => /^\$[1-9][0-9.,]*,[0-9]+$/.test((el.innerText || '').trim()));
      return dollarEls[dollarEls.length - 1]?.innerText?.trim() || '';
    });
  }

  async tablaAmortizacionEsVisible(): Promise<boolean> {
    const frame = await this.simuladorPage.getFrame();
    return await frame.evaluate(() =>
      Array.from(document.querySelectorAll('pichincha-typography'))
        .some(el => (el as HTMLElement).innerText?.includes('Fecha de pago')),
    );
  }
}
