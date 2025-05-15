"use strict";
(() => {
    class TransCamion {
        constructor() {
            this.costoPorKm = 0.15;
            this.limitePorCamion = 5;
            this.tipo = "terrestre";
        }
        calcularCosto(distancia, peso) {
            const numeroCamiones = Math.ceil(peso / this.limitePorCamion);
            return distancia * this.costoPorKm * numeroCamiones;
        }
        getTipo() {
            return this.tipo;
        }
    }
    const transCarlos = new TransCamion();
    let res = transCarlos.calcularCosto(450, 1);
    console.log(res);
})();
//# sourceMappingURL=app.js.map