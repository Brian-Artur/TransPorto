"use strict";
(() => {
    const CITIES = {
        coastal: ["Bilbao", "Vigo", "Cádiz", "Valencia", "Barcelona"],
        inland: ["Valladolid", "Zaragoza", "Madrid", "Badajoz", "Granada"],
    };
    const RATES = {
        terrestrial: 100,
        maritime: 50,
        maxWeightPerVehicle: 5,
    };
    function getTransportType(origin, destination) {
        const isOriginCoastal = CITIES.coastal.includes(origin);
        const isDestCoastal = CITIES.coastal.includes(destination);
        if (!isOriginCoastal && !isDestCoastal)
            return "terrestrial";
        if (isOriginCoastal && isDestCoastal)
            return "maritime";
        return "mixed";
    }
    function calculateLandCost(weight) {
        const vehicles = Math.ceil(weight / RATES.maxWeightPerVehicle);
        return vehicles * weight * RATES.terrestrial;
    }
    function calculateSeaCost(weight) {
        return weight * RATES.maritime;
    }
    function calculateTransportCost(origin, destination, weight) {
        const transportType = getTransportType(origin, destination);
        switch (transportType) {
            case "terrestrial":
                return calculateLandCost(weight);
            case "maritime":
                return calculateSeaCost(weight);
            case "mixed":
                return calculateLandCost(weight) + calculateSeaCost(weight);
            default:
                throw new Error("Tipo de transporte no válido");
        }
    }
    window.calculateCost = function () {
        const origin = document.getElementById("origin")
            .value;
        const destination = document.getElementById("destination").value;
        const weight = parseFloat(document.getElementById("weight").value);
        try {
            const cost = calculateTransportCost(origin, destination, weight);
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
            <h3>Resultado</h3>
            <p><strong>Ruta:</strong> ${origin} → ${destination}</p>
            <p><strong>Tipo:</strong> ${getTransportType(origin, destination)}</p>
            <p><strong>Coste total:</strong> ${cost.toFixed(2)}€</p>
        `;
            resultDiv.style.display = "block";
        }
        catch (error) {
            alert(error.message);
        }
    };
})();
//# sourceMappingURL=app.js.map