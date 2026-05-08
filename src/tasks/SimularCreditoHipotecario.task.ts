import { Page } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';
import { FormularioCreditoComponent, DatosFormularioHipotecario } from '../components/FormularioCredito.component';
import { ResultadoSimulacionComponent, ResultadoSimulacion } from '../components/ResultadoSimulacion.component';
import { TablaAmortizacionComponent } from '../components/TablaAmortizacion.component';

/**
 * Task: Simulate a HIPOTECARIO VIVIENDA credit from start to result.
 * Screenplay layer — orchestrates the full business flow.
 */
export class SimularCreditoHipotecario {
  private readonly page: Page;
  private readonly actions: SimuladorActions;
  private readonly formulario: FormularioCreditoComponent;
  readonly resultado: ResultadoSimulacionComponent;
  readonly tabla: TablaAmortizacionComponent;

  constructor(page: Page) {
    this.page             = page;
    const simuladorPage   = new SimuladorPage(page);
    this.actions          = new SimuladorActions(page, simuladorPage);
    this.formulario       = new FormularioCreditoComponent(page);
    this.resultado        = new ResultadoSimulacionComponent(page);
    this.tabla            = new TablaAmortizacionComponent(page);
  }

  async ejecutar(datos: DatosFormularioHipotecario): Promise<ResultadoSimulacion> {
    await this.actions.navigateToSimulador();
    await attachment('Simulador cargado', await this.page.screenshot(), 'image/png');

    await this.formulario.llenarFormularioHipotecario(datos);
    await attachment('Formulario completado', await this.page.screenshot(), 'image/png');

    await this.formulario.ejecutarSimulacion();
    const resultado = await this.resultado.obtenerResultado();
    await attachment('Resultado de simulación', await this.page.screenshot(), 'image/png');

    return resultado;
  }
}
