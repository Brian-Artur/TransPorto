import { Transport } from "./Transport.js";

export class TransBarco extends Transport {
  private costoPorKm: number = 0.04; // € por km
  private tipo: string = "marítimo";
  /**
   * Calcula el costo teniendo en cuenta el peso. Ya que supone mayor cantidad
   * de contenedores y más esfuerzo físico del barco. 
   * @param distancia Kilómetros
   * @param peso Toneladas
   * @returns Costo
   */
  calcularCosto(distancia: number, peso: number): number {
    const res = distancia * this.costoPorKm * peso;
    return parseFloat(res.toFixed(2))
  }

  public getTipo(): string {
    return this.tipo;
  }
}
