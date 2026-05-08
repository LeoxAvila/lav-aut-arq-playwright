import { Page } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';
import { FormularioEstadoQuestions } from '../questions/FormularioEstadoQuestions';

/**
 * Task: Validate form behavior with invalid and boundary values.
 * Screenplay layer — orchestrates form validation scenarios.
 * State reads delegate to FormularioEstadoQuestions.
 */
export class ValidarFormulario {
  private readonly simuladorPage: SimuladorPage;
  private readonly actions: SimuladorActions;
  private readonly preguntas: FormularioEstadoQuestions;
  private readonly page: Page;

  constructor(page: Page) {
    this.page          = page;
    this.simuladorPage = new SimuladorPage(page);
    this.actions       = new SimuladorActions(page, this.simuladorPage);
    this.preguntas     = new FormularioEstadoQuestions(page);
  }

  async navegarYSeleccionarTipo(tipo: string): Promise<void> {
    await this.actions.navigateToSimulador();
    await this.actions.seleccionarTipoCredito(tipo);
    await attachment('Tipo de crédito seleccionado', await this.page.screenshot(), 'image/png');
  }

  async intentarIngresarTextoEnMonto(texto: string): Promise<void> {
    await this.simuladorPage.loanValueInput().fill(texto);
    await this.page.waitForTimeout(500);
  }

  async obtenerValorActualMonto(): Promise<string> {
    return await this.preguntas.obtenerValorMonto();
  }

  async verificarBotonSimularDeshabilitado(): Promise<boolean> {
    return await this.preguntas.botonSimularEstaDeshabilitado();
  }

  async intentarIngresarMontoFueraDeRango(monto: number): Promise<void> {
    await this.actions.ingresarMontoCredito(monto);
    await this.page.waitForTimeout(500);
  }

  async obtenerMensajeError(): Promise<string | null> {
    return await this.preguntas.obtenerMensajeError();
  }
}
