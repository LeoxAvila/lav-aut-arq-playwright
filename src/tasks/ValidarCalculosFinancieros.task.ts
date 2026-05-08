import { Page } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';
import { FormularioCreditoComponent, DatosFormularioPreciso } from '../components/FormularioCredito.component';
import { ResultadoSimulacionComponent, ResultadoSimulacion } from '../components/ResultadoSimulacion.component';

/**
 * Task: Validate financial calculations across multiple scenarios.
 * Screenplay layer — runs multiple simulations and captures results.
 */
export class ValidarCalculosFinancieros {
  private readonly page: Page;
  private readonly actions: SimuladorActions;
  private readonly formulario: FormularioCreditoComponent;
  private readonly resultado: ResultadoSimulacionComponent;

  constructor(page: Page) {
    this.page           = page;
    const simuladorPage = new SimuladorPage(page);
    this.actions        = new SimuladorActions(page, simuladorPage);
    this.formulario     = new FormularioCreditoComponent(page);
    this.resultado      = new ResultadoSimulacionComponent(page);
  }

  async simularEscenario(datos: DatosFormularioPreciso): Promise<ResultadoSimulacion> {
    await this.actions.navigateToSimulador();
    await attachment('Simulador cargado', await this.page.screenshot(), 'image/png');

    await this.formulario.llenarFormularioPreciso(datos);
    await attachment('Formulario completado', await this.page.screenshot(), 'image/png');

    await this.formulario.ejecutarSimulacion();
    const resultado = await this.resultado.obtenerResultado();
    await attachment('Resultado de simulación', await this.page.screenshot(), 'image/png');

    return resultado;
  }

  async obtenerResultado(): Promise<ResultadoSimulacion> {
    return await this.resultado.obtenerResultado();
  }

  parsearMoneda(valor: string): number {
    return this.resultado.parsearMoneda(valor);
  }
}
