import { TransBarco } from "./TransBarco.js";
import { TransCamion } from "./TransCamion.js";
import { Transport } from "./Transport.js";

(() => {


  class Calculadora {
    private terrestre: Transport;
    private maritimo: Transport;
    private tipoTrans: string = "";
    public costoTotal: number = 0;

    constructor() {
      this.terrestre = new TransCamion();
      this.maritimo = new TransBarco();
    }

    asignarTrans(tierra: boolean, mar: boolean): void {
      if (tierra && !mar) {
        this.tipoTrans = "terrestre";
      } else if (!tierra && mar) {
        this.tipoTrans = "marítimo"
      }
      this.tipoTrans = "mixto";
    }



    calcularMixto(
      distanciaCamion: number,
      distanciaBarco: number,
      peso: number): Object {

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

    calcularMaritimo(
      distanciaBarco: number,
      peso: number
    ) {
      this.costoTotal = this.maritimo.calcularCosto(distanciaBarco, peso);
      console.log(this.costoTotal);
    }

    calcularTerrestre(
      distanciaCamion: number,
      peso: number
    ) {
      this.costoTotal = this.terrestre.calcularCosto(distanciaCamion, peso);
      let detalles = {
        terrestre: this.costoTotal,
        camionesNecesarios: Math.ceil(peso / 5)
      }
      console.log(detalles);
    }
  }

  let manolo = new Calculadora();
  const res = manolo.calcularMixto(150, 250, 200)
})()