import { Transport } from "./Transport.js";
export class TransCamion extends Transport {
    constructor() {
        super(...arguments);
        this.costoPorKm = 0.15;
        this.limitePorCamion = 5;
        this.tipo = "terrestre";
    }
    calcularCosto(distancia, peso) {
        const numeroCamiones = Math.ceil(peso / this.limitePorCamion);
        const res = distancia * this.costoPorKm * numeroCamiones;
        return parseFloat(res.toFixed(2));
    }
    getTipo() {
        return this.tipo;
    }
}
//# sourceMappingURL=TransCamion.js.map