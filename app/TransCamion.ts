import { Transport } from "./Transport.js";

export class TransCamion extends Transport {
  private costoPorKm: number = 0.15; // € por km
  private limitePorCamion: number = 5; // 5 ton por camión
  private tipo: string = "terrestre";
  /**
   * Calcula el costo sin tener en cuenta si está lleno o medio vacío. Ya
   * que no siempre se puede partir la carga como se quiere. Y que se evita
   * tener que optimizar la logística al trabajar con el valor máximo permitido
   * @param distancia Kilómetros
   * @param peso Toneladas
   * @returns Costo
   */
  calcularCosto(distancia: number, peso: number): number {
    //                  Redondeo techo
    const numeroCamiones = Math.ceil(peso / this.limitePorCamion);  // Camiones necesarios
    return distancia * this.costoPorKm * numeroCamiones;
  }

  public getTipo(): string {
    return this.tipo;
  }
}
