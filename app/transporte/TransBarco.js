import { Transport } from "./Transport.js";
export class TransBarco extends Transport {
    constructor() {
        super(...arguments);
        this.costoPorKm = 0.04;
        this.tipo = "marítimo";
    }
    calcularCosto(distancia, peso) {
        const res = distancia * this.costoPorKm * peso;
        return parseFloat(res.toFixed(2));
    }
    getTipo() {
        return this.tipo;
    }
}
//# sourceMappingURL=TransBarco.js.map