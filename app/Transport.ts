export abstract class Transport {
  abstract calcularCosto(distancia: number, peso: number): number;
  abstract getTipo(): string;
}