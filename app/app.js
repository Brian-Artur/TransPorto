(function () { })();
var Transporte = /** @class */ (function () {
    function Transporte() {
        this.costeTerrestre = 100; // €/tonelada
        this.costeMarítimo = 60; // €/tonelada
        this.limiteTerrestre = 5; // toneladas
    }
    Transporte.prototype.calcular = function (toneladas) {
        if (toneladas <= 0) {
            throw new Error("La cantidad de toneladas debe ser mayor que 0.");
        }
        var tipo;
        var costeTerrestre = 0;
        var costeMarítimo = 0;
        if (toneladas <= this.limiteTerrestre) {
            tipo = "terrestre";
            costeTerrestre = toneladas * this.costeTerrestre;
        }
        else if (toneladas > this.limiteTerrestre) {
            tipo = "mixto";
            costeTerrestre = this.limiteTerrestre * this.costeTerrestre;
            var toneladasPorMar = toneladas - this.limiteTerrestre;
            costeMarítimo = toneladasPorMar * this.costeMarítimo;
        }
        var costeTotal = costeTerrestre + costeMarítimo;
        return { tipo: tipo, costeTerrestre: costeTerrestre, costeMarítimo: costeMarítimo, costeTotal: costeTotal };
    };
    return Transporte;
}());
// Ejemplo de uso:
var app = new Transporte();
var toneladas = 8; // Puedes cambiarlo por cualquier número
var resultado = app.calcular(toneladas);
console.log("Tipo de transporte: ".concat(resultado.tipo));
console.log("Coste terrestre: \u20AC".concat(resultado.costeTerrestre));
console.log("Coste mar\u00EDtimo: \u20AC".concat(resultado.costeMarítimo));
console.log("Coste total: \u20AC".concat(resultado.costeTotal));
