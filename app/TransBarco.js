import { Transport } from "./Transport";
class TransBarco extends Transport {
    constructor() {
        super(...arguments);
        this.costoPorKm = 0.04;
        this.tipo = "marítimo";
    }
    calcularCosto(distancia, peso) {
        return distancia * this.costoPorKm * peso;
    }
    getTipo() {
        return this.tipo;
    }
}
//# sourceMappingURL=TransBarco.js.map