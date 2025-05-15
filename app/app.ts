(() => {
  // Definición de ciudades
  const CITIES = {
    coastal: ["Bilbao", "Vigo", "Cádiz", "Valencia", "Barcelona"],
    inland: ["Valladolid", "Zaragoza", "Madrid", "Badajoz", "Granada"],
  };

  // Tarifas y límites
  const RATES = {
    terrestrial: 100, // €/tonelada
    maritime: 50, // €/tonelada
    maxWeightPerVehicle: 5, // toneladas
  };

  // Determina tipo de transporte
  function getTransportType(origin: string, destination: string): string {
    const isOriginCoastal = CITIES.coastal.includes(origin);
    const isDestCoastal = CITIES.coastal.includes(destination);

    if (!isOriginCoastal && !isDestCoastal) return "terrestrial";
    if (isOriginCoastal && isDestCoastal) return "maritime";
    return "mixed";
  }

  // Calcula coste total
  function calculateLandCost(weight: number): number {
    const vehicles = Math.ceil(weight / RATES.maxWeightPerVehicle);
    return vehicles * weight * RATES.terrestrial;
  }

  function calculateSeaCost(weight: number): number {
    return weight * RATES.maritime;
  }

  function calculateTransportCost(
    origin: string,
    destination: string,
    weight: number
  ): number {
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

  // Función para manejar el cálculo desde HTML
  (window as any).calculateCost = function () {
    const origin = (document.getElementById("origin") as HTMLSelectElement)
      .value;
    const destination = (
      document.getElementById("destination") as HTMLSelectElement
    ).value;
    const weight = parseFloat(
      (document.getElementById("weight") as HTMLInputElement).value
    );

    try {
      const cost = calculateTransportCost(origin, destination, weight);
      const resultDiv = document.getElementById("result") as HTMLDivElement;

      resultDiv.innerHTML = `
            <h3>Resultado</h3>
            <p><strong>Ruta:</strong> ${origin} → ${destination}</p>
            <p><strong>Tipo:</strong> ${getTransportType(
              origin,
              destination
            )}</p>
            <p><strong>Coste total:</strong> ${cost.toFixed(2)}€</p>
        `;
      resultDiv.style.display = "block";
    } catch (error) {
      alert(error.message);
    }
  };
})();
