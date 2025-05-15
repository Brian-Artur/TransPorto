(() => {})();
type TransportResult = {
  tipo: "terrestre" | "marítimo" | "mixto";
  costeTerrestre: number;
  costeMarítimo: number;
  costeTotal: number;
};

class Transporte {
  private readonly costeTerrestre = 100; // €/tonelada
  private readonly costeMarítimo = 60; // €/tonelada
  private readonly limiteTerrestre = 5; // toneladas

  calcular(toneladas: number): TransportResult {
    if (toneladas <= 0) {
      throw new Error("La cantidad de toneladas debe ser mayor que 0.");
    }

    let tipo: TransportResult["tipo"];
    let costeTerrestre = 0;
    let costeMarítimo = 0;

    if (toneladas <= this.limiteTerrestre) {
      tipo = "terrestre";
      costeTerrestre = toneladas * this.costeTerrestre;
    } else if (toneladas > this.limiteTerrestre) {
      tipo = "mixto";
      costeTerrestre = this.limiteTerrestre * this.costeTerrestre;
      const toneladasPorMar = toneladas - this.limiteTerrestre;
      costeMarítimo = toneladasPorMar * this.costeMarítimo;
    }

    const costeTotal = costeTerrestre + costeMarítimo;

    return { tipo, costeTerrestre, costeMarítimo, costeTotal };
  }
}

// Ejemplo de uso:
const app = new Transporte();

const toneladas = 8; // Puedes cambiarlo por cualquier número
const resultado = app.calcular(toneladas);

console.log(`Tipo de transporte: ${resultado.tipo}`);
console.log(`Coste terrestre: €${resultado.costeTerrestre}`);
console.log(`Coste marítimo: €${resultado.costeMarítimo}`);
console.log(`Coste total: €${resultado.costeTotal}`);
