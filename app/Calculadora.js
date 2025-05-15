import { TransBarco } from "./TransBarco.js";
import { TransCamion } from "./TransCamion.js";
(() => {
    class Calculadora {
        constructor() {
            this.costoTotal = 0;
            this.tipoTrans = "";
            this.terrestre = new TransCamion();
            this.maritimo = new TransBarco();
            this.mar = confirm("Hay mar en la ruta?");
            this.tierra = confirm("Hay tierra en la ruta?");
            this.tipoTrans = this.preguntarTrans();
            this.asignar();
        }
        preguntarTrans() {
            if (this.tierra && !this.mar) {
                return "terrestre";
            }
            else if (!this.tierra && this.mar) {
                return "marítimo";
            }
            return "mixto";
        }
        asignar() {
            switch (this.tipoTrans) {
                case "mixto":
                    this.calcularMixto();
                    break;
                case "terrestre":
                    this.calcularTerrestre();
                    break;
                case "marítimo":
                    this.calcularMaritimo();
                    break;
                default:
                    break;
            }
        }
        calcularMixto() {
            let distanciaCamion = Number(prompt("Indique su distancia por carretera"));
            let distanciaBarco = Number(prompt("Indique su distancia por mar"));
            let peso = Number(prompt("Indique el pseo de la carga (en tonaladas)"));
            const costoTerrestre = this.terrestre.calcularCosto(distanciaCamion, peso);
            const costoMaritimo = this.maritimo.calcularCosto(distanciaBarco, peso);
            this.costoTotal = costoTerrestre + costoMaritimo;
            let detalles = {
                medio: this.tipoTrans,
                camionesNecesarios: Math.ceil(peso / 5),
                costeCarretera: costoTerrestre,
                costeMaritimo: costoMaritimo,
                costeTotal: this.costoTotal
            };
            console.log(detalles);
            return detalles;
        }
        calcularMaritimo() {
            let distanciaBarco = Number(prompt("Indique su distancia por mar"));
            let peso = Number(prompt("Indique el pseo de la carga (en tonaladas)"));
            this.costoTotal = this.maritimo.calcularCosto(distanciaBarco, peso);
            let detalles = {
                medio: this.tipoTrans,
                coste: this.costoTotal
            };
            console.log(detalles);
        }
        calcularTerrestre() {
            let distanciaCamion = Number(prompt("Indique su distancia por carretera"));
            let peso = Number(prompt("Indique el pseo de la carga (en tonaladas)"));
            this.costoTotal = this.terrestre.calcularCosto(distanciaCamion, peso);
            let detalles = {
                medio: this.tipoTrans,
                camionesNecesarios: Math.ceil(peso / 5),
                costeTerrestre: this.costoTotal
            };
            console.log(detalles);
        }
    }
    const myApp = new Calculadora();
})();
//# sourceMappingURL=Calculadora.js.map