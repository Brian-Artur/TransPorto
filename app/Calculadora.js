import { TransBarco } from "./TransBarco.js";
import { TransCamion } from "./TransCamion.js";
(() => {
    class Calculadora {
        constructor() {
            this.tipoTrans = "";
            this.costoTotal = 0;
            this.terrestre = new TransCamion();
            this.maritimo = new TransBarco();
        }
        asignarTrans(tierra, mar) {
            if (tierra && !mar) {
                this.tipoTrans = "terrestre";
            }
            else if (!tierra && mar) {
                this.tipoTrans = "marítimo";
            }
            this.tipoTrans = "mixto";
        }
        calcularMixto(distanciaCamion, distanciaBarco, peso) {
            const costoTerrestre = this.terrestre.calcularCosto(distanciaCamion, peso);
            const costoMaritimo = this.maritimo.calcularCosto(distanciaBarco, peso);
            this.costoTotal = costoTerrestre + costoMaritimo;
            let detalles = {
                terrestre: costoTerrestre,
                maritimo: costoMaritimo,
                camionesNecesarios: Math.ceil(peso / 5)
            };
            console.log(detalles);
        }
        calcularMaritimo(distanciaBarco, peso) {
            this.costoTotal = this.maritimo.calcularCosto(distanciaBarco, peso);
            console.log(this.costoTotal);
        }
        calcularTerrestre(distanciaCamion, peso) {
            this.costoTotal = this.terrestre.calcularCosto(distanciaCamion, peso);
            let detalles = {
                terrestre: this.costoTotal,
                camionesNecesarios: Math.ceil(peso / 5)
            };
            console.log(detalles);
        }
    }
    let manolo = new Calculadora();
    const res = manolo.calcularMixto(150, 250, 200);
})();
//# sourceMappingURL=Calculadora.js.map