"use strict";
(() => {
    class TransBarco {
        constructor() {
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
    const transCarlos = new TransBarco();
    let res = transCarlos.calcularCosto(450, 1);
    console.log(res);
})();
//# sourceMappingURL=TransBarco.js.map