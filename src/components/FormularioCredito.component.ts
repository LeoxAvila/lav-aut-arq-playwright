import { Page } from '@playwright/test';
import { SimuladorPage } from '../pages/SimuladorPage';
import { SimuladorActions } from '../actions/SimuladorActions';

export type TipoCredito = 'PRECISO' | 'HIPOTECARIO VIVIENDA' | 'LINEA ABIERTA' | 'VIVIENDA DE INTERÉS PÚBLICO' | 'VIVIENDA DE INTERÉS SOCIAL' | 'EDUCACIÓN SUPERIOR';
export type MetodoAmortizacion = 'FRANCES' | 'ALEMAN';

export interface DatosFormularioPreciso {
  tipoCredito: TipoCredito;
  monto: number;
  plazo: string;
  metodo: MetodoAmortizacion;
}

export interface DatosFormularioHipotecario {
  tipoCredito: TipoCredito;
  montoVivienda: number;
  montoCredito: number;
  plazo: string;
  metodo: MetodoAmortizacion;
}

/**
 * Component: Handles all interactions with the credit simulator form.
 * Reusable across multiple test flows.
 */
export class FormularioCreditoComponent {
  private readonly actions: SimuladorActions;

  constructor(page: Page) {
    const simuladorPage = new SimuladorPage(page);
    this.actions = new SimuladorActions(page, simuladorPage);
  }

  async llenarFormularioPreciso(datos: DatosFormularioPreciso): Promise<void> {
    await this.actions.seleccionarTipoCredito(datos.tipoCredito);
    await this.actions.ingresarMontoCredito(datos.monto);
    await this.actions.seleccionarPlazo(datos.plazo);
    await this.seleccionarMetodo(datos.metodo);
  }

  async llenarFormularioHipotecario(datos: DatosFormularioHipotecario): Promise<void> {
    await this.actions.seleccionarTipoCredito(datos.tipoCredito);
    await this.actions.ingresarMontoVivienda(datos.montoVivienda);
    await this.actions.ingresarMontoCredito(datos.montoCredito);
    await this.actions.seleccionarPlazo(datos.plazo);
    await this.seleccionarMetodo(datos.metodo);
  }

  async ejecutarSimulacion(): Promise<void> {
    await this.actions.simular();
  }

  private async seleccionarMetodo(metodo: MetodoAmortizacion): Promise<void> {
    if (metodo === 'FRANCES') {
      await this.actions.seleccionarMetodoFrances();
    } else {
      await this.actions.seleccionarMetodoAleman();
    }
  }
}
