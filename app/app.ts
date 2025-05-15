(() => {
/* ------------- Ciudades válidas ------------- */
export type City =
  | "A Coruña" | "Barcelona" | "Valencia" | "Bilbao" | "Cádiz"    // costeras (5)
  | "Madrid"  | "Zaragoza"  | "Valladolid" | "Granada" | "Burgos"; // interior (5)

const coastalCities: City[] = ["A Coruña", "Barcelona", "Valencia", "Bilbao", "Cádiz"];

/* ------------- Distancias aprox. por carretera (km) ------------- */
const distances: Record<City, Record<City, number>> = {
  Madrid:     { Barcelona: 620, Valencia: 360, Bilbao: 400, Cádiz: 650, Zaragoza: 320,
                A Coruña: 600, Valladolid: 210, Granada: 420, Burgos: 250 },
  Zaragoza:   { Barcelona: 310, Valencia: 310, Bilbao: 330, Cádiz: 900, Madrid: 320,
                A Coruña: 700, Valladolid: 500, Granada: 800, Burgos: 350 },
  Barcelona:  { Valencia: 350, Bilbao: 600, Cádiz: 1100, A Coruña: 1100, Madrid: 620,
                Zaragoza: 310 },
  Valencia:   { Barcelona: 350, Bilbao: 700, Cádiz: 850, Madrid: 360, Zaragoza: 310,
                A Coruña: 1000 },
  Bilbao:     { Barcelona: 600, Valencia: 700, Cádiz: 1000, Madrid: 400, Zaragoza: 330,
                A Coruña: 650, Valladolid: 270, Granada: 900, Burgos: 120 },
  A Coruña:   { Barcelona: 1100, Bilbao: 650, Madrid: 600, Valencia: 1000, Zaragoza: 700,
                Valladolid: 500, Burgos: 450 },
  Cádiz:      { Barcelona: 1100, Valencia: 850, Bilbao: 1000, Madrid: 650, Zaragoza: 900,
                Granada: 260, Valladolid: 700, Burgos: 820 },
  Valladolid: { Madrid: 210, Bilbao: 270, Valencia: 600, Barcelona: 700, Zaragoza: 500,
                Granada: 600, Burgos: 120, A Coruña: 500, Cádiz: 700 },
  Granada:    { Madrid: 420, Barcelona: 860, Valencia: 500, Bilbao: 900, Zaragoza: 800,
                Cádiz: 260, Valladolid: 600, Burgos: 680, A Coruña: 900 },
  Burgos:     { Madrid: 250, Bilbao: 120, Valencia: 600, Barcelona: 600, Zaragoza: 350,
                Valladolid: 120, A Coruña: 450, Cádiz: 820, Granada: 680 },
};

/* Devolver 0 si es la misma ciudad, o 999 km si la pareja no está definida. */
function getDistance(a: City, b: City): number {
  if (a === b) return 0;
  return distances[a]?.[b] ?? distances[b]?.[a] ?? 999;
}

/* ------------- Tipos intermedios ------------- */
export type TransportMode = "terrestre" | "marítimo" | "mixto";

export interface TransportResult {
  tipo: TransportMode;
  costeTerrestre: number;
  costeMarítimo: number;
  costeTotal: number;
  vehiculosTerrestres: number;
  intermedia?: City;          // solo para modo mixto
}

/* ------------- Clase principal ------------- */
export class Transport {
  private readonly costeTonTerrestre = 100;  // €/t (fijo)
  private readonly costeTonMaritimo = 50;    // €/t (fijo)
  private readonly costeKmTerrestre  = 0.5;  // €/km·t (variable)
  private readonly costeKmMaritimo  = 0.2;  // €/km·t (variable)
  private readonly limiteTerrestre  = 5;    // t por camión

  private esCostera(c: City)            { return coastalCities.includes(c); }
  private vehiculos(tons: number)       { return Math.ceil(tons / this.limiteTerrestre); }

  /* ---------- Todas las rutas posibles ---------- */
  private calcularTodos(tons: number, origen: City, destino: City): TransportResult[] {
    if (tons <= 0) throw new Error("Las toneladas deben ser mayores que 0.");

    const res: TransportResult[] = [];
    const origenCostero   = this.esCostera(origen);
    const destinoCostero  = this.esCostera(destino);

    /* --- 1. Terrestre (siempre) --- */
    const kmRoad = getDistance(origen, destino);
    const cTerF  = tons * this.costeTonTerrestre;
    const cTerV  = tons * kmRoad * this.costeKmTerrestre;
    res.push({
      tipo: "terrestre",
      costeTerrestre: cTerF + cTerV,
      costeMarítimo: 0,
      costeTotal: cTerF + cTerV,
      vehiculosTerrestres: this.vehiculos(tons),
    });

    /* --- 2. Marítimo (solo costa‑costa) --- */
    if (origenCostero && destinoCostero) {
      const kmSea = getDistance(origen, destino);      // simplificación
      const cSeaF = tons * this.costeTonMaritimo;
      const cSeaV = tons * kmSea * this.costeKmMaritimo;
      res.push({
        tipo: "marítimo",
        costeTerrestre: 0,
        costeMarítimo: cSeaF + cSeaV,
        costeTotal: cSeaF + cSeaV,
        vehiculosTerrestres: 0,
      });
    }

    /* --- 3. Mixto (interior→costa o costa→interior) --- */
    if (origenCostero !== destinoCostero) {
      for (const hub of coastalCities) {
        const kmRoadPart = getDistance(origen, hub);
        const kmSeaPart  = getDistance(hub, destino);

        const cTerFmix  = tons * this.costeTonTerrestre;
        const cTerVmix  = tons * kmRoadPart * this.costeKmTerrestre;
        const cSeaFmix  = tons * this.costeTonMaritimo;
        const cSeaVmix  = tons * kmSeaPart * this.costeKmMaritimo;

        res.push({
          tipo: "mixto",
          intermedia: hub,
          costeTerrestre: cTerFmix + cTerVmix,
          costeMarítimo:  cSeaFmix + cSeaVmix,
          costeTotal:     cTerFmix + cTerVmix + cSeaFmix + cSeaVmix,
          vehiculosTerrestres: this.vehiculos(tons),
        });
      }
    }

    return res;
  }

  /* ---------- ÚNICO resultado más barato ---------- */
  calcularMasBarato(tons: number, origen: City, destino: City): TransportResult {
    const todos = this.calcularTodos(tons, origen, destino);
    return todos.reduce((min, cur) => (cur.costeTotal < min.costeTotal ? cur : min));
  }
}

})();