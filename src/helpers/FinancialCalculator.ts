/**
 * FinancialCalculator — Helper for financial formula validation.
 * Implements standard loan calculation formulas to cross-validate
 * simulator results against expected values.
 */
export class FinancialCalculator {

  /**
   * Calculates the monthly installment using the French method (fixed payment).
   * Formula: C = P * [i*(1+i)^n] / [(1+i)^n - 1]
   * @param capital     Principal loan amount
   * @param tasaAnual   Annual nominal interest rate (e.g. 0.156 for 15.6%)
   * @param meses       Loan term in months
   */
  static cuotaMensualFrances(capital: number, tasaAnual: number, meses: number): number {
    const i = tasaAnual / 12;
    if (i === 0) return capital / meses;
    const cuota = capital * (i * Math.pow(1 + i, meses)) / (Math.pow(1 + i, meses) - 1);
    return Math.round(cuota * 100) / 100;
  }

  /**
   * Calculates the first installment using the German method (decreasing payments).
   * Formula: Capital/n + (Capital * i)
   * @param capital   Principal loan amount
   * @param tasaAnual Annual nominal interest rate
   * @param meses     Loan term in months
   */
  static primeraCuotaAleman(capital: number, tasaAnual: number, meses: number): number {
    const i = tasaAnual / 12;
    const cuota = (capital / meses) + (capital * i);
    return Math.round(cuota * 100) / 100;
  }

  /**
   * Calculates total interest paid over the full loan term (French method).
   */
  static totalInteresesFrances(capital: number, tasaAnual: number, meses: number): number {
    const cuota = this.cuotaMensualFrances(capital, tasaAnual, meses);
    const totalPagado = cuota * meses;
    return Math.round((totalPagado - capital) * 100) / 100;
  }

  /**
   * Parses a currency string like "$10.961,09" to a float number.
   */
  static parsearMoneda(valor: string): number {
    const limpio = valor
      .replace(/\$/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();
    return parseFloat(limpio) || 0;
  }

  /**
   * Validates two monetary values are within an acceptable tolerance.
   * @param esperado  Expected value
   * @param obtenido  Obtained value from simulator
   * @param tolerancia Tolerance percentage (default 5%)
   */
  static dentroDeTolerancia(esperado: number, obtenido: number, tolerancia: number = 0.05): boolean {
    if (esperado === 0) return obtenido === 0;
    const diferencia = Math.abs(esperado - obtenido) / esperado;
    return diferencia <= tolerancia;
  }

  /**
   * Converts annual rate string like "15,60%" to decimal 0.156
   */
  static parsearTasa(tasa: string): number {
    return parseFloat(tasa.replace(',', '.').replace('%', '').trim()) / 100;
  }
}
